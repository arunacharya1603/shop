import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FiTrash2, FiArrowRight, FiChevronRight, FiShoppingBag, FiTag } from 'react-icons/fi';
import { ShopContext } from '../Context/ShopContext';
import { Button, QuantitySelector, EmptyState } from '../Components/ui';

const Cart = () => {
  const { all_product, cartItems, addToCart, removeFromCart, getTotalCartAmount } = useContext(ShopContext);

  // Get cart items with product details
  const cartProducts = all_product
    .filter((product) => cartItems[product.id] > 0)
    .map((product) => ({
      ...product,
      quantity: cartItems[product.id],
    }));

  const subtotal = getTotalCartAmount();
  const shipping = subtotal > 50 ? 0 : 9.99;
  const total = subtotal + shipping;

  if (cartProducts.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-50 py-12">
        <div className="container-custom">
          <EmptyState type="cart" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-neutral-100">
        <div className="container-custom py-4">
          <nav className="flex items-center gap-2 text-sm text-neutral-500">
            <Link to="/" className="hover:text-primary-600 transition-colors">Home</Link>
            <FiChevronRight className="w-4 h-4" />
            <span className="text-neutral-800">Shopping Cart</span>
          </nav>
        </div>
      </div>

      <div className="container-custom py-8 md:py-12">
        <h1 className="text-3xl font-bold text-neutral-900 mb-8">
          Shopping Cart
          <span className="text-lg font-normal text-neutral-500 ml-2">
            ({cartProducts.reduce((acc, p) => acc + p.quantity, 0)} items)
          </span>
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl p-4 md:p-6 shadow-soft flex gap-4 md:gap-6"
              >
                {/* Product Image */}
                <Link to={`/product/${product.id}`} className="flex-shrink-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-xl"
                  />
                </Link>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Link
                        to={`/product/${product.id}`}
                        className="font-semibold text-neutral-800 hover:text-primary-600 transition-colors line-clamp-2"
                      >
                        {product.name}
                      </Link>
                      <p className="text-sm text-neutral-500 capitalize mt-1">{product.category}</p>
                    </div>
                    <button
                      onClick={() => {
                        // Remove all of this item
                        for (let i = 0; i < product.quantity; i++) {
                          removeFromCart(product.id);
                        }
                      }}
                      className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      aria-label="Remove item"
                    >
                      <FiTrash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mt-4">
                    <QuantitySelector
                      quantity={product.quantity}
                      onIncrease={() => addToCart(product.id)}
                      onDecrease={() => removeFromCart(product.id)}
                    />
                    <div className="text-right">
                      <p className="text-lg font-bold text-neutral-900">
                        ${(product.new_price * product.quantity).toFixed(2)}
                      </p>
                      <p className="text-sm text-neutral-500">
                        ${product.new_price.toFixed(2)} each
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-soft sticky top-24">
              <h2 className="text-xl font-bold text-neutral-900 mb-6">Order Summary</h2>

              <div className="space-y-4">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                {shipping > 0 && (
                  <p className="text-sm text-primary-600">
                    Add ${(50 - subtotal).toFixed(2)} more for free shipping!
                  </p>
                )}
                <hr className="border-neutral-100" />
                <div className="flex justify-between text-lg font-bold text-neutral-900">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Promo Code */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Promo Code
                </label>
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <FiTag className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Enter code"
                      className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <Button variant="outline">Apply</Button>
                </div>
              </div>

              {/* Checkout Button */}
              <div className="mt-6 space-y-3">
                <Button
                  to="/checkout"
                  fullWidth
                  size="lg"
                  icon={<FiArrowRight />}
                  iconPosition="right"
                >
                  Proceed to Checkout
                </Button>
                <Button
                  to="/"
                  variant="ghost"
                  fullWidth
                  icon={<FiShoppingBag />}
                >
                  Continue Shopping
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-neutral-100">
                <div className="flex items-center justify-center gap-4 text-neutral-400 text-sm">
                  <span>🔒 Secure Checkout</span>
                  <span>|</span>
                  <span>💳 All Cards Accepted</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
