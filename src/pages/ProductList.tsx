import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Search, Loader2 } from 'lucide-react';
import { api } from '../services/api';

export default function ProductList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const { data: products, isLoading: productsLoading, error: productsError } = useQuery({
    queryKey: ['products'],
    queryFn: () => api.getProducts(),
  });

  console.log(products);
  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: () => api.getCategories(),
  });

  const filteredProducts = useMemo(() => {
    if (!products) return [];

    return products.filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === null || product.category.id === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  if (productsLoading || categoriesLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="animate-spin text-vintage-dark" size={48} />
      </div>
    );
  }

  if (productsError) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 text-lg">Failed to load products. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-vintage-light rounded-lg p-6 shadow-md">
        <h1 className="text-3xl font-bold text-vintage-dark mb-6">Browse Products</h1>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-vintage-dark" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border-2 border-vintage-medium rounded-lg focus:outline-none focus:border-vintage-dark"
            />
          </div>

          <select
            value={selectedCategory ?? ''}
            onChange={(e) => setSelectedCategory(e.target.value ? Number(e.target.value) : null)}
            className="px-4 py-2 border-2 border-vintage-medium rounded-lg focus:outline-none focus:border-vintage-dark bg-white"
          >
            <option value="">All Categories</option>
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="text-sm text-vintage-dark mb-4">
        Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
          >
            <div className="aspect-square overflow-hidden bg-gray-100">
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg text-vintage-dark mb-2 line-clamp-2">
                {product.title}
              </h3>
              <p className="text-sm text-gray-600 mb-2">{product.category.name}</p>
              <p className="text-xl font-bold text-vintage-dark">${product.price}</p>
            </div>
          </Link>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-vintage-dark text-lg">No products found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
