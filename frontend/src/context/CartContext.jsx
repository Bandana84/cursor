import { createContext, useContext } from 'react';
import { useAppContext } from './AppContext';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const {
        cartItems,
        products,
        addToCart: appAddToCart,
        updateCartItem: appUpdateCartItem,
        removeFromCart: appRemoveFromCart,
        getCartCount,
        getCartAmount,
        currency,
        user,
        setShowUserLogin
    } = useAppContext();

    const getCart = () => {
        const cartArray = [];
        for (const key in cartItems) {
            const product = products.find(item => String(item.id) === String(key));
            if (product) {
                cartArray.push({ ...product, quantity: cartItems[key] });
            }
        }
        return cartArray;
    };

    const addToCart = async (productId, quantity = 1) => {
        const result = await appAddToCart(productId);
        if (!result) {
            toast.error("Failed to add to cart");
        }
        return result;
    };

    const updateCartItem = async (productId, quantity) => {
        const result = await appUpdateCartItem(productId, quantity);
        if (!result) {
            toast.error("Failed to update cart");
        }
        return result;
    };

    const removeFromCart = async (productId) => {
        const result = await appRemoveFromCart(productId);
        if (!result) {
            toast.error("Failed to remove from cart");
        }
        return result;
    };

    const cart = {
        items: getCart(),
        subtotal: getCartAmount(),
        tax: getCartAmount() * 0.02,
        grand_total: getCartAmount() * 1.02,
        itemCount: getCartCount()
    };

    return (
        <CartContext.Provider value={{
            cart,
            loading: false,
            error: null,
            addToCart,
            updateCartItem,
            removeFromCart,
            currency,
            user
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}; 