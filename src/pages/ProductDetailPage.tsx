
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, ShoppingCart, ArrowLeft, TruckIcon, ShieldCheck, RotateCcw } from 'lucide-react';
import { getProductById, getProducts, Product } from '@/data/products';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchProduct = () => {
      if (productId) {
        setLoading(true);
        const fetchedProduct = getProductById(productId);
        if (fetchedProduct) {
          setProduct(fetchedProduct);
          
          // Initialize selected variants
          const initialVariants: Record<string, string> = {};
          if (fetchedProduct.variants?.color && fetchedProduct.variants.color.length > 0) {
            initialVariants.color = fetchedProduct.variants.color[0];
          }
          if (fetchedProduct.variants?.size && fetchedProduct.variants.size.length > 0) {
            initialVariants.size = fetchedProduct.variants.size[0];
          }
          setSelectedVariants(initialVariants);
          
          // Get related products from same category
          const allProducts = getProducts();
          const related = allProducts
            .filter(p => p.category === fetchedProduct.category && p.id !== fetchedProduct.id)
            .slice(0, 4);
          setRelatedProducts(related);
        }
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [productId]);
  
  const handleAddToCart = () => {
    toast({
      title: "Added to Cart",
      description: `${quantity} × ${product?.name} added to your cart.`,
    });
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-8 pb-16">
          <div className="container px-4">
            <div className="animate-pulse">
              <div className="h-6 bg-muted w-1/4 rounded mb-4"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="aspect-square bg-muted rounded-lg"></div>
                <div className="space-y-4">
                  <div className="h-8 bg-muted w-3/4 rounded"></div>
                  <div className="h-6 bg-muted w-1/4 rounded"></div>
                  <div className="h-4 bg-muted w-full rounded mb-2"></div>
                  <div className="h-4 bg-muted w-full rounded mb-2"></div>
                  <div className="h-4 bg-muted w-3/4 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-8 pb-16">
          <div className="container px-4 text-center py-12">
            <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/products">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Products
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-8 pb-16">
        <div className="container px-4">
          <div className="mb-6">
            <Button variant="ghost" asChild className="pl-0 text-muted-foreground">
              <Link to="/products">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Products
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="aspect-square bg-muted rounded-lg overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">{product.category}</Badge>
                {product.featured && <Badge variant="default">Featured</Badge>}
                {product.stock <= 10 && product.stock > 0 && <Badge variant="secondary">Low Stock</Badge>}
                {product.stock === 0 && <Badge variant="destructive">Out of Stock</Badge>}
              </div>
              
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                    />
                  ))}
                  <span className="ml-2 text-sm font-medium">{product.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground ml-2">({product.reviews} reviews)</span>
              </div>
              
              <div className="text-2xl font-bold mb-6">${product.price.toFixed(2)}</div>
              
              <p className="text-muted-foreground mb-6">{product.description}</p>
              
              {/* Variants */}
              <div className="space-y-4 mb-6">
                {product.variants?.color && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Color</label>
                    <div className="flex flex-wrap gap-2">
                      {product.variants.color.map(color => (
                        <Button
                          key={color}
                          variant={selectedVariants.color === color ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedVariants({...selectedVariants, color})}
                        >
                          {color}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
                
                {product.variants?.size && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Size</label>
                    <div className="flex flex-wrap gap-2">
                      {product.variants.size.map(size => (
                        <Button
                          key={size}
                          variant={selectedVariants.size === size ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedVariants({...selectedVariants, size})}
                        >
                          {size}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium mb-2">Quantity</label>
                  <div className="flex items-center">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      -
                    </Button>
                    <span className="w-12 text-center">{quantity}</span>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      disabled={quantity >= product.stock}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
              
              <Button 
                size="lg" 
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="w-full sm:w-auto"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </Button>
              
              <div className="mt-8 space-y-4 border-t pt-6">
                <div className="flex items-center gap-3">
                  <TruckIcon className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Free shipping</p>
                    <p className="text-sm text-muted-foreground">On orders over $50</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">2 year warranty</p>
                    <p className="text-sm text-muted-foreground">Full coverage</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <RotateCcw className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">30-day returns</p>
                    <p className="text-sm text-muted-foreground">Hassle-free returns</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-16">
            <Tabs defaultValue="description">
              <TabsList className="mb-6">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="specs">Specifications</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="space-y-4">
                <h3 className="text-lg font-medium">About {product.name}</h3>
                <p className="text-muted-foreground">{product.description}</p>
                <p className="text-muted-foreground">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at dui nec urna vulputate eleifend. 
                  Sed aliquam, magna vitae fermentum tincidunt, erat nunc imperdiet erat, a consectetur est metus eu erat.
                  Etiam sit amet erat vel nunc ultrices iaculis. Phasellus a justo ligula. Fusce sed dui quis arcu vehicula 
                  fermentum vel vitae enim.
                </p>
                <p className="text-muted-foreground">
                  Ut vulputate velit eget nisi eleifend, non commodo arcu elementum. Proin efficitur ipsum velit, 
                  vitae sagittis arcu aliquet nec. Ut mollis, tortor vel tempor finibus, lectus nisl fermentum neque, at posuere 
                  felis massa at nunc. Mauris commodo fermentum tortor, ut porta justo pharetra nec.
                </p>
              </TabsContent>
              <TabsContent value="specs" className="space-y-4">
                <h3 className="text-lg font-medium">Technical Specifications</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="font-medium">Dimensions</p>
                    <p className="text-sm text-muted-foreground">10" x 5" x 3"</p>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="font-medium">Weight</p>
                    <p className="text-sm text-muted-foreground">1.2 lbs</p>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="font-medium">Materials</p>
                    <p className="text-sm text-muted-foreground">Premium quality materials</p>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="font-medium">Warranty</p>
                    <p className="text-sm text-muted-foreground">2 years</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Customer Reviews</h3>
                  <Button>Write a Review</Button>
                </div>
                <div className="grid grid-cols-1 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < 5 ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">2 weeks ago</span>
                      </div>
                      <h4 className="font-medium mb-1">John D.</h4>
                      <p className="text-sm text-muted-foreground">
                        This product exceeded my expectations! The quality is excellent and it arrived faster than I expected.
                        Definitely worth the price and I would recommend it to anyone looking for a reliable product.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < 4 ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">1 month ago</span>
                      </div>
                      <h4 className="font-medium mb-1">Sarah M.</h4>
                      <p className="text-sm text-muted-foreground">
                        Great product for the price. It's sturdy and well-designed. The only reason I'm giving it 4 stars
                        instead of 5 is because the color is slightly different from what was shown in the pictures.
                        Otherwise, very satisfied with my purchase.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {relatedProducts.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {relatedProducts.map(relatedProduct => (
                  <Card key={relatedProduct.id} className="overflow-hidden shopjoy-card-hover">
                    <Link to={`/products/${relatedProduct.id}`} className="block aspect-square overflow-hidden">
                      <img 
                        src={relatedProduct.image} 
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </Link>
                    <CardContent className="p-4">
                      <Link to={`/products/${relatedProduct.id}`}>
                        <h3 className="font-semibold text-lg mb-1 hover:text-primary transition-colors">
                          {relatedProduct.name}
                        </h3>
                      </Link>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-3 w-3 ${i < Math.floor(relatedProduct.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground ml-1">({relatedProduct.reviews})</span>
                        </div>
                        <span className="font-medium">${relatedProduct.price.toFixed(2)}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
