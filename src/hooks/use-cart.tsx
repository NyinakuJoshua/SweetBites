import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { Database } from '@/integrations/supabase/types';

type CartItem = Database['public']['Tables']['cart_items']['Row'] & {
  cake?: Database['public']['Tables']['cakes']['Row'];
};

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  totalAmount: number;
  loading: boolean;
  addItem: (cakeId: string, options?: {
    quantity?: number;
    selectedSize?: string;
    selectedFlavor?: string;
    customMessage?: string;
    specialInstructions?: string;
  }) => Promise<void>;
  updateItem: (itemId: string, updates: {
    quantity?: number;
    selectedSize?: string;
    selectedFlavor?: string;
    customMessage?: string;
    specialInstructions?: string;
  }) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const refreshCart = async () => {
    if (!user) {
      setItems([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('cart_items')
        .select(`
          *,
          cake:cakes(*)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error('Error fetching cart:', error);
      toast({
        title: "Error",
        description: "Failed to load cart items.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (cakeId: string, options: {
    quantity?: number;
    selectedSize?: string;
    selectedFlavor?: string;
    customMessage?: string;
    specialInstructions?: string;
  } = {}) => {
    if (!user) {
      toast({
        title: "Sign In Required",
        description: "Please sign in to add items to your cart.",
        variant: "destructive"
      });
      return;
    }

    try {
      // First get cake details for pricing
      const { data: cake, error: cakeError } = await supabase
        .from('cakes')
        .select('*')
        .eq('id', cakeId)
        .single();

      if (cakeError) throw cakeError;

      // Check if item already exists in cart
      const existingItem = items.find(item => 
        item.cake_id === cakeId && 
        item.selected_size === options.selectedSize &&
        item.selected_flavor === options.selectedFlavor
      );

      if (existingItem) {
        // Update existing item quantity
        await updateItem(existingItem.id, {
          quantity: (existingItem.quantity || 1) + (options.quantity || 1)
        });
      } else {
        // Add new item
        const { error } = await supabase
          .from('cart_items')
          .insert({
            user_id: user.id,
            cake_id: cakeId,
            quantity: options.quantity || 1,
            selected_size: options.selectedSize || null,
            selected_flavor: options.selectedFlavor || null,
            custom_message: options.customMessage || null,
            special_instructions: options.specialInstructions || null,
            item_price: cake.base_price
          });

        if (error) throw error;
      }

      await refreshCart();
      toast({
        title: "Added to Cart",
        description: `${cake.name} has been added to your cart.`
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: "Error",
        description: "Failed to add item to cart.",
        variant: "destructive"
      });
    }
  };

  const updateItem = async (itemId: string, updates: any) => {
    try {
      const { error } = await supabase
        .from('cart_items')
        .update(updates)
        .eq('id', itemId);

      if (error) throw error;
      await refreshCart();
    } catch (error) {
      console.error('Error updating cart item:', error);
      toast({
        title: "Error",
        description: "Failed to update cart item.",
        variant: "destructive"
      });
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', itemId);

      if (error) throw error;
      await refreshCart();
      toast({
        title: "Removed from Cart",
        description: "Item has been removed from your cart."
      });
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast({
        title: "Error",
        description: "Failed to remove item from cart.",
        variant: "destructive"
      });
    }
  };

  const clearCart = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;
      setItems([]);
      toast({
        title: "Cart Cleared",
        description: "All items have been removed from your cart."
      });
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast({
        title: "Error",
        description: "Failed to clear cart.",
        variant: "destructive"
      });
    }
  };

  const itemCount = items.reduce((total, item) => total + (item.quantity || 0), 0);
  const totalAmount = items.reduce((total, item) => total + ((item.item_price || 0) * (item.quantity || 0)), 0);

  useEffect(() => {
    refreshCart();
  }, [user]);

  const value = {
    items,
    itemCount,
    totalAmount,
    loading,
    addItem,
    updateItem,
    removeItem,
    clearCart,
    refreshCart
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}