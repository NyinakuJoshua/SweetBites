import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/use-auth";
import { CartProvider } from "@/hooks/use-cart";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import AdminAuth from "./pages/AdminAuth";
import About from "./pages/About";
import Contact from "./pages/Contact";
import BirthdayCakes from "./pages/cakes/BirthdayCakes";
import WeddingCakes from "./pages/cakes/WeddingCakes";
import SeasonalCakes from "./pages/cakes/SeasonalCakes";
import SliceCakes from "./pages/cakes/SliceCakes";
import Cupcakes from "./pages/cakes/Cupcakes";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import PaymentSuccess from "./pages/PaymentSuccess";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/admin-auth" element={<AdminAuth />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/cakes/birthday" element={<BirthdayCakes />} />
              <Route path="/cakes/wedding" element={<WeddingCakes />} />
              <Route path="/cakes/seasonal" element={<SeasonalCakes />} />
              <Route path="/cakes/slice" element={<SliceCakes />} />
              <Route path="/cakes/cupcakes" element={<Cupcakes />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
