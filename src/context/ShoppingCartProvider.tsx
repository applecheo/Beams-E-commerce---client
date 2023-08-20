import { createContext, ReactNode, useContext, useState } from "react";
import { toast } from "react-toastify";

type TShoppingCartProviderProps = {
    children: ReactNode;
};

export type TShoppingCartContext = {
    openCart: () => void;
    closeCart: () => void;
    isOpen: boolean;
    addToCart: (id: string) => void;
    cartItems: TCartItems[];
    removeFromCart: (id: string) => void;
};

export type TCartItems = {
    id: string;
    quantity: number;
};

export const ShoppingCartContext = createContext({} as TShoppingCartContext);

export const useShoppingCart = () => {
    return useContext(ShoppingCartContext);
};

export const ShoppingCartProvider = ({ children }: TShoppingCartProviderProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState<TCartItems[]>([]); //as array

    const openCart = () => {
        setIsOpen(true);
    };
    const closeCart = () => {
        setIsOpen(false);
    };

    const addToCart = (id: string) => {
        setCartItems((prev) => {
            if (prev.find((item) => item.id === id) == null) {
                toast.success("Added to cart");
                return [...prev, { id, quantity: 1 }];
            } else {
                return prev.map((item) => {
                    toast.info("Item is already in your cart");
                    return item;
                });
            }
        });
    };

    const removeFromCart = (id: string) => {
        setCartItems((prev) => {
            return prev.filter((item) => item.id !== id);
        });
    };

    return (
        <ShoppingCartContext.Provider value={{ openCart, isOpen, closeCart, addToCart, cartItems, removeFromCart }}>
            {children}
        </ShoppingCartContext.Provider>
    );
};
