import React from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';

const QuantitySelector = ({
    quantity,
    onIncrease,
    onDecrease,
    min = 1,
    max = 99,
    size = 'md',
    disabled = false,
}) => {
    const sizes = {
        sm: {
            button: 'w-7 h-7',
            text: 'w-10 text-sm',
            icon: 'w-3 h-3',
        },
        md: {
            button: 'w-9 h-9',
            text: 'w-12 text-base',
            icon: 'w-4 h-4',
        },
        lg: {
            button: 'w-11 h-11',
            text: 'w-14 text-lg',
            icon: 'w-5 h-5',
        },
    };

    const currentSize = sizes[size] || sizes.md;

    const handleDecrease = () => {
        if (quantity > min && !disabled) {
            onDecrease();
        }
    };

    const handleIncrease = () => {
        if (quantity < max && !disabled) {
            onIncrease();
        }
    };

    return (
        <div className="inline-flex items-center bg-neutral-100 rounded-xl p-1">
            <button
                onClick={handleDecrease}
                disabled={disabled || quantity <= min}
                className={`
          ${currentSize.button}
          rounded-lg flex items-center justify-center
          text-neutral-600 hover:bg-white hover:text-neutral-800 hover:shadow-sm
          disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:shadow-none
          transition-all duration-200
        `}
                aria-label="Decrease quantity"
            >
                <FiMinus className={currentSize.icon} />
            </button>

            <span className={`${currentSize.text} text-center font-semibold text-neutral-800`}>
                {quantity}
            </span>

            <button
                onClick={handleIncrease}
                disabled={disabled || quantity >= max}
                className={`
          ${currentSize.button}
          rounded-lg flex items-center justify-center
          text-neutral-600 hover:bg-white hover:text-neutral-800 hover:shadow-sm
          disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:shadow-none
          transition-all duration-200
        `}
                aria-label="Increase quantity"
            >
                <FiPlus className={currentSize.icon} />
            </button>
        </div>
    );
};

export default QuantitySelector;
