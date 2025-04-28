
import { useEffect, useState } from 'react';
import { collection, deleteDoc, doc, getDocs, orderBy, query } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { Pencil, Trash } from 'lucide-react';
import { toast } from 'sonner';

import { useFirebase } from '@/contexts/FirebaseContext';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  imageUrl: string;
  featured?: boolean;
}

const AdminProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { db, storage } = useFirebase();

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const productsQuery = query(collection(db, 'products'), orderBy('name'));
      const snapshot = await getDocs(productsQuery);
      const productsList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      } as Product));
      setProducts(productsList);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [db]);

  const handleDelete = async (product: Product) => {
    if (!window.confirm(`Are you sure you want to delete ${product.name}?`)) {
      return;
    }

    try {
      // Delete image from storage if it exists
      if (product.imageUrl) {
        const imageRef = ref(storage, product.imageUrl);
        await deleteObject(imageRef).catch(err => {
          console.log('Image might not exist:', err);
          // Continue with product deletion even if image deletion fails
        });
      }

      // Delete product document
      await deleteDoc(doc(db, 'products', product.id));
      toast.success(`${product.name} deleted successfully`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    }
  };

  const handleEdit = (productId: string) => {
    // For now, we'll just update the selected product to edit via URL
    // In the future, this could be converted to use state/context
    window.location.href = `#edit-product-${productId}`;
    document.getElementById('add-product-tab')?.click();
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading products...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Product Inventory</h2>
        {products.length === 0 ? (
          <p className="text-center py-8 text-muted-foreground">No products found. Add your first product!</p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        {product.imageUrl && (
                          <img 
                            src={product.imageUrl} 
                            alt={product.name}
                            className="w-10 h-10 rounded object-cover"
                          />
                        )}
                        <span>{product.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>{product.featured ? 'Yes' : 'No'}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleEdit(product.id)}
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDelete(product)}
                        >
                          <Trash className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProductList;
