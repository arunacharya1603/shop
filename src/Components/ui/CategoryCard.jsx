import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const CategoryCard = ({ category, variant = 'default' }) => {
    const { name, slug, description, icon: Icon, image, productCount, color, bgColor } = category;

    if (variant === 'large') {
        return (
            <Link
                to={`/${slug}`}
                className="group relative block h-80 rounded-3xl overflow-hidden shadow-soft hover:shadow-strong transition-all duration-500"
            >
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${color} opacity-70 group-hover:opacity-80 transition-opacity duration-300`} />
                </div>

                {/* Content */}
                <div className="relative h-full flex flex-col justify-end p-6 text-white">
                    {Icon && (
                        <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                            <Icon className="w-6 h-6" />
                        </div>
                    )}
                    <h3 className="text-2xl font-bold mb-2">{name}</h3>
                    <p className="text-white/80 text-sm mb-4 line-clamp-2">{description}</p>
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{productCount} Products</span>
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-neutral-800 transition-all duration-300">
                            <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                    </div>
                </div>
            </Link>
        );
    }

    // Default compact variant
    return (
        <Link
            to={`/${slug}`}
            className={`group block ${bgColor} rounded-2xl p-6 hover:shadow-medium transition-all duration-300 hover:-translate-y-1`}
        >
            <div className="flex items-start gap-4">
                {Icon && (
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} text-white flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-6 h-6" />
                    </div>
                )}
                <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-neutral-800 mb-1 group-hover:text-primary-600 transition-colors">{name}</h3>
                    <p className="text-neutral-500 text-sm line-clamp-1">{productCount} products</p>
                </div>
                <FiArrowRight className="w-5 h-5 text-neutral-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all duration-300" />
            </div>
        </Link>
    );
};

export default CategoryCard;
