import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    href,
    to,
    onClick,
    disabled = false,
    fullWidth = false,
    type = 'button',
    icon,
    iconPosition = 'left',
    className = '',
    ...props
}) => {
    // Base styles
    const baseStyles = `
    inline-flex items-center justify-center font-semibold rounded-xl
    transition-all duration-300 ease-out
    active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed
    focus:outline-none focus:ring-2 focus:ring-offset-2
  `;

    // Variant styles
    const variants = {
        primary: `
      bg-primary-600 text-white
      hover:bg-primary-700 active:bg-primary-800
      shadow-soft hover:shadow-medium
      focus:ring-primary-500
    `,
        secondary: `
      bg-neutral-800 text-white
      hover:bg-neutral-900 active:bg-black
      shadow-soft hover:shadow-medium
      focus:ring-neutral-500
    `,
        outline: `
      border-2 border-neutral-800 text-neutral-800
      hover:bg-neutral-800 hover:text-white
      focus:ring-neutral-500
    `,
        ghost: `
      text-neutral-600
      hover:bg-neutral-100 hover:text-neutral-800
      focus:ring-neutral-300
    `,
        accent: `
      bg-accent-500 text-white
      hover:bg-accent-600 active:bg-accent-700
      shadow-soft hover:shadow-medium
      focus:ring-accent-500
    `,
        danger: `
      bg-red-500 text-white
      hover:bg-red-600 active:bg-red-700
      shadow-soft hover:shadow-medium
      focus:ring-red-500
    `,
    };

    // Size styles
    const sizes = {
        sm: 'px-4 py-2 text-sm gap-1.5',
        md: 'px-6 py-3 text-base gap-2',
        lg: 'px-8 py-4 text-lg gap-2.5',
    };

    const classes = `
    ${baseStyles}
    ${variants[variant] || variants.primary}
    ${sizes[size] || sizes.md}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `.replace(/\s+/g, ' ').trim();

    // Content with optional icon
    const content = (
        <>
            {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
            {children}
            {icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
        </>
    );

    // Render as Link if 'to' prop is provided (react-router)
    if (to) {
        return (
            <Link to={to} className={classes} {...props}>
                {content}
            </Link>
        );
    }

    // Render as anchor if 'href' prop is provided
    if (href) {
        return (
            <a href={href} className={classes} {...props}>
                {content}
            </a>
        );
    }

    // Render as button
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={classes}
            {...props}
        >
            {content}
        </button>
    );
};

export default Button;
