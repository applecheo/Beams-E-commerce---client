import { createContext, ReactNode, useContext, useState } from "react";

import ShoppingCart from "components/ShoppingCart";

type TShoppingCartProviderProps = {
    children: ReactNode;
};

type TShoppingCartContext = {
    openCart: () => void;
    closeCart: () => void;
    addToCart: (id: string) => void;
    cartItems: TCartItems[];
    removeFromCart: (id: string) => void;
};

export type TCartItems = {
    id: string;
    quantity: number;
};

const ShoppingCartContext = createContext({} as TShoppingCartContext);

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
                return [...prev, { id, quantity: 1 }];
            } else {
                return prev.map((item) => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 0 };
                    } else {
                        return item;
                    }
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
        <ShoppingCartContext.Provider value={{ openCart, closeCart, addToCart, cartItems, removeFromCart }}>
            {children}
            <ShoppingCart isOpen={isOpen} />
        </ShoppingCartContext.Provider>
    );
};
