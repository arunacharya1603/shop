import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight, FiCreditCard, FiSmartphone, FiDollarSign, FiLock } from 'react-icons/fi';
import { ShopContext } from '../Context/ShopContext';
import { Button, Input } from '../Components/ui';

const Checkout = () => {
    const { all_product, cartItems, getTotalCartAmount } = useContext(ShopContext);
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'United States',
    });

    const cartProducts = all_product
        .filter((product) => cartItems[product.id] > 0)
        .map((product) => ({
            ...product,
            quantity: cartItems[product.id],
        }));

    const subtotal = getTotalCartAmount();
    const shipping = subtotal > 50 ? 0 : 9.99;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Order placed successfully! (This is a UI demo - no actual order was processed)');
    };

    const paymentMethods = [
        { id: 'card', name: 'Credit/Debit Card', icon: FiCreditCard },
        { id: 'upi', name: 'UPI', icon: FiSmartphone },
        { id: 'cod', name: 'Cash on Delivery', icon: FiDollarSign },
    ];

    return (
        <div className="min-h-screen bg-neutral-50">
            {/* Breadcrumb */}
            <div className="bg-white border-b border-neutral-100">
                <div className="container-custom py-4">
                    <nav className="flex items-center gap-2 text-sm text-neutral-500">
                        <Link to="/" className="hover:text-primary-600 transition-colors">Home</Link>
                        <FiChevronRight className="w-4 h-4" />
                        <Link to="/cart" className="hover:text-primary-600 transition-colors">Cart</Link>
                        <FiChevronRight className="w-4 h-4" />
                        <span className="text-neutral-800">Checkout</span>
                    </nav>
                </div>
            </div>

            <div className="container-custom py-8 md:py-12">
                <h1 className="text-3xl font-bold text-neutral-900 mb-8">Checkout</h1>

                <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
                    {/* Checkout Form */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Contact Information */}
                        <div className="bg-white rounded-2xl p-6 shadow-soft">
                            <h2 className="text-xl font-bold text-neutral-900 mb-6">Contact Information</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <Input
                                    label="First Name"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    placeholder="John"
                                    required
                                />
                                <Input
                                    label="Last Name"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    placeholder="Doe"
                                    required
                                />
                                <Input
                                    label="Email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="john@example.com"
                                    required
                                />
                                <Input
                                    label="Phone"
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="+1 (555) 123-4567"
                                    required
                                />
                            </div>
                        </div>

                        {/* Shipping Address */}
                        <div className="bg-white rounded-2xl p-6 shadow-soft">
                            <h2 className="text-xl font-bold text-neutral-900 mb-6">Shipping Address</h2>
                            <div className="space-y-4">
                                <Input
                                    label="Street Address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    placeholder="123 Main Street, Apt 4"
                                    required
                                />
                                <div className="grid md:grid-cols-2 gap-4">
                                    <Input
                                        label="City"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        placeholder="New York"
                                        required
                                    />
                                    <Input
                                        label="State/Province"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleInputChange}
                                        placeholder="NY"
                                        required
                                    />
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <Input
                                        label="ZIP/Postal Code"
                                        name="zipCode"
                                        value={formData.zipCode}
                                        onChange={handleInputChange}
                                        placeholder="10001"
                                        required
                                    />
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-2">Country</label>
                                        <select
                                            name="country"
                                            value={formData.country}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-neutral-200 rounded-xl bg-white text-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                        >
                                            <option>United States</option>
                                            <option>Canada</option>
                                            <option>United Kingdom</option>
                                            <option>Australia</option>
                                            <option>India</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="bg-white rounded-2xl p-6 shadow-soft">
                            <h2 className="text-xl font-bold text-neutral-900 mb-6">Payment Method</h2>
                            <div className="space-y-3">
                                {paymentMethods.map((method) => (
                                    <label
                                        key={method.id}
                                        className={`
                      flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all
                      ${paymentMethod === method.id
                                                ? 'border-primary-500 bg-primary-50'
                                                : 'border-neutral-200 hover:border-neutral-300'
                                            }
                    `}
                                    >
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value={method.id}
                                            checked={paymentMethod === method.id}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="sr-only"
                                        />
                                        <div className={`
                      w-5 h-5 rounded-full border-2 flex items-center justify-center
                      ${paymentMethod === method.id ? 'border-primary-500' : 'border-neutral-300'}
                    `}>
                                            {paymentMethod === method.id && (
                                                <div className="w-3 h-3 rounded-full bg-primary-500" />
                                            )}
                                        </div>
                                        <method.icon className={`w-6 h-6 ${paymentMethod === method.id ? 'text-primary-600' : 'text-neutral-400'}`} />
                                        <span className={`font-medium ${paymentMethod === method.id ? 'text-primary-700' : 'text-neutral-700'}`}>
                                            {method.name}
                                        </span>
                                    </label>
                                ))}
                            </div>

                            {paymentMethod === 'card' && (
                                <div className="mt-6 space-y-4 p-4 bg-neutral-50 rounded-xl">
                                    <Input
                                        label="Card Number"
                                        placeholder="1234 5678 9012 3456"
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <Input
                                            label="Expiry Date"
                                            placeholder="MM/YY"
                                        />
                                        <Input
                                            label="CVV"
                                            placeholder="123"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl p-6 shadow-soft sticky top-24">
                            <h2 className="text-xl font-bold text-neutral-900 mb-6">Order Summary</h2>

                            {/* Cart Items */}
                            <div className="space-y-4 max-h-64 overflow-y-auto mb-6">
                                {cartProducts.map((product) => (
                                    <div key={product.id} className="flex gap-3">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-16 h-16 object-cover rounded-lg"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-neutral-800 line-clamp-1">{product.name}</p>
                                            <p className="text-sm text-neutral-500">Qty: {product.quantity}</p>
                                        </div>
                                        <p className="text-sm font-semibold text-neutral-800">
                                            ${(product.new_price * product.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <hr className="border-neutral-100 mb-4" />

                            {/* Totals */}
                            <div className="space-y-3">
                                <div className="flex justify-between text-neutral-600">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-neutral-600">
                                    <span>Shipping</span>
                                    <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                                </div>
                                <div className="flex justify-between text-neutral-600">
                                    <span>Tax (8%)</span>
                                    <span>${tax.toFixed(2)}</span>
                                </div>
                                <hr className="border-neutral-100" />
                                <div className="flex justify-between text-lg font-bold text-neutral-900">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Place Order Button */}
                            <div className="mt-6">
                                <Button type="submit" fullWidth size="lg" icon={<FiLock />}>
                                    Place Order
                                </Button>
                                <p className="text-xs text-neutral-500 text-center mt-3 flex items-center justify-center gap-1">
                                    <FiLock className="w-3 h-3" />
                                    Secure 256-bit SSL encryption
                                </p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Checkout;
