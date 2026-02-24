import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Star, Check, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useQuiz } from '@/context/QuizContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import type { Product } from '@/types';

const categories = ['All', 'Supplements', 'Digestive Health', 'Oils', 'Immunity', 'Skin Health'];

export default function Products() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { addToCart } = useCart();
  const { result } = useQuiz();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const isRecommendedForUser = (product: Product) => {
    if (!result) return false;
    return product.recommendedFor.includes(result.dominantDosha);
  };

  return (
    <section id="shop" className="py-20 lg:py-32 bg-white" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="inline-block text-green-600 font-medium mb-4">Our Shop</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-900 mb-6">
            Shop Our Herbal Essentials
          </h2>
          <p className="text-gray-600 text-lg">
            Support your journey to balance with our curated selection of high-quality Ayurvedic herbs and products.
          </p>
        </motion.div>

        {/* Personalized Banner */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8 p-4 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
              <span className="text-green-800">
                Products marked with <span className="font-semibold">Recommended</span> are tailored for your {result.dominantDosha} dosha
              </span>
            </div>
          </motion.div>
        )}

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <motion.div
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => {
              const isRecommended = isRecommendedForUser(product);

              return (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {isRecommended && (
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-amber-500 text-white">
                          <Star className="w-3 h-3 mr-1 fill-white" />
                          For You
                        </Badge>
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
                      <Badge variant="secondary" className="bg-white/90">
                        {product.category}
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{product.name}</h3>
                    <p className="text-gray-500 text-sm mb-3 line-clamp-2">{product.description}</p>

                    {/* Benefits */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {product.benefits.slice(0, 2).map((benefit, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 bg-green-50 text-green-700 rounded-full"
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>

                    {/* Price & Actions */}
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-green-700">₹{product.price}</span>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedProduct(product)}
                          className="text-green-600 border-green-600 hover:bg-green-50"
                        >
                          Details
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => addToCart(product)}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Button
            variant="outline"
            size="lg"
            className="border-green-600 text-green-700 hover:bg-green-50 rounded-full px-8"
          >
            Explore All Products
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>

      {/* Product Detail Modal */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-2xl">
          {selectedProduct && (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-64 object-cover rounded-xl"
                />
                {isRecommendedForUser(selectedProduct) && (
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-amber-500 text-white">
                      <Star className="w-3 h-3 mr-1 fill-white" />
                      Recommended for {result?.dominantDosha}
                    </Badge>
                  </div>
                )}
              </div>
              <div>
                <DialogHeader>
                  <DialogTitle className="text-2xl">{selectedProduct.name}</DialogTitle>
                </DialogHeader>
                <p className="text-gray-600 mt-2">{selectedProduct.description}</p>

                <div className="mt-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Benefits:</h4>
                  <ul className="space-y-1">
                    {selectedProduct.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-600">
                        <Check className="w-4 h-4 text-green-500" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Recommended for:</h4>
                  <div className="flex gap-2">
                    {selectedProduct.recommendedFor.map((dosha) => (
                      <Badge key={dosha} variant="outline" className="text-green-700">
                        {dosha}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <span className="text-3xl font-bold text-green-700">₹{selectedProduct.price}</span>
                  <Button
                    onClick={() => {
                      addToCart(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
