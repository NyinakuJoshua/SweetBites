import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Package, Clock, CheckCircle, ArrowLeft, Eye } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

type Order = Database['public']['Tables']['orders']['Row'] & {
  order_items: Array<Database['public']['Tables']['order_items']['Row'] & {
    cake: Database['public']['Tables']['cakes']['Row'] | null;
  }>;
};

const Orders = () => {
  const { user, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('orders')
          .select(`
            *,
            order_items (
              *,
              cake:cakes (*)
            )
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setOrders(data || []);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading your orders...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <Package className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-foreground mb-4">Sign In Required</h2>
            <p className="text-muted-foreground mb-6">
              Please sign in to view your order history.
            </p>
            <Link to="/auth">
              <Button variant="hero" size="lg">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'preparing': return 'bg-purple-100 text-purple-800';
      case 'ready': return 'bg-green-100 text-green-800';
      case 'delivered': return 'bg-emerald-100 text-emerald-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'confirmed': return <CheckCircle className="h-4 w-4" />;
      case 'preparing': return <Package className="h-4 w-4" />;
      case 'ready': return <CheckCircle className="h-4 w-4" />;
      case 'delivered': return <CheckCircle className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

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
            <h1 className="text-3xl font-bold text-foreground">Order History</h1>
            <p className="text-muted-foreground">
              Track your orders and view past purchases
            </p>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-16">
            <Package className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-foreground mb-4">No Orders Yet</h2>
            <p className="text-muted-foreground mb-6">
              You haven't placed any orders yet. Start shopping to see your orders here.
            </p>
            <Link to="/">
              <Button variant="hero" size="lg">
                Start Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id} className="overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <CardTitle className="text-lg">
                        Order #{order.order_number}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Placed on {new Date(order.created_at || '').toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={`${getStatusColor(order.status || 'pending')} flex items-center gap-1`}>
                        {getStatusIcon(order.status || 'pending')}
                        {order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    {/* Order Items */}
                    <div className="space-y-3">
                      {order.order_items?.slice(0, 2).map((item) => (
                        <div key={item.id} className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-md overflow-hidden bg-muted flex-shrink-0">
                            {item.cake?.image_url ? (
                              <img 
                                src={item.cake.image_url} 
                                alt={item.cake.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-sweet flex items-center justify-center">
                                <Package className="h-4 w-4 text-chocolate" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm text-foreground">
                              {item.cake?.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Qty: {item.quantity} • ${item.unit_price?.toFixed(2)} each
                            </p>
                          </div>
                          <div className="text-sm font-medium text-primary">
                            ${item.total_price?.toFixed(2)}
                          </div>
                        </div>
                      ))}
                      
                      {(order.order_items?.length || 0) > 2 && (
                        <div className="text-center py-2">
                          <Button variant="ghost" size="sm">
                            +{(order.order_items?.length || 0) - 2} more items
                          </Button>
                        </div>
                      )}
                    </div>

                    <Separator />

                    {/* Order Summary */}
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-muted-foreground">
                        {order.delivery_date && (
                          <span>Delivery: {new Date(order.delivery_date).toLocaleDateString()}</span>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-primary">
                          ${order.total_amount?.toFixed(2)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {order.payment_status === 'paid' ? 'Paid' : 'Payment Pending'}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;