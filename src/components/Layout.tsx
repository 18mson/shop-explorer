import { Link, Outlet } from 'react-router-dom';
import { ShoppingCart, Store } from 'lucide-react';
import { useCart } from '../context/useCart';

export default function Layout() {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <div className="min-h-screen bg-vintage-lightest">
      <header className="bg-vintage-dark text-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold hover:opacity-80 transition-opacity">
              <Store size={32} />
              <span>Shop Explorer</span>
            </Link>
            <Link
              to="/cart"
              className="relative flex items-center gap-2 px-4 py-2 bg-vintage-medium rounded-lg hover:bg-vintage-light transition-colors"
            >
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
