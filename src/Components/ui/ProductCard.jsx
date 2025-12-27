import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingCart, FiStar, FiEye } from 'react-icons/fi';
import { ShopContext } from '../../Context/ShopContext';

const ProductCard = ({ product, showQuickView = true }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const { addToCart } = useContext(ShopContext);

    const {
        id,
        name,
        image,
        new_price,
        old_price,
        rating = 4.5,
        reviews = 0,
        tags = [],
    } = product;

    const discount = old_price ? Math.round(((old_price - new_price) / old_price) * 100) : 0;

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(id);
    };

    const handleWishlist = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsWishlisted(!isWishlisted);
    };

    return (
        <div
            className="group relative bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image Container */}
            <Link to={`/product/${id}`} className="block relative aspect-square overflow-hidden bg-neutral-100">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {tags.includes('new') && (
                        <span className="px-2.5 py-1 bg-primary-500 text-white text-xs font-semibold rounded-full">
                            NEW
                        </span>
                    )}
                    {tags.includes('bestseller') && (
                        <span className="px-2.5 py-1 bg-accent-500 text-white text-xs font-semibold rounded-full">
                            BESTSELLER
                        </span>
                    )}
                    {discount > 0 && (
                        <span className="px-2.5 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
                            -{discount}%
                        </span>
                    )}
                </div>

                {/* Wishlist Button */}
                <button
                    onClick={handleWishlist}
                    className={`
            absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center
            transition-all duration-300 backdrop-blur-sm
            ${isWishlisted
                            ? 'bg-red-500 text-white'
                            : 'bg-white/80 text-neutral-600 hover:bg-white hover:text-red-500'
                        }
          `}
                >
                    <FiHeart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>

                {/* Quick Actions Overlay */}
                <div
                    className={`
            absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent
            flex items-center justify-center gap-2
            transition-all duration-300
            ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
                >
                    <button
                        onClick={handleAddToCart}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white text-neutral-800 rounded-xl font-semibold text-sm hover:bg-primary-500 hover:text-white transition-colors"
                    >
                        <FiShoppingCart className="w-4 h-4" />
                        Add to Cart
                    </button>
                    {showQuickView && (
                        <Link
                            to={`/product/${id}`}
                            className="w-10 h-10 flex items-center justify-center bg-white/90 text-neutral-800 rounded-xl hover:bg-white transition-colors"
                        >
                            <FiEye className="w-4 h-4" />
                        </Link>
                    )}
                </div>
            </Link>

            {/* Product Info */}
            <div className="p-4">
                {/* Rating */}
                <div className="flex items-center gap-1 mb-2">
                    <FiStar className="w-4 h-4 text-amber-400 fill-current" />
                    <span className="text-sm font-medium text-neutral-700">{rating}</span>
                    {reviews > 0 && (
                        <span className="text-sm text-neutral-400">({reviews})</span>
                    )}
                </div>

                {/* Title */}
                <Link to={`/product/${id}`}>
                    <h3 className="font-semibold text-neutral-800 line-clamp-2 hover:text-primary-600 transition-colors mb-2">
                        {name}
                    </h3>
                </Link>

                {/* Price */}
                <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-neutral-900">
                        ${new_price.toFixed(2)}
                    </span>
                    {old_price && old_price > new_price && (
                        <span className="text-sm text-neutral-400 line-through">
                            ${old_price.toFixed(2)}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
