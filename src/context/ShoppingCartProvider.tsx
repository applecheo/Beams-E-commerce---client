import { createContext, ReactNode, useContext, useState } from "react";
import { toast } from "react-toastify";

import axios from "axios";

import { useOrderDetails } from "./OrderDetailsProvider";

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
    sendOrderDetail: (data: TOrderDetails) => void;
};

export type TCartItems = {
    id: string;
    quantity: number;
};

type TOrderDetails = {
    orderedBy: string;
    products: string[];
};

export const ShoppingCartContext = createContext({} as TShoppingCartContext);

export const useShoppingCart = () => {
    return useContext(ShoppingCartContext);
};

export const ShoppingCartProvider = ({ children }: TShoppingCartProviderProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState<TCartItems[]>([]); //as array
    const { getOrderId, updateUserOrder } = useOrderDetails();

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

    const sendOrderDetail = async (data: TOrderDetails) => {
        setCartItems([]);
        closeCart();
        const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/checkout` as string, data);
        const orderId = res.data._id;
        getOrderId(orderId);
        updateUserOrder(orderId); //update user order user
    };
    return (
        <ShoppingCartContext.Provider
            value={{ openCart, isOpen, closeCart, addToCart, cartItems, removeFromCart, sendOrderDetail }}
        >
            {children}
        </ShoppingCartContext.Provider>
    );
};
