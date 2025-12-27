import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiInstagram, FiTwitter, FiFacebook, FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Newsletter signup logic would go here
    setEmail('');
    alert('Thank you for subscribing!');
  };

  const footerLinks = {
    shop: [
      { name: 'Electronics', path: '/electronics' },
      { name: 'Pots & Planters', path: '/pots' },
      { name: 'Plants', path: '/plants' },
      { name: 'New Arrivals', path: '/' },
      { name: 'Best Sellers', path: '/' },
    ],
    support: [
      { name: 'Contact Us', path: '#' },
      { name: 'FAQ', path: '#' },
      { name: 'Shipping Info', path: '#' },
      { name: 'Returns & Exchanges', path: '#' },
      { name: 'Track Order', path: '#' },
    ],
    company: [
      { name: 'About Us', path: '#' },
      { name: 'Careers', path: '#' },
      { name: 'Blog', path: '#' },
      { name: 'Press', path: '#' },
      { name: 'Sustainability', path: '#' },
    ],
  };

  const socialLinks = [
    { icon: FiInstagram, href: '#', label: 'Instagram' },
    { icon: FiTwitter, href: '#', label: 'Twitter' },
    { icon: FiFacebook, href: '#', label: 'Facebook' },
  ];

  return (
    <footer className="bg-neutral-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-neutral-800">
        <div className="container-custom py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2">Join our newsletter</h3>
              <p className="text-neutral-400">Get 10% off your first order and stay updated with our latest products.</p>
            </div>
            <form onSubmit={handleNewsletterSubmit} className="flex w-full md:w-auto gap-2">
              <div className="relative flex-1 md:w-64">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-3 bg-neutral-800 rounded-xl text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-600 transition-colors duration-200 flex items-center gap-2"
              >
                Subscribe
                <FiSend className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
                <span className="text-white font-bold text-xl">G</span>
              </div>
              <span className="text-xl font-bold">
                Green<span className="text-primary-500">Cart</span>
              </span>
            </Link>
            <p className="text-neutral-400 mb-6 max-w-sm">
              Your one-stop shop for premium electronics, beautiful planters, and fresh indoor plants. Bringing quality and nature to your doorstep.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-neutral-400">
                <FiMapPin className="w-5 h-5 flex-shrink-0" />
                <span>123 Green Street, Garden City, EC 10001</span>
              </div>
              <div className="flex items-center gap-3 text-neutral-400">
                <FiPhone className="w-5 h-5 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-neutral-400">
                <FiMail className="w-5 h-5 flex-shrink-0" />
                <span>hello@greencart.com</span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-bold text-lg mb-4">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-neutral-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-neutral-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-neutral-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-neutral-400 text-sm text-center md:text-left">
              © {new Date().getFullYear()} GreenCart. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-400 hover:bg-primary-500 hover:text-white transition-all duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <div className="flex items-center gap-4 text-sm text-neutral-400">
              <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
