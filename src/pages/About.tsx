import { Header } from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChefHat, Award, Heart, Clock, Users, Star } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
            Our Sweet Story
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            At SweetBites, we believe every celebration deserves a cake as unique as the moment itself. 
            For over a decade, we've been crafting custom cakes that turn ordinary occasions into 
            extraordinary memories.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { icon: ChefHat, number: "10+", label: "Years of Excellence" },
            { icon: Award, number: "5000+", label: "Happy Customers" },
            { icon: Heart, number: "15000+", label: "Cakes Created" },
            { icon: Star, number: "4.9", label: "Average Rating" }
          ].map((stat, index) => (
            <Card key={index} className="text-center p-6">
              <CardContent className="pt-6">
                <stat.icon className="h-8 w-8 mx-auto mb-4 text-primary" />
                <div className="text-3xl font-bold text-foreground mb-2">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Our Mission */}
        <section className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                We're passionate about bringing your sweetest dreams to life through artisanal cake design. 
                Every cake tells a story, and we're here to help you tell yours through flavors, colors, 
                and designs that capture the essence of your special moments.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Artisanal Quality</Badge>
                <Badge variant="secondary">Custom Designs</Badge>
                <Badge variant="secondary">Fresh Ingredients</Badge>
                <Badge variant="secondary">Made with Love</Badge>
              </div>
            </div>
            <div className="relative">
              <img 
                src="/src/assets/hero-cakes.jpg" 
                alt="Beautiful custom cakes" 
                className="rounded-lg shadow-elegant w-full h-96 object-cover"
              />
            </div>
          </div>
        </section>

        {/* Our Process */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">How We Create Magic</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Consultation",
                description: "We start with understanding your vision, occasion, and preferences to create the perfect design concept."
              },
              {
                step: "02", 
                title: "Design & Planning",
                description: "Our expert bakers and decorators craft a detailed plan, selecting the finest ingredients and techniques."
              },
              {
                step: "03",
                title: "Handcrafted Creation",
                description: "Every cake is lovingly handmade in our kitchen, with attention to every detail and finishing touch."
              }
            ].map((process, index) => (
              <Card key={index} className="text-center p-8 hover-scale">
                <CardContent className="pt-6">
                  <div className="text-4xl font-bold text-primary mb-4">{process.step}</div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">{process.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{process.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Meet Our Sweet Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Head Baker & Founder",
                description: "With 15 years of culinary expertise, Sarah brings creativity and passion to every creation."
              },
              {
                name: "Michael Chen",
                role: "Cake Designer",
                description: "Michael's artistic background helps transform ideas into stunning edible masterpieces."
              },
              {
                name: "Emma Williams",
                role: "Customer Experience Lead",
                description: "Emma ensures every customer journey is as sweet as our cakes from start to finish."
              }
            ].map((member, index) => (
              <Card key={index} className="text-center p-6">
                <CardContent className="pt-6">
                  <div className="w-20 h-20 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-2xl">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="text-center bg-gradient-subtle rounded-xl p-12">
          <h2 className="text-3xl font-bold text-foreground mb-8">What Makes Us Special</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Heart, title: "Made with Love", description: "Every cake crafted with genuine care and passion" },
              { icon: Clock, title: "Always Fresh", description: "Baked daily using only the finest ingredients" },
              { icon: Users, title: "Customer First", description: "Your satisfaction is our top priority" },
              { icon: Award, title: "Award Winning", description: "Recognized for excellence in cake artistry" }
            ].map((value, index) => (
              <div key={index} className="text-center">
                <value.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}