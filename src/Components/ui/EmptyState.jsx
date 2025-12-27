import React from 'react';
import { FiShoppingBag, FiHeart, FiSearch, FiPackage } from 'react-icons/fi';
import Button from './Button';

const EmptyState = ({
    type = 'default',
    title,
    description,
    action,
    icon: CustomIcon,
}) => {
    const presets = {
        cart: {
            icon: FiShoppingBag,
            title: 'Your cart is empty',
            description: 'Looks like you haven\'t added anything to your cart yet. Start shopping to fill it up!',
            action: { label: 'Start Shopping', to: '/' },
        },
        wishlist: {
            icon: FiHeart,
            title: 'Your wishlist is empty',
            description: 'Save items you love by clicking the heart icon. They\'ll appear here!',
            action: { label: 'Browse Products', to: '/' },
        },
        search: {
            icon: FiSearch,
            title: 'No results found',
            description: 'We couldn\'t find what you\'re looking for. Try different keywords or browse our categories.',
            action: { label: 'Clear Search', onClick: () => { } },
        },
        orders: {
            icon: FiPackage,
            title: 'No orders yet',
            description: 'You haven\'t placed any orders. Start shopping and your orders will appear here.',
            action: { label: 'Shop Now', to: '/' },
        },
        default: {
            icon: FiPackage,
            title: 'Nothing here',
            description: 'This section is empty.',
            action: null,
        },
    };

    const preset = presets[type] || presets.default;
    const Icon = CustomIcon || preset.icon;
    const displayTitle = title || preset.title;
    const displayDescription = description || preset.description;
    const displayAction = action || preset.action;

    return (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            {/* Icon */}
            <div className="w-20 h-20 rounded-full bg-neutral-100 flex items-center justify-center mb-6">
                <Icon className="w-10 h-10 text-neutral-400" />
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-neutral-800 mb-2">
                {displayTitle}
            </h3>

            {/* Description */}
            <p className="text-neutral-500 max-w-sm mb-6">
                {displayDescription}
            </p>

            {/* Action Button */}
            {displayAction && (
                <Button
                    variant="primary"
                    to={displayAction.to}
                    onClick={displayAction.onClick}
                >
                    {displayAction.label}
                </Button>
            )}
        </div>
    );
};

export default EmptyState;
