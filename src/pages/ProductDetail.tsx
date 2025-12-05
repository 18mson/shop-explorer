import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { ArrowLeft, ShoppingCart, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { api } from '../services/api';
import { useCart } from '../context/useCart';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => api.getProduct(Number(id)),
    enabled: !!id,
  });

  const addToCartMutation = useMutation({
    mutationFn: (productId: number) => api.addToCart(productId),
    onMutate: () => {
      if (product) {
        addToCart(product);
        setFeedbackMessage({ type: 'success', text: 'Added to cart!' });
        setTimeout(() => setFeedbackMessage(null), 3000);
      }
    },
    onError: () => {
      setFeedbackMessage({ type: 'error', text: 'Failed to add to cart. Please try again.' });
      setTimeout(() => setFeedbackMessage(null), 3000);
    },
  });

  const handleAddToCart = () => {
    if (product) {
      addToCartMutation.mutate(product.id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="animate-spin text-vintage-dark" size={48} />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 text-lg mb-4">Failed to load product. Please try again later.</p>
        <Link to="/" className="text-vintage-dark underline hover:text-vintage-medium">
          Return to products
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-vintage-dark hover:text-vintage-medium transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Back to products</span>
      </Link>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8">
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
              <img
                src={product.images[selectedImage]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.slice(0, 4).map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square overflow-hidden rounded-lg border-2 transition-colors ${
                      selectedImage === index ? 'border-vintage-dark' : 'border-gray-200'
                    }`}
                  >
                    <img src={image} alt={`${product.title} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-vintage-dark mb-2">{product.title}</h1>
              <p className="text-lg text-gray-600">{product.category.name}</p>
            </div>

            <div className="text-4xl font-bold text-vintage-dark">${product.price}</div>

            <div>
              <h2 className="text-xl font-semibold text-vintage-dark mb-2">Description</h2>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                disabled={addToCartMutation.isPending}
                className="w-full bg-vintage-dark text-white py-3 px-6 rounded-lg font-semibold hover:bg-vintage-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {addToCartMutation.isPending ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    <span>Adding...</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart size={20} />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>

              {feedbackMessage && (
                <div
                  className={`flex items-center gap-2 p-3 rounded-lg ${
                    feedbackMessage.type === 'success'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {feedbackMessage.type === 'success' ? (
                    <CheckCircle size={20} />
                  ) : (
                    <XCircle size={20} />
                  )}
                  <span>{feedbackMessage.text}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
