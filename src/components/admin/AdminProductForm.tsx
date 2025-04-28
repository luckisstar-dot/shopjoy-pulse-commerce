
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  addDoc, 
  collection, 
  doc, 
  getDoc, 
  serverTimestamp, 
  updateDoc 
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { toast } from 'sonner';
import { Image as ImageIcon, X } from 'lucide-react';

import { useFirebase } from '@/contexts/FirebaseContext';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

const productSchema = z.object({
  name: z.string().min(2, 'Product name is required'),
  price: z.coerce.number().min(0.01, 'Price must be greater than 0'),
  category: z.string().min(2, 'Category is required'),
  description: z.string().min(10, 'Description should be at least 10 characters'),
  featured: z.boolean().default(false),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductData extends ProductFormValues {
  imageUrl?: string;
  createdAt?: any;
  updatedAt?: any;
}

const AdminProductForm = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editProductId, setEditProductId] = useState<string | null>(null);
  const { db, storage } = useFirebase();

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      price: 0,
      category: '',
      description: '',
      featured: false,
    },
  });

  // Check if we're editing a product (from URL hash)
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#edit-product-')) {
      const productId = hash.replace('#edit-product-', '');
      setEditProductId(productId);
      loadProductData(productId);
    }
  }, []);

  // Load product data if editing
  const loadProductData = async (productId: string) => {
    try {
      const productDoc = await getDoc(doc(db, 'products', productId));
      if (productDoc.exists()) {
        const productData = productDoc.data() as ProductData;
        
        // Set form values
        form.reset({
          name: productData.name,
          price: productData.price,
          category: productData.category,
          description: productData.description,
          featured: productData.featured || false,
        });
        
        // Set image preview if exists
        if (productData.imageUrl) {
          setImagePreview(productData.imageUrl);
        }
      } else {
        toast.error('Product not found');
      }
    } catch (error) {
      console.error('Error loading product:', error);
      toast.error('Failed to load product data');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const onSubmit = async (data: ProductFormValues) => {
    setIsSubmitting(true);
    
    try {
      let imageUrl = imagePreview;
      
      // Upload image if a new one was selected
      if (image) {
        const storageRef = ref(storage, `products/${Date.now()}_${image.name}`);
        const snapshot = await uploadBytes(storageRef, image);
        imageUrl = await getDownloadURL(snapshot.ref);
      }
      
      const productData: ProductData = {
        ...data,
        ...(imageUrl && { imageUrl }),
      };
      
      if (editProductId) {
        // Update existing product
        const productRef = doc(db, 'products', editProductId);
        await updateDoc(productRef, {
          ...productData,
          updatedAt: serverTimestamp(),
        });
        toast.success('Product updated successfully');
      } else {
        // Create new product
        await addDoc(collection(db, 'products'), {
          ...productData,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        toast.success('Product added successfully');
      }
      
      // Reset form
      form.reset();
      setImage(null);
      setImagePreview(null);
      setEditProductId(null);
      window.location.hash = '';
      
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error('Failed to save product');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-6">
        {editProductId ? 'Edit Product' : 'Add New Product'}
      </h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter product name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div>
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price ($)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="0.00" 
                        step="0.01" 
                        min="0" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input placeholder="Enter product category" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Enter product description" 
                    rows={4}
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="featured"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Featured Product</FormLabel>
                  <FormDescription>
                    Display this product in featured sections
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          <div>
            <FormLabel>Product Image</FormLabel>
            
            {!imagePreview ? (
              <div className="mt-2 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-6">
                <label className="w-full flex flex-col items-center justify-center cursor-pointer">
                  <ImageIcon className="h-12 w-12 text-gray-400" />
                  <span className="mt-2 text-sm text-gray-500">Upload an image</span>
                  <Input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            ) : (
              <div className="mt-2 relative w-40 h-40">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="w-full h-full object-cover rounded-md"
                />
                <Button 
                  variant="destructive" 
                  size="icon" 
                  className="absolute top-2 right-2 h-6 w-6"
                  onClick={clearImage}
                  type="button"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
          
          <div className="flex justify-end gap-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => {
                form.reset();
                setImage(null);
                setImagePreview(null);
                setEditProductId(null);
                window.location.hash = '';
              }}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : editProductId ? 'Update Product' : 'Add Product'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AdminProductForm;
