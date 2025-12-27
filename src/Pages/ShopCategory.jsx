import React, { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { FiFilter, FiGrid, FiList, FiX } from 'react-icons/fi';
import products from '../data/products';
import categories, { getCategoryBySlug } from '../data/categories';
import { ProductCard, Button, ProductCardSkeleton } from '../Components/ui';

const ShopCategory = () => {
  const location = useLocation();
  // Extract category from pathname (e.g., /electronics -> electronics)
  const categorySlug = location.pathname.slice(1);
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [sortBy, setSortBy] = useState('featured');
  const [selectedTags, setSelectedTags] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [isLoading] = useState(false);

  // Get category info
  const currentCategory = categorySlug ? getCategoryBySlug(categorySlug) : null;

  // Filter products
  const filteredProducts = useMemo(() => {
    let result = categorySlug
      ? products.filter(p => p.category === categorySlug)
      : products;

    // Filter by price range
    result = result.filter(p => p.new_price >= priceRange[0] && p.new_price <= priceRange[1]);

    // Filter by tags
    if (selectedTags.length > 0) {
      result = result.filter(p => selectedTags.some(tag => p.tags.includes(tag)));
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        result = [...result].sort((a, b) => a.new_price - b.new_price);
        break;
      case 'price-high':
        result = [...result].sort((a, b) => b.new_price - a.new_price);
        break;
      case 'rating':
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result = [...result].filter(p => p.tags.includes('new')).concat(
          result.filter(p => !p.tags.includes('new'))
        );
        break;
      default:
        // featured - bestsellers first
        result = [...result].sort((a, b) => {
          const aScore = a.tags.includes('bestseller') ? 2 : a.tags.includes('popular') ? 1 : 0;
          const bScore = b.tags.includes('bestseller') ? 2 : b.tags.includes('popular') ? 1 : 0;
          return bScore - aScore;
        });
    }

    return result;
  }, [categorySlug, priceRange, selectedTags, sortBy]);

  const toggleTag = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setPriceRange([0, 200]);
    setSelectedTags([]);
    setSortBy('featured');
  };

  const pageTitle = currentCategory?.name || 'All Products';
  const pageDescription = currentCategory?.description || 'Browse our complete collection of premium products';

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className={`py-12 md:py-16 ${currentCategory ? `bg-gradient-to-r ${currentCategory.color}` : 'bg-gradient-to-r from-neutral-800 to-neutral-900'}`}>
        <div className="container-custom text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{pageTitle}</h1>
          <p className="text-white/80">{pageDescription}</p>
          <p className="text-white/60 mt-4 text-sm">{filteredProducts.length} products</p>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Button */}
          <div className="lg:hidden flex items-center justify-between gap-4">
            <button
              onClick={() => setIsFilterOpen(true)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-neutral-200 rounded-xl font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
            >
              <FiFilter className="w-5 h-5" />
              Filters
            </button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="flex-1 px-4 py-3 border border-neutral-200 rounded-xl font-medium text-neutral-700 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg text-neutral-800">Filters</h3>
                {(selectedTags.length > 0 || priceRange[0] > 0 || priceRange[1] < 200) && (
                  <button onClick={clearFilters} className="text-sm text-primary-600 hover:underline">
                    Clear all
                  </button>
                )}
              </div>

              {/* Categories */}
              {!categorySlug && (
                <div className="space-y-3">
                  <h4 className="font-semibold text-neutral-700">Categories</h4>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <a
                        key={cat.id}
                        href={`/${cat.slug}`}
                        className="block px-3 py-2 rounded-lg text-neutral-600 hover:bg-neutral-100 hover:text-neutral-800 transition-colors"
                      >
                        {cat.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Price Range */}
              <div className="space-y-3">
                <h4 className="font-semibold text-neutral-700">Price Range</h4>
                <div className="flex items-center gap-2 text-sm text-neutral-600">
                  <span>${priceRange[0]}</span>
                  <div className="flex-1 h-1 bg-neutral-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary-500 rounded-full"
                      style={{ width: `${(priceRange[1] / 200) * 100}%` }}
                    />
                  </div>
                  <span>${priceRange[1]}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full accent-primary-500"
                />
              </div>

              {/* Tags */}
              <div className="space-y-3">
                <h4 className="font-semibold text-neutral-700">Product Type</h4>
                <div className="flex flex-wrap gap-2">
                  {['new', 'bestseller', 'popular'].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`
                        px-3 py-1.5 rounded-full text-sm font-medium transition-colors capitalize
                        ${selectedTags.includes(tag)
                          ? 'bg-primary-500 text-white'
                          : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                        }
                      `}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Mobile Filter Drawer */}
          {isFilterOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div className="absolute inset-0 bg-black/50" onClick={() => setIsFilterOpen(false)} />
              <div className="absolute right-0 top-0 bottom-0 w-80 max-w-full bg-white p-6 overflow-y-auto animate-slide-down">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-lg text-neutral-800">Filters</h3>
                  <button onClick={() => setIsFilterOpen(false)}>
                    <FiX className="w-6 h-6 text-neutral-600" />
                  </button>
                </div>

                {/* Same filter content as desktop */}
                <div className="space-y-6">
                  {!categorySlug && (
                    <div className="space-y-3">
                      <h4 className="font-semibold text-neutral-700">Categories</h4>
                      <div className="space-y-2">
                        {categories.map((cat) => (
                          <a
                            key={cat.id}
                            href={`/${cat.slug}`}
                            className="block px-3 py-2 rounded-lg text-neutral-600 hover:bg-neutral-100"
                          >
                            {cat.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-3">
                    <h4 className="font-semibold text-neutral-700">Price Range</h4>
                    <div className="flex items-center gap-2 text-sm text-neutral-600">
                      <span>${priceRange[0]}</span>
                      <span>-</span>
                      <span>${priceRange[1]}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full accent-primary-500"
                    />
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-neutral-700">Product Type</h4>
                    <div className="flex flex-wrap gap-2">
                      {['new', 'bestseller', 'popular'].map((tag) => (
                        <button
                          key={tag}
                          onClick={() => toggleTag(tag)}
                          className={`
                            px-3 py-1.5 rounded-full text-sm font-medium transition-colors capitalize
                            ${selectedTags.includes(tag)
                              ? 'bg-primary-500 text-white'
                              : 'bg-neutral-100 text-neutral-600'
                            }
                          `}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <Button fullWidth onClick={() => setIsFilterOpen(false)}>
                    Apply Filters
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Product Grid */}
          <div className="flex-1">
            {/* Desktop Sort & View Controls */}
            <div className="hidden lg:flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'text-neutral-400 hover:bg-neutral-100'}`}
                >
                  <FiGrid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'text-neutral-400 hover:bg-neutral-100'}`}
                >
                  <FiList className="w-5 h-5" />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-neutral-500">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-neutral-200 rounded-xl text-neutral-700 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>

            {/* Product Grid */}
            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {[...Array(6)].map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className={`grid gap-4 md:gap-6 ${viewMode === 'grid'
                ? 'grid-cols-2 md:grid-cols-3'
                : 'grid-cols-1'
                }`}>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-neutral-500 mb-4">No products found matching your filters.</p>
                <Button onClick={clearFilters} variant="outline">
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopCategory;
