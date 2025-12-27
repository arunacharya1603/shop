import { FiMonitor, FiBox, FiSun } from 'react-icons/fi';

const categories = [
    {
        id: 'electronics',
        name: 'Electronics',
        slug: 'electronics',
        description: 'Premium gadgets and tech accessories for modern living',
        icon: FiMonitor,
        image: 'https://placehold.co/600x400/1e293b/e2e8f0?text=Electronics',
        productCount: 12,
        color: 'from-slate-700 to-slate-900',
        bgColor: 'bg-slate-100',
    },
    {
        id: 'pots',
        name: 'Pots & Planters',
        slug: 'pots',
        description: 'Beautiful containers for your plants and home decor',
        icon: FiBox,
        image: 'https://placehold.co/600x400/92400e/fef3c7?text=Pots+%26+Planters',
        productCount: 12,
        color: 'from-amber-600 to-amber-800',
        bgColor: 'bg-amber-50',
    },
    {
        id: 'plants',
        name: 'Plants',
        slug: 'plants',
        description: 'Fresh indoor plants to bring nature into your space',
        icon: FiSun,
        image: 'https://placehold.co/600x400/166534/dcfce7?text=Indoor+Plants',
        productCount: 12,
        color: 'from-green-600 to-green-800',
        bgColor: 'bg-green-50',
    },
];

export default categories;

export const getCategoryBySlug = (slug) => {
    return categories.find((category) => category.slug === slug);
};
