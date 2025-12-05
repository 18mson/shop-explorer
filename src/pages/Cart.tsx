import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/useCart';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();

  const subtotal = getTotalPrice();
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <ShoppingBag className="mx-auto text-vintage-medium mb-4" size={64} />
        <h2 className="text-2xl font-bold text-vintage-dark mb-2">Your cart is empty</h2>
        <p className="text-gray-600 mb-6">Add some products to get started!</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-vintage-dark text-white px-6 py-3 rounded-lg hover:bg-vintage-medium transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Continue Shopping</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-vintage-dark">Shopping Cart</h1>
        <button
          onClick={clearCart}
          className="text-red-600 hover:text-red-800 transition-colors text-sm font-medium"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col sm:flex-row gap-4"
            >
              <Link to={`/product/${item.product.id}`} className="sm:w-32 sm:h-32 shrink-0">
                <img
                  src={item.product.images[0]}
                  alt={item.product.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </Link>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <Link
                    to={`/product/${item.product.id}`}
                    className="text-lg font-semibold text-vintage-dark hover:text-vintage-medium transition-colors"
                  >
                    {item.product.title}
                  </Link>
                  <p className="text-sm text-gray-600">{item.product.category.name}</p>
                  <p className="text-xl font-bold text-vintage-dark mt-2">${item.product.price}</p>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="p-2 rounded-lg bg-vintage-light hover:bg-vintage-medium transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-12 text-center font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="p-2 rounded-lg bg-vintage-light hover:bg-vintage-medium transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>

              <div className="sm:text-right">
                <p className="text-lg font-bold text-vintage-dark">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
            <h2 className="text-xl font-bold text-vintage-dark mb-4">Order Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Tax (10%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between text-xl font-bold text-vintage-dark">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button className="w-full bg-vintage-dark text-white py-3 px-6 rounded-lg font-semibold hover:bg-vintage-medium transition-colors mb-3">
              Proceed to Checkout
            </button>

            <Link
              to="/"
              className="block text-center text-vintage-dark hover:text-vintage-medium transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
