import { Button } from "@/components/ui/button"
import { ShoppingCart, User, Heart, Search, ChevronDown } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

export const Header = () => {
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">S</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">SweetBites</h1>
              <p className="text-xs text-muted-foreground">Custom Cake Creations</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <div className="relative group">
              <button className="text-foreground hover:text-primary transition-colors flex items-center">
                Browse Cakes
                <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-background border border-border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  <a href="/cakes/birthday" className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
                    Birthday Cakes
                  </a>
                  <a href="/cakes/wedding" className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
                    Wedding Cakes
                  </a>
                  <a href="/cakes/seasonal" className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
                    Seasonal Cakes
                  </a>
                  <a href="/cakes/slice" className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
                    Slice Cakes
                  </a>
                  <a href="/cakes/cupcakes" className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
                    Cupcakes
                  </a>
                </div>
              </div>
            </div>
            <a href="#customize" className="text-foreground hover:text-primary transition-colors">
              Customize
            </a>
            <a href="/about" className="text-foreground hover:text-primary transition-colors">
              About
            </a>
            <a href="/contact" className="text-foreground hover:text-primary transition-colors">
              Contact
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="relative">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <Heart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-sweet-coral text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                2
              </span>
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-sweet-coral text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span>
            </Button>
            {user ? (
              <div className="relative group">
                <Button variant="elegant" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  {user.user_metadata?.full_name || user.email?.split('@')[0] || 'Account'}
                </Button>
                <div className="absolute top-full right-0 mt-2 w-48 bg-background border border-border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    <a href="/profile" className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
                      My Profile
                    </a>
                    <a href="/orders" className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
                      My Orders
                    </a>
                    <button 
                      onClick={signOut}
                      className="block w-full text-left px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Button variant="elegant" size="sm" asChild>
                <a href="/auth">
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}