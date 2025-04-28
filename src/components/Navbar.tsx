
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ShoppingCart, Menu, X, User } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <Link to="/" className="flex items-center gap-2">
            <span className="h-8 w-8 rounded-full bg-gradient-to-br from-shopjoy-purple to-shopjoy-purple-dark flex items-center justify-center">
              <span className="text-white font-bold">SJ</span>
            </span>
            <span className="font-bold text-xl hidden sm:inline-block">ShopJoy</span>
          </Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link to="/" className="transition-colors hover:text-primary">Home</Link>
          <Link to="/products" className="transition-colors hover:text-primary">Products</Link>
          <Link to="/categories" className="transition-colors hover:text-primary">Categories</Link>
          <Link to="/about" className="transition-colors hover:text-primary">About</Link>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative hidden md:flex items-center">
            <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="w-[200px] lg:w-[300px] pl-8 rounded-full bg-muted"
            />
          </div>

          <Button variant="ghost" size="icon" asChild>
            <Link to="/account">
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Link>
          </Button>

          <Button variant="ghost" size="icon" asChild className="relative">
            <Link to="/cart">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-xs font-medium flex items-center justify-center text-primary-foreground">
                  {cartCount}
                </span>
              )}
            </Link>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-50 bg-background border-t p-4">
          <nav className="flex flex-col space-y-4">
            <Link to="/" className="py-2 px-4 hover:bg-muted rounded-md" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link to="/products" className="py-2 px-4 hover:bg-muted rounded-md" onClick={() => setIsMenuOpen(false)}>
              Products
            </Link>
            <Link to="/categories" className="py-2 px-4 hover:bg-muted rounded-md" onClick={() => setIsMenuOpen(false)}>
              Categories
            </Link>
            <Link to="/about" className="py-2 px-4 hover:bg-muted rounded-md" onClick={() => setIsMenuOpen(false)}>
              About
            </Link>
            <div className="py-2">
              <div className="relative flex items-center">
                <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full pl-8 rounded-full bg-muted"
                />
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
