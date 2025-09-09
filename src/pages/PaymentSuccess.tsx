import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Package, Home, Receipt } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useCart } from "@/hooks/use-cart";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [orderNumber, setOrderNumber] = useState<string>('');
  const { clearCart } = useCart();

  useEffect(() => {
    // Clear cart after successful payment
    clearCart();

    // You could also verify the payment status with Stripe here
    // and update the order status in your database
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Payment Successful!
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8">
              Thank you for your order! Your payment has been processed successfully.
            </p>
          </div>

          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="flex items-center justify-center gap-4 py-6 border border-dashed border-green-200 rounded-lg bg-green-50">
                  <Receipt className="h-6 w-6 text-green-600" />
                  <div>
                    <p className="font-semibold text-green-800">Order Confirmed</p>
                    <p className="text-sm text-green-600">
                      You will receive an email confirmation shortly
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <Package className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <p className="font-medium">Order Preparation</p>
                    <p className="text-muted-foreground">1-2 business days</p>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <CheckCircle className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <p className="font-medium">Delivery</p>
                    <p className="text-muted-foreground">On your selected date</p>
                  </div>
                </div>

                <div className="bg-sweet-vanilla p-4 rounded-lg">
                  <h3 className="font-semibold text-chocolate mb-2">What's Next?</h3>
                  <ul className="text-sm text-chocolate space-y-1">
                    <li>• You'll receive an email confirmation with order details</li>
                    <li>• We'll notify you when your order is being prepared</li>
                    <li>• Track your order status in your account</li>
                    <li>• Get ready to enjoy your delicious cakes!</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/orders">
              <Button variant="hero" size="lg">
                <Receipt className="h-4 w-4 mr-2" />
                View Order Status
              </Button>
            </Link>
            
            <Link to="/">
              <Button variant="outline" size="lg">
                <Home className="h-4 w-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
          </div>

          <p className="mt-8 text-sm text-muted-foreground">
            Need help? Contact our support team at{" "}
            <a href="mailto:support@sweetbites.com" className="text-primary hover:underline">
              support@sweetbites.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;