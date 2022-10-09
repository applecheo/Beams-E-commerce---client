import { createContext, ReactNode, useContext, useState } from "react";

import ShoppingCart from "components/ShoppingCart";

type TShoppingCartProviderProps = {
    children: ReactNode;
};

type TShoppingCartContext = {
    openCart: () => void;
    closeCart: () => void;
};
const ShoppingCartContext = createContext({} as TShoppingCartContext);

export const useShoppingCart = () => {
    return useContext(ShoppingCartContext);
};

export const ShoppingCartProvider = ({ children }: TShoppingCartProviderProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const openCart = () => {
        setIsOpen(true);
    };
    const closeCart = () => {
        setIsOpen(false);
    };
    return (
        <ShoppingCartContext.Provider value={{ openCart, closeCart }}>
            {children}
            <ShoppingCart isOpen={isOpen} />
        </ShoppingCartContext.Provider>
    );
};
