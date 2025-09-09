import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Star, Plus } from "lucide-react"
import { useState } from "react"
import { useCart } from "@/hooks/use-cart"

interface CakeCardProps {
  id: string
  name: string
  image: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  category: string
  isPopular?: boolean
  description: string
}

export const CakeCard = ({ 
  id,
  name, 
  image, 
  price, 
  originalPrice,
  rating,
  reviews, 
  category,
  isPopular = false,
  description 
}: CakeCardProps) => {
  const [isLiked, setIsLiked] = useState(false)
  const { addItem } = useCart()

  const handleAddToCart = async () => {
    // Guard: Home page uses demo items with non-DB ids. Prevent failing insert.
    const looksLikeUuid = id.includes('-') && id.length >= 30
    if (!looksLikeUuid) {
      const { toast } = await import('@/hooks/use-toast')
      toast({
        title: 'Please browse cakes',
        description: 'Open any category to add real products to your cart.',
        variant: 'destructive'
      })
      return
    }

    await addItem(id, {
      quantity: 1,
      selectedSize: 'Standard',
      selectedFlavor: 'Original'
    })
  }

  return (
    <Card className="group overflow-hidden border-border hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 bg-card">
      <div className="relative">
        <img 
          src={image} 
          alt={name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {isPopular && (
            <Badge className="bg-sweet-coral text-primary-foreground">
              Popular
            </Badge>
          )}
          <Badge variant="secondary" className="bg-sweet-vanilla text-chocolate">
            {category}
          </Badge>
        </div>

        {/* Like Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 bg-background/80 hover:bg-background"
          onClick={() => setIsLiked(!isLiked)}
        >
          <Heart 
            className={`h-4 w-4 transition-colors ${
              isLiked ? 'fill-sweet-berry text-sweet-berry' : 'text-muted-foreground'
            }`} 
          />
        </Button>

        {/* Discount Badge */}
        {originalPrice && (
          <div className="absolute bottom-3 left-3 bg-sweet-coral text-primary-foreground rounded-full px-2 py-1 text-sm font-semibold">
            Save ${originalPrice - price}
          </div>
        )}
      </div>

      <CardContent className="p-4 space-y-3">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
            {name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="ml-1 text-sm font-medium">{rating}</span>
          </div>
          <span className="text-sm text-muted-foreground">({reviews} reviews)</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">${price}</span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${originalPrice}
              </span>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button variant="order" className="flex-1" onClick={handleAddToCart}>
          <Plus className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
        <Button variant="outline" size="icon">
          <Star className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}