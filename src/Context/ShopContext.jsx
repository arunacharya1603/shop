import React, { createContext, useState } from "react";
import products from '../data/products';

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < products.length + 1; index++) {
        cart[index] = 0;
    }
    return cart;
};

const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(getDefaultCart());
    const [wishlist, setWishlist] = useState([]);

    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: Math.max(0, prev[itemId] - 1) }));
    };

    const clearCart = () => {
        setCartItems(getDefaultCart());
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = products.find((product) => product.id === Number(item));
                if (itemInfo) {
                    totalAmount += itemInfo.new_price * cartItems[item];
                }
            }
        }
        return totalAmount;
    };

    const getTotalCartitems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    };

    // Wishlist functions
    const addToWishlist = (itemId) => {
        if (!wishlist.includes(itemId)) {
            setWishlist((prev) => [...prev, itemId]);
        }
    };

    const removeFromWishlist = (itemId) => {
        setWishlist((prev) => prev.filter((id) => id !== itemId));
    };

    const isInWishlist = (itemId) => {
        return wishlist.includes(itemId);
    };

    const contextValue = {
        all_product: products,
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getTotalCartAmount,
        getTotalCartitems,
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;