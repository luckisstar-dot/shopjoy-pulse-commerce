
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { getCategories } from '@/data/products';

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
    <Link to={`/categories/${category.toLowerCase()}`}>
      <Card className="overflow-hidden h-40 relative group shopjoy-card-hover">
        <div className="absolute inset-0">
          <img 
            src={imageUrl} 
            alt={category} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20"></div>
        </div>
        <CardContent className="relative h-full flex items-end p-4">
          <h3 className="text-white font-semibold text-xl">{category}</h3>
        </CardContent>
      </Card>
    </Link>
  );
};

const CategorySection = () => {
  const [categories, setCategories] = useState<string[]>([]);
  
  useEffect(() => {
    const fetchedCategories = getCategories();
    setCategories(fetchedCategories);
  }, []);
  
  return (
    <section className="bg-muted py-12 md:py-20">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse our carefully curated collections to find exactly what you're looking for.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
