import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiTruck, FiShield, FiRefreshCw, FiHeadphones } from 'react-icons/fi';
import categories from '../data/categories';
import { getFeaturedProducts, getNewArrivals } from '../data/products';
import { ProductCard, CategoryCard, Button } from '../Components/ui';

const Shop = () => {
  const featuredProducts = getFeaturedProducts();
  const newArrivals = getNewArrivals();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="container-custom py-16 md:py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="text-center lg:text-left animate-fade-in">
              <span className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6">
                🌿 New Season Collection
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6 leading-tight">
                Discover Premium
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">
                  Electronics, Pots & Plants
                </span>
              </h1>
              <p className="text-lg text-neutral-600 mb-8 max-w-lg mx-auto lg:mx-0">
                Transform your space with our curated collection of tech gadgets, beautiful planters, and fresh indoor plants. Quality you can trust.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button to="/plants" size="lg" icon={<FiArrowRight />} iconPosition="right">
                  Shop Now
                </Button>
                <Button to="/electronics" variant="outline" size="lg">
                  Explore Products
                </Button>
              </div>
            </div>

            {/* Hero Image/Visual */}
            <div className="relative hidden lg:block animate-slide-up">
              <div className="relative z-10">
                <img
                  src="https://placehold.co/600x600/16a34a/dcfce7?text=Premium+Collection"
                  alt="Premium Collection"
                  className="w-full h-auto rounded-3xl shadow-strong"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-accent-200 rounded-full blur-3xl opacity-60" />
              <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-primary-200 rounded-full blur-3xl opacity-60" />
            </div>
          </div>
        </div>

        {/* Wave decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-16">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C40.23,95.8,120.62,83.38,321.39,56.44Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Features Bar */}
      <section className="py-8 bg-white border-b border-neutral-100">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: FiTruck, title: 'Free Shipping', desc: 'On orders over $50' },
              { icon: FiShield, title: 'Secure Payment', desc: '100% protected' },
              { icon: FiRefreshCw, title: 'Easy Returns', desc: '30-day guarantee' },
              { icon: FiHeadphones, title: '24/7 Support', desc: 'Always here to help' },
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-3 text-center md:text-left">
                <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-800">{feature.title}</h4>
                  <p className="text-sm text-neutral-500">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Browse our curated collection of premium products across three main categories
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} variant="large" />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 md:py-20 bg-neutral-50">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2">
                Featured Products
              </h2>
              <p className="text-neutral-600">
                Bestsellers and popular items from our collection
              </p>
            </div>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
            >
              View All Products
              <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="py-16 md:py-20">
        <div className="container-custom">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary-600 to-primary-700">
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <pattern id="dots" patternUnits="userSpaceOnUse" width="20" height="20">
                    <circle cx="10" cy="10" r="2" fill="white" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#dots)" />
              </svg>
            </div>
            <div className="relative px-6 py-12 md:px-12 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left text-white">
                <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-4">
                  Limited Time Offer
                </span>
                <h3 className="text-3xl md:text-4xl font-bold mb-3">
                  Get 25% Off Your First Order!
                </h3>
                <p className="text-white/80 text-lg max-w-lg">
                  Sign up today and receive an exclusive discount on your first purchase. Don't miss out on this amazing deal!
                </p>
              </div>
              <Button
                to="/signup"
                variant="secondary"
                size="lg"
                className="bg-white text-primary-600 hover:bg-neutral-100 shadow-strong"
              >
                Claim Discount
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="inline-block px-3 py-1 bg-accent-100 text-accent-700 rounded-full text-sm font-medium mb-3">
                Just Arrived
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2">
                New Arrivals
              </h2>
              <p className="text-neutral-600">
                Fresh additions to our collection
              </p>
            </div>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
            >
              Shop New Arrivals
              <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {newArrivals.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 md:py-20 bg-neutral-900">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Stay in the Loop
            </h2>
            <p className="text-neutral-400 mb-8">
              Subscribe to our newsletter for exclusive deals, new arrivals, and plant care tips delivered straight to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <Button type="submit" variant="primary">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shop;
