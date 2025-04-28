
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getCategories } from '@/data/products';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const categoryImages = {
  "Electronics": "https://images.unsplash.com/photo-1593344484998-6ef4852357ad?w=400&auto=format&fit=crop&q=80",
  "Fitness": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&auto=format&fit=crop&q=80",
  "Clothing": "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&auto=format&fit=crop&q=80",
  "Kitchen": "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&auto=format&fit=crop&q=80",
  "Accessories": "https://images.unsplash.com/photo-1613431810246-244b1c789d2a?w=400&auto=format&fit=crop&q=80",
  "Home": "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=400&auto=format&fit=crop&q=80",
};

const CategoryCard = ({ category }: { category: string }) => {
  const imageUrl = categoryImages[category as keyof typeof categoryImages] || "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=400&auto=format&fit=crop&q=80";
  
  return (
    <Card className="overflow-hidden h-80 relative group shopjoy-card-hover">
      <div className="absolute inset-0">
        <img 
          src={imageUrl} 
          alt={category} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20"></div>
      </div>
      <CardContent className="relative h-full flex flex-col items-center justify-end p-6 text-center">
        <h3 className="text-white font-semibold text-2xl mb-4">{category}</h3>
        <Button variant="secondary" asChild>
          <Link to={`/categories/${category.toLowerCase()}`}>
            View Products
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

const categoriesInfo = {
  "Electronics": "Cutting-edge devices to stay connected and entertained.",
  "Fitness": "Everything you need to reach your fitness goals and stay active.",
  "Clothing": "Fashionable and comfortable apparel for every occasion.",
  "Kitchen": "High-quality tools and appliances for the cooking enthusiast.",
  "Accessories": "The perfect finishing touches to complete any look.",
  "Home": "Beautiful and functional items to make your space truly yours.",
};

const CategoriesPage = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      const fetchedCategories = getCategories();
      setCategories(fetchedCategories);
      setLoading(false);
    };
    
    fetchCategories();
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-8 pb-16">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Product Categories</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse our product collections and find exactly what you're looking for.
            </p>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="h-80 bg-muted rounded-lg animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <CategoryCard key={category} category={category} />
              ))}
            </div>
          )}
          
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">Explore Our Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category) => (
                <div key={category} className="p-6 bg-muted rounded-lg">
                  <h3 className="text-lg font-semibold mb-3">{category}</h3>
                  <p className="text-muted-foreground mb-4">
                    {categoriesInfo[category as keyof typeof categoriesInfo] || "Discover amazing products in this category."}
                  </p>
                  <Button variant="link" className="p-0" asChild>
                    <Link to={`/categories/${category.toLowerCase()}`}>
                      Browse {category}
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoriesPage;
