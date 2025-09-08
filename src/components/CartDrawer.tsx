import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Plus, Minus, X, Trash2 } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useState } from "react";

export const CartDrawer = () => {
  const { items, itemCount, totalAmount, loading, updateItem, removeItem } = useCart();
  const [open, setOpen] = useState(false);

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(itemId);
    } else {
      updateItem(itemId, { quantity: newQuantity });
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {itemCount > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-sweet-coral text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center p-0">
              {itemCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      
      <SheetContent className="flex flex-col w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Your Cart ({itemCount} items)
          </SheetTitle>
        </SheetHeader>

        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-muted-foreground">Loading cart...</div>
          </div>
        ) : items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
            <ShoppingCart className="h-12 w-12 text-muted-foreground" />
            <div>
              <h3 className="font-medium text-foreground">Your cart is empty</h3>
              <p className="text-sm text-muted-foreground">Add some delicious cakes to get started!</p>
            </div>
            <Button onClick={() => setOpen(false)}>
              Browse Cakes
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-start gap-3 py-4">
                    <div className="w-16 h-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
                      {item.cake?.image_url ? (
                        <img 
                          src={item.cake.image_url} 
                          alt={item.cake.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-sweet flex items-center justify-center">
                          <ShoppingCart className="h-6 w-6 text-chocolate" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-sm text-foreground line-clamp-1">
                            {item.cake?.name}
                          </h4>
                          {item.selected_size && (
                            <Badge variant="secondary" className="text-xs mt-1">
                              {item.selected_size}
                            </Badge>
                          )}
                          {item.selected_flavor && (
                            <Badge variant="outline" className="text-xs mt-1 ml-1">
                              {item.selected_flavor}
                            </Badge>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-muted-foreground hover:text-destructive"
                          onClick={() => removeItem(item.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => handleQuantityChange(item.id, (item.quantity || 1) - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm font-medium w-8 text-center">
                            {item.quantity || 1}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => handleQuantityChange(item.id, (item.quantity || 1) + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="text-sm font-medium text-primary">
                          ${((item.item_price || 0) * (item.quantity || 1)).toFixed(2)}
                        </div>
                      </div>

                      {item.custom_message && (
                        <div className="text-xs text-muted-foreground bg-muted p-2 rounded">
                          <strong>Message:</strong> {item.custom_message}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="space-y-4 pt-4 border-t border-border">
              <div className="flex justify-between items-center">
                <span className="font-medium text-foreground">Total:</span>
                <span className="text-xl font-bold text-primary">
                  ${totalAmount.toFixed(2)}
                </span>
              </div>
              
              <div className="space-y-2">
                <Button 
                  className="w-full bg-gradient-primary hover:opacity-90" 
                  size="lg"
                  onClick={() => setOpen(false)}
                >
                  Proceed to Checkout
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => setOpen(false)}
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};