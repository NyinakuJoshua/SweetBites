import { Button } from "@/components/ui/button"
import { Sparkles, ChefHat, Clock } from "lucide-react"
import heroCakes from "@/assets/hero-cakes.jpg"

export const Hero = () => {
  return (
    <section className="relative py-20 bg-gradient-hero overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-sweet-pink text-chocolate text-sm font-medium">
                <Sparkles className="h-4 w-4 mr-2" />
                Custom Cake Specialists
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Sweet Dreams
                <span className="bg-gradient-primary bg-clip-text text-transparent"> Made Real</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Create your perfect custom cake with our real-time design tool. 
                From elegant wedding cakes to fun birthday celebrations - we bring your vision to life.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="xl">
                <ChefHat className="h-5 w-5 mr-2" />
                Customize Your Cake
              </Button>
              <Button variant="elegant" size="xl">
                <Clock className="h-5 w-5 mr-2" />
                Browse Ready Cakes
              </Button>
            </div>

            {/* Features */}
            <div className="flex items-center space-x-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">24h</div>
                <div className="text-sm text-muted-foreground">Fresh Guarantee</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">4.9★</div>
                <div className="text-sm text-muted-foreground">Customer Rating</div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative z-10 animate-float">
              <img
                src={heroCakes}
                alt="Beautiful custom decorated cakes"
                className="rounded-2xl shadow-elegant w-full h-auto"
              />
              <div className="absolute -top-4 -right-4 bg-sweet-coral text-primary-foreground rounded-full px-4 py-2 shadow-soft animate-glow">
                <span className="font-semibold">Fresh Daily!</span>
              </div>
            </div>
            
            {/* Background Elements */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-sweet opacity-20 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  )
}