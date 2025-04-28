
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-shopjoy-purple-light via-background to-background">
      <div className="container px-4 py-16 sm:py-24 md:py-32 flex flex-col md:flex-row items-center gap-10 md:gap-16">
        <div className="flex-1 space-y-6 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            <span className="block">Shopping Made</span>
            <span className="block text-shopjoy-purple">Joyful</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto md:mx-0">
            Discover a better way to shop online. Curated products, seamless experience, and smart tools for both shoppers and store owners.
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <Button size="lg" asChild>
              <Link to="/products">
                Shop Now <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
        <div className="flex-1 relative">
          <div className="relative w-full h-64 sm:h-80 md:h-96">
            <div className="absolute top-0 right-0 w-60 h-60 sm:w-72 sm:h-72 md:w-80 md:h-80 bg-shopjoy-yellow rounded-full opacity-70 animate-float" style={{animationDelay: "0s"}}></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 bg-shopjoy-orange rounded-full opacity-70 animate-float" style={{animationDelay: "0.5s"}}></div>
            <div className="absolute top-1/2 left-1/4 transform -translate-y-1/2 w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 bg-shopjoy-green rounded-full opacity-70 animate-float" style={{animationDelay: "1s"}}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img 
                src="https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=500&auto=format&fit=crop&q=80" 
                alt="Person shopping online" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
