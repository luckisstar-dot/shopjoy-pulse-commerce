
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart } from 'lucide-react';
import { Product } from '@/data/products';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
}

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Card className="overflow-hidden shopjoy-card-hover">
      <div className="aspect-square overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg truncate">{product.name}</h3>
            <p className="text-sm text-muted-foreground">{product.category}</p>
          </div>
          <Badge variant="secondary">${product.price.toFixed(2)}</Badge>
        </div>
        <div className="flex items-center mt-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground ml-1">({product.reviews})</span>
          <span className="ml-auto text-xs font-medium text-emerald-600">
            {product.stock > 10 ? 'In Stock' : `${product.stock} left`}
          </span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button variant="outline" className="flex-1" asChild>
          <Link to={`/products/${product.id}`}>Details</Link>
        </Button>
        <Button className="flex-1">
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

// Skeleton card for loading state
const ProductCardSkeleton = () => {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-square bg-muted animate-pulse"></div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="w-2/3">
            <div className="h-6 bg-muted rounded animate-pulse mb-2"></div>
            <div className="h-4 bg-muted rounded animate-pulse w-1/2"></div>
          </div>
          <div className="h-6 bg-muted rounded animate-pulse w-16"></div>
        </div>
        <div className="flex items-center mt-4">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 w-4 bg-muted rounded animate-pulse"></div>
            ))}
          </div>
          <div className="h-4 bg-muted rounded animate-pulse w-8 ml-2"></div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
        <div className="h-9 bg-muted rounded animate-pulse w-full"></div>
        <div className="h-9 bg-muted rounded animate-pulse w-full"></div>
      </CardFooter>
    </Card>
  );
};

const ProductGrid = ({ products, loading = false }: ProductGridProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold mb-2">No products found</h3>
        <p className="text-muted-foreground">Try adjusting your filters or search criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
