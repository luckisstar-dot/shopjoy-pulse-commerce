
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { useFirebase } from '@/contexts/FirebaseContext';
import AdminNavbar from '@/components/admin/AdminNavbar';
import AdminProductList from '@/components/admin/AdminProductList';
import AdminProductForm from '@/components/admin/AdminProductForm';

const AdminDashboardPage = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { auth } = useFirebase();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setIsAuthorized(true);
          setError(null);
        } else {
          // Redirect to login if not authenticated
          navigate('/admin/login');
        }
        setIsLoading(false);
      }, (err) => {
        console.error("Auth state error:", err);
        setError("Authentication error. Please try again.");
        setIsLoading(false);
      });

      return () => unsubscribe();
    } catch (err) {
      console.error("Auth setup error:", err);
      setError("Failed to initialize authentication. Please refresh the page.");
      setIsLoading(false);
    }
  }, [auth, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-6 bg-red-50 rounded-lg border border-red-200">
          <p className="text-red-600 font-medium text-lg">{error}</p>
          <button 
            onClick={() => navigate('/admin/login')}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AdminNavbar />
      <main className="flex-grow p-6">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        <Tabs defaultValue="products" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger id="add-product-tab" value="add-product">Add Product</TabsTrigger>
          </TabsList>
          
          <TabsContent value="products">
            <AdminProductList />
          </TabsContent>
          
          <TabsContent value="add-product">
            <AdminProductForm />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboardPage;
