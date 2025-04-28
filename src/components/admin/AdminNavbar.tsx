
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { LogOut, ShoppingBag, User } from 'lucide-react';
import { toast } from 'sonner';

import { useFirebase } from '@/contexts/FirebaseContext';
import { Button } from '@/components/ui/button';

const AdminNavbar = () => {
  const navigate = useNavigate();
  const { auth } = useFirebase();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully');
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to logout');
    }
  };

  return (
    <header className="border-b bg-white">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">ShopJoy Admin</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5" />
            <span className="font-medium">Admin</span>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
