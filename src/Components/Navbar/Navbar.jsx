import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiShoppingCart, FiSearch, FiUser } from 'react-icons/fi';
import { ShopContext } from '../../Context/ShopContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { getTotalCartitems } = useContext(ShopContext);
  const location = useLocation();

  const navLinks = [
    { name: 'Shop', path: '/' },
    { name: 'Electronics', path: '/electronics' },
    { name: 'Pots', path: '/pots' },
    { name: 'Plants', path: '/plants' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const cartCount = getTotalCartitems();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-neutral-100">
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-glow group-hover:shadow-lg transition-shadow duration-300">
              <span className="text-white font-bold text-xl">G</span>
            </div>
            <span className="text-xl font-bold text-neutral-800 hidden sm:block">
              Green<span className="text-primary-600">Cart</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`
                  px-4 py-2 rounded-xl font-medium transition-all duration-200
                  ${isActive(link.path)
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-neutral-600 hover:text-neutral-800 hover:bg-neutral-100'
                  }
                `}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-neutral-600 hover:bg-neutral-100 hover:text-neutral-800 transition-all duration-200"
              aria-label="Search"
            >
              <FiSearch className="w-5 h-5" />
            </button>

            {/* User/Login */}
            <Link
              to="/login"
              className="w-10 h-10 rounded-xl flex items-center justify-center text-neutral-600 hover:bg-neutral-100 hover:text-neutral-800 transition-all duration-200"
              aria-label="Login"
            >
              <FiUser className="w-5 h-5" />
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative w-10 h-10 rounded-xl flex items-center justify-center text-neutral-600 hover:bg-neutral-100 hover:text-neutral-800 transition-all duration-200"
              aria-label="Cart"
            >
              <FiShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-scale-in">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center text-neutral-600 hover:bg-neutral-100 hover:text-neutral-800 transition-all duration-200"
              aria-label="Menu"
            >
              {isMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Search Bar (expandable) */}
        {isSearchOpen && (
          <div className="pb-4 animate-slide-down">
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full pl-12 pr-4 py-3 bg-neutral-100 rounded-xl text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all duration-200"
                autoFocus
              />
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 animate-slide-down">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`
                    px-4 py-3 rounded-xl font-medium transition-all duration-200
                    ${isActive(link.path)
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-neutral-600 hover:text-neutral-800 hover:bg-neutral-100'
                    }
                  `}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
