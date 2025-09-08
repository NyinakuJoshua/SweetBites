import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Plus, Minus, X, ArrowLeft } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { Link } from "react-router-dom";

const Cart = () => {
  const { items, itemCount, totalAmount, loading, updateItem, removeItem, clearCart } = useCart();

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(itemId);
    } else {
      updateItem(itemId, { quantity: newQuantity });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading your cart...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Shopping Cart</h1>
            <p className="text-muted-foreground">
              {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingCart className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-foreground mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Looks like you haven't added any cakes to your cart yet.
            </p>
            <Link to="/">
              <Button variant="hero" size="lg">
                Start Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-foreground">Cart Items</h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearCart}
                  className="text-destructive hover:text-destructive"
                >
                  Clear Cart
                </Button>
              </div>

              {items.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        {item.cake?.image_url ? (
                          <img 
                            src={item.cake.image_url} 
                            alt={item.cake.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-sweet flex items-center justify-center">
                            <ShoppingCart className="h-8 w-8 text-chocolate" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-lg text-foreground">
                              {item.cake?.name}
                            </h3>
                            <div className="flex gap-2 mt-1">
                              {item.selected_size && (
                                <Badge variant="secondary">
                                  {item.selected_size}
                                </Badge>
                              )}
                              {item.selected_flavor && (
                                <Badge variant="outline">
                                  {item.selected_flavor}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground hover:text-destructive"
                            onClick={() => removeItem(item.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>

                        {item.custom_message && (
                          <div className="mb-3 p-3 bg-muted rounded-lg">
                            <div className="text-sm">
                              <strong>Custom Message:</strong> {item.custom_message}
                            </div>
                          </div>
                        )}

                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleQuantityChange(item.id, (item.quantity || 1) - 1)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="font-medium text-lg w-12 text-center">
                              {item.quantity || 1}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleQuantityChange(item.id, (item.quantity || 1) + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-primary">
                              ${((item.item_price || 0) * (item.quantity || 1)).toFixed(2)}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              ${(item.item_price || 0).toFixed(2)} each
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-8">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Order Summary</h2>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal ({itemCount} items)</span>
                      <span className="font-medium">${totalAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Delivery Fee</span>
                      <span className="font-medium">$5.99</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span className="font-medium">${(totalAmount * 0.08).toFixed(2)}</span>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-primary">
                        ${(totalAmount + 5.99 + (totalAmount * 0.08)).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <Button className="w-full mt-6 bg-gradient-primary hover:opacity-90" size="lg">
                    Proceed to Checkout
                  </Button>
                  
                  <Link to="/" className="block mt-3">
                    <Button variant="outline" className="w-full">
                      Continue Shopping
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;