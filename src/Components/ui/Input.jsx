import React from 'react';

const Input = ({
    label,
    type = 'text',
    name,
    value,
    onChange,
    placeholder,
    error,
    helperText,
    icon,
    iconPosition = 'left',
    disabled = false,
    required = false,
    className = '',
    ...props
}) => {
    const inputId = name || `input-${Math.random().toString(36).substr(2, 9)}`;

    return (
        <div className={`w-full ${className}`}>
            {label && (
                <label
                    htmlFor={inputId}
                    className="block text-sm font-medium text-neutral-700 mb-2"
                >
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            <div className="relative">
                {icon && iconPosition === 'left' && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
                        {icon}
                    </div>
                )}

                <input
                    id={inputId}
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    required={required}
                    className={`
            w-full px-4 py-3 bg-white border rounded-xl text-neutral-800
            placeholder:text-neutral-400
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
            disabled:bg-neutral-100 disabled:cursor-not-allowed
            transition-all duration-200
            ${icon && iconPosition === 'left' ? 'pl-12' : ''}
            ${icon && iconPosition === 'right' ? 'pr-12' : ''}
            ${error ? 'border-red-500 focus:ring-red-500' : 'border-neutral-200'}
          `}
                    {...props}
                />

                {icon && iconPosition === 'right' && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
                        {icon}
                    </div>
                )}
            </div>

            {(error || helperText) && (
                <p className={`mt-1.5 text-sm ${error ? 'text-red-500' : 'text-neutral-500'}`}>
                    {error || helperText}
                </p>
            )}
        </div>
    );
};

export default Input;
