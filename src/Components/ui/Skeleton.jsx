import React from 'react';

const Skeleton = ({ className = '', variant = 'rectangular', animation = true }) => {
    const baseClasses = `
    bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200
    ${animation ? 'bg-[length:200%_100%] animate-shimmer' : ''}
  `;

    const variants = {
        rectangular: 'rounded-lg',
        circular: 'rounded-full',
        text: 'rounded h-4',
    };

    return (
        <div
            className={`${baseClasses} ${variants[variant]} ${className}`}
            aria-hidden="true"
        />
    );
};

// Product Card Skeleton
export const ProductCardSkeleton = () => {
    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-soft">
            {/* Image skeleton */}
            <Skeleton className="aspect-square w-full" />

            {/* Content skeleton */}
            <div className="p-4 space-y-3">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-3/4" />
                <div className="flex items-center gap-2 pt-1">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-4 w-14" />
                </div>
            </div>
        </div>
    );
};

// Category Card Skeleton
export const CategoryCardSkeleton = () => {
    return (
        <div className="bg-neutral-100 rounded-2xl p-6">
            <div className="flex items-start gap-4">
                <Skeleton className="w-12 h-12 rounded-xl" />
                <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-4 w-16" />
                </div>
            </div>
        </div>
    );
};

// Cart Item Skeleton
export const CartItemSkeleton = () => {
    return (
        <div className="flex gap-4 p-4 bg-white rounded-xl">
            <Skeleton className="w-20 h-20 rounded-lg" />
            <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-8 w-28" />
            </div>
            <Skeleton className="h-6 w-16" />
        </div>
    );
};

export default Skeleton;
