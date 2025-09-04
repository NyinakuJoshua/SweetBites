import { Header } from "@/components/Header"
import { Hero } from "@/components/Hero"
import { CakeCard } from "@/components/CakeCard"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Cake, 
  Users, 
  Clock, 
  Shield, 
  Truck, 
  Sparkles,
  Star,
  MapPin,
  Phone,
  Mail
} from "lucide-react"

// Import cake images
import chocolateCake from "@/assets/chocolate-birthday-cake.jpg"
import weddingCake from "@/assets/wedding-cake.jpg"
import strawberryCake from "@/assets/strawberry-cake.jpg"
import cupcakes from "@/assets/cupcakes.jpg"

const Index = () => {
  const featuredCakes = [
    {
      id: "1",
      name: "Chocolate Celebration Cake",
      image: chocolateCake,
      price: 45,
      originalPrice: 60,
      rating: 4.8,
      reviews: 124,
      category: "Birthday",
      isPopular: true,
      description: "Rich chocolate cake with colorful decorations perfect for any birthday celebration"
    },
    {
      id: "2", 
      name: "Elegant Wedding Cake",
      image: weddingCake,
      price: 250,
      rating: 5.0,
      reviews: 89,
      category: "Wedding",
      description: "Three-tier wedding masterpiece with rose gold accents and fresh floral arrangements"
    },
    {
      id: "3",
      name: "Fresh Strawberry Delight", 
      image: strawberryCake,
      price: 35,
      rating: 4.7,
      reviews: 156,
      category: "Seasonal",
      description: "Light and airy strawberry cake with fresh cream and seasonal berries"
    },
    {
      id: "4",
      name: "Artisan Cupcake Collection",
      image: cupcakes,
      price: 24,
      originalPrice: 30,
      rating: 4.9,
      reviews: 203,
      category: "Cupcakes",
      isPopular: true,
      description: "Dozen artisan cupcakes with premium frosting and handcrafted decorations"
    }
  ]

  const features = [
    {
      icon: <Cake className="h-8 w-8" />,
      title: "Custom Designs",
      description: "Create your perfect cake with our interactive design tool"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Expert Bakers",
      description: "Skilled artisans with years of baking excellence"
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Fresh Daily",
      description: "All cakes made fresh to order with premium ingredients"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Quality Guarantee",
      description: "100% satisfaction guarantee or your money back"
    },
    {
      icon: <Truck className="h-8 w-8" />,
      title: "Fast Delivery",
      description: "Same-day delivery available in select areas"
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "Special Occasions",
      description: "Perfect cakes for weddings, birthdays, and celebrations"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />

      {/* Features Section */}
      <section className="py-16 bg-gradient-elegant">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-sweet-pink text-chocolate">
              Why Choose SweetBites
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Crafted with Love, Delivered with Care
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From concept to creation, we ensure every cake exceeds your expectations with premium ingredients and artisan craftsmanship.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-border hover:shadow-soft transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-sweet rounded-full mb-4 text-chocolate">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Cakes Section */}
      <section id="cakes" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-sweet-coral text-primary-foreground">
              Featured Collection
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Our Most Popular Creations
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our customer favorites and best-selling cake designs, each crafted to perfection.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {featuredCakes.map((cake) => (
              <CakeCard key={cake.id} {...cake} />
            ))}
          </div>

          <div className="text-center">
            <Button variant="hero" size="lg">
              View All Cakes
            </Button>
          </div>
        </div>
      </section>

      {/* Customization CTA Section */}
      <section id="customize" className="py-16 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-sweet-vanilla text-chocolate text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4 mr-2" />
              Real-Time Cake Designer
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
              Design Your Dream Cake
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Use our interactive cake customization tool to create the perfect cake for your special occasion. 
              Choose flavors, colors, decorations, and see your design come to life in real-time.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl">
                <Cake className="h-5 w-5 mr-2" />
                Start Designing
              </Button>
              <Button variant="elegant" size="xl">
                View Gallery
              </Button>
            </div>

            <div className="mt-12 grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Choose Your Style</h3>
                <p className="text-muted-foreground">Pick from hundreds of design templates</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Cake className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Customize Everything</h3>
                <p className="text-muted-foreground">Flavors, colors, decorations, and text</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Live Preview</h3>
                <p className="text-muted-foreground">See your design in real-time 3D view</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-chocolate text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">S</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">SweetBites</h3>
                  <p className="text-sm opacity-80">Custom Cake Creations</p>
                </div>
              </div>
              <p className="text-sm opacity-80">
                Creating memorable moments with every bite. Your celebration, our passion.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="block opacity-80 hover:opacity-100 transition-opacity">Browse Cakes</a>
                <a href="#" className="block opacity-80 hover:opacity-100 transition-opacity">Customize</a>
                <a href="#" className="block opacity-80 hover:opacity-100 transition-opacity">About Us</a>
                <a href="#" className="block opacity-80 hover:opacity-100 transition-opacity">Reviews</a>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="block opacity-80 hover:opacity-100 transition-opacity">Wedding Cakes</a>
                <a href="#" className="block opacity-80 hover:opacity-100 transition-opacity">Birthday Cakes</a>
                <a href="#" className="block opacity-80 hover:opacity-100 transition-opacity">Corporate Orders</a>
                <a href="#" className="block opacity-80 hover:opacity-100 transition-opacity">Delivery</a>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4">Contact Us</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2 opacity-80">
                  <MapPin className="h-4 w-4" />
                  <span>123 Sweet Street, Bakery District</span>
                </div>
                <div className="flex items-center space-x-2 opacity-80">
                  <Phone className="h-4 w-4" />
                  <span>(555) 123-CAKE</span>
                </div>
                <div className="flex items-center space-x-2 opacity-80">
                  <Mail className="h-4 w-4" />
                  <span>hello@sweetbites.com</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm opacity-80">
            <p>&copy; 2024 SweetBites. All rights reserved. Made with ❤️ for sweet celebrations.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;