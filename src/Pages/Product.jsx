import React, { useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiHeart, FiShoppingCart, FiStar, FiChevronRight, FiCheck, FiTruck, FiShield, FiRefreshCw } from 'react-icons/fi';
import { ShopContext } from '../Context/ShopContext';
import products, { getProductsByCategory } from '../data/products';
import { Button, ProductCard, QuantitySelector } from '../Components/ui';

const Product = () => {
  const { productId } = useParams();
  const { addToCart } = useContext(ShopContext);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  const product = products.find((p) => p.id === Number(productId));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-neutral-800 mb-4">Product Not Found</h2>
          <Button to="/">Back to Shop</Button>
        </div>
      </div>
    );
  }

  const relatedProducts = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const discount = product.old_price
    ? Math.round(((product.old_price - product.new_price) / product.old_price) * 100)
    : 0;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product.id);
    }
    setQuantity(1);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="container-custom py-4">
        <nav className="flex items-center gap-2 text-sm text-neutral-500">
          <Link to="/" className="hover:text-primary-600 transition-colors">Home</Link>
          <FiChevronRight className="w-4 h-4" />
          <Link to={`/${product.category}`} className="hover:text-primary-600 transition-colors capitalize">
            {product.category}
          </Link>
          <FiChevronRight className="w-4 h-4" />
          <span className="text-neutral-800 truncate max-w-[200px]">{product.name}</span>
        </nav>
      </div>

      {/* Product Section */}
      <section className="container-custom py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-neutral-100 rounded-3xl overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {discount > 0 && (
                <span className="absolute top-4 left-4 px-3 py-1 bg-red-500 text-white text-sm font-semibold rounded-full">
                  -{discount}%
                </span>
              )}
            </div>
            {/* Thumbnail Gallery (placeholder for future) */}
            <div className="flex gap-3">
              {[product.image].map((img, index) => (
                <button
                  key={index}
                  className="w-20 h-20 rounded-xl overflow-hidden border-2 border-primary-500"
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className={`
                    px-3 py-1 rounded-full text-xs font-semibold uppercase
                    ${tag === 'new' ? 'bg-primary-100 text-primary-700' : ''}
                    ${tag === 'bestseller' ? 'bg-accent-100 text-accent-700' : ''}
                    ${tag === 'popular' ? 'bg-secondary-100 text-secondary-700' : ''}
                  `}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title & Rating */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-3">
                {product.name}
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-amber-400 fill-current' : 'text-neutral-300'}`}
                    />
                  ))}
                </div>
                <span className="text-neutral-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-neutral-900">
                ${product.new_price.toFixed(2)}
              </span>
              {product.old_price && (
                <span className="text-xl text-neutral-400 line-through">
                  ${product.old_price.toFixed(2)}
                </span>
              )}
              {discount > 0 && (
                <span className="px-2 py-1 bg-red-100 text-red-600 text-sm font-semibold rounded">
                  Save ${(product.old_price - product.new_price).toFixed(2)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-neutral-600 leading-relaxed">
              {product.description}
            </p>

            {/* Stock Status */}
            <div className="flex items-center gap-2 text-sm">
              {product.inStock ? (
                <>
                  <FiCheck className="w-5 h-5 text-primary-600" />
                  <span className="text-primary-600 font-medium">In Stock</span>
                </>
              ) : (
                <span className="text-red-600 font-medium">Out of Stock</span>
              )}
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4">
              <QuantitySelector
                quantity={quantity}
                onIncrease={() => setQuantity(q => Math.min(q + 1, 10))}
                onDecrease={() => setQuantity(q => Math.max(q - 1, 1))}
                size="lg"
              />
              <div className="flex-1 flex gap-3">
                <Button
                  size="lg"
                  fullWidth
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  icon={<FiShoppingCart />}
                >
                  Add to Cart
                </Button>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`
                    w-14 h-14 flex-shrink-0 rounded-xl border-2 flex items-center justify-center transition-all duration-200
                    ${isWishlisted
                      ? 'border-red-500 bg-red-50 text-red-500'
                      : 'border-neutral-200 text-neutral-400 hover:border-red-500 hover:text-red-500'
                    }
                  `}
                >
                  <FiHeart className={`w-6 h-6 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-neutral-100">
              {[
                { icon: FiTruck, label: 'Free Shipping' },
                { icon: FiShield, label: 'Secure Payment' },
                { icon: FiRefreshCw, label: '30-Day Returns' },
              ].map((feature) => (
                <div key={feature.label} className="text-center">
                  <feature.icon className="w-6 h-6 mx-auto text-primary-600 mb-2" />
                  <span className="text-xs text-neutral-600">{feature.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Tabs */}
      <section className="container-custom py-12">
        <div className="border-b border-neutral-200">
          <div className="flex gap-8">
            {['description', 'reviews', 'shipping'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  pb-4 font-medium capitalize transition-colors relative
                  ${activeTab === tab
                    ? 'text-primary-600'
                    : 'text-neutral-500 hover:text-neutral-800'
                  }
                `}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600" />
                )}
              </button>
            ))}
          </div>
        </div>
        <div className="py-8">
          {activeTab === 'description' && (
            <div className="prose max-w-none">
              <p className="text-neutral-600 leading-relaxed">{product.description}</p>
              <p className="text-neutral-600 leading-relaxed mt-4">
                This is a high-quality product designed to meet your needs. Our commitment to excellence ensures that every item meets rigorous standards for durability and performance.
              </p>
            </div>
          )}
          {activeTab === 'reviews' && (
            <div className="text-center py-8 text-neutral-500">
              <p>No reviews yet. Be the first to review this product!</p>
              <Button variant="outline" className="mt-4">Write a Review</Button>
            </div>
          )}
          {activeTab === 'shipping' && (
            <div className="space-y-4 text-neutral-600">
              <p><strong>Free Shipping:</strong> On all orders over $50</p>
              <p><strong>Delivery Time:</strong> 3-5 business days</p>
              <p><strong>Returns:</strong> 30-day money-back guarantee</p>
            </div>
          )}
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="container-custom py-12 border-t border-neutral-100">
          <h2 className="text-2xl font-bold text-neutral-900 mb-8">
            You May Also Like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Product;
