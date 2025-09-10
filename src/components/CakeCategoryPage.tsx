import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { CakeCard } from '@/components/CakeCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';

interface Cake {
  id: string;
  name: string;
  description: string;
  base_price: number;
  image_url: string;
  rating: number;
  review_count: number;
  available_sizes: string[];
  available_flavors: string[];
  category: string;
}

interface CakeCategoryPageProps {
  category: string;
  title: string;
  description: string;
  heroImage?: string;
}

export function CakeCategoryPage({ category, title, description, heroImage }: CakeCategoryPageProps) {
  const [cakes, setCakes] = useState<Cake[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState('all');
  const [selectedFlavor, setSelectedFlavor] = useState('all');

  useEffect(() => {
    fetchCakes();
  }, [category]);

  const fetchCakes = async () => {
    try {
      const { data, error } = await supabase
        .from('cakes')
        .select('*')
        .eq('category', category as any)
        .eq('is_active', true);

      if (error) throw error;
      setCakes(data || []);
    } catch (error) {
      console.error('Error fetching cakes:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAndSortedCakes = cakes
    .filter(cake => 
      cake.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cake.description?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(cake => {
      if (priceRange === 'all') return true;
      const price = cake.base_price;
      switch (priceRange) {
        case 'under-50': return price < 50;
        case '50-100': return price >= 50 && price <= 100;
        case '100-200': return price > 100 && price <= 200;
        case 'over-200': return price > 200;
        default: return true;
      }
    })
    .filter(cake => {
      if (selectedFlavor === 'all') return true;
      return cake.available_flavors?.includes(selectedFlavor);
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.base_price - b.base_price;
        case 'price-high': return b.base_price - a.base_price;
        case 'rating': return (b.rating || 0) - (a.rating || 0);
        case 'name':
        default: return a.name.localeCompare(b.name);
      }
    });

  const allFlavors = [...new Set(cakes.flatMap(cake => cake.available_flavors || []))];

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12 flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-subtle overflow-hidden">
        {heroImage && (
          <div className="absolute inset-0 z-0">
            <img 
              src={heroImage} 
              alt={title}
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-background/60" />
          </div>
        )}
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
            {title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {description}
          </p>
          <div className="mt-8">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {cakes.length} {cakes.length === 1 ? 'Cake' : 'Cakes'} Available
            </Badge>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        {/* Filters and Search */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search cakes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name A-Z</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="under-50">Under $50</SelectItem>
                  <SelectItem value="50-100">$50 - $100</SelectItem>
                  <SelectItem value="100-200">$100 - $200</SelectItem>
                  <SelectItem value="over-200">Over $200</SelectItem>
                </SelectContent>
              </Select>

              {allFlavors.length > 0 && (
                <Select value={selectedFlavor} onValueChange={setSelectedFlavor}>
                  <SelectTrigger>
                    <SelectValue placeholder="Flavor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Flavors</SelectItem>
                    {allFlavors.map((flavor) => (
                      <SelectItem key={flavor} value={flavor}>
                        {flavor}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              <Button variant="outline" className="w-full">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {filteredAndSortedCakes.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎂</div>
            <h3 className="text-2xl font-semibold text-foreground mb-2">No cakes found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or filters to find more options.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedCakes.map((cake) => (
              <CakeCard
                key={cake.id}
                id={cake.id}
                name={cake.name}
                price={cake.base_price}
                rating={cake.rating || 0}
                reviews={cake.review_count || 0}
                category={cake.category}
                image={cake.image_url}
                description={cake.description || ''}
              />
            ))}
          </div>
        )}

        {/* Load More */}
        {filteredAndSortedCakes.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Cakes
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}