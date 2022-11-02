import { createContext, ReactNode, useContext, useState } from "react";

import axios from "axios";

import { useAuth } from "./AuthProvider";

type TOrderDetailsProviderProps = {
    children: ReactNode;
};

export type TOrderDetailsContext = {
    getOrderId: (orderId: string) => void;
    orderId: string;
    orderDetails: TOrderDetail;
    getOrderDetails: (userId: string) => void;
    updateUserOrder: (userId: string) => void;
    userViewOrder: TOrder;
    getUserViewOrder: (id: string) => void;
};

export type TOrderDetail = {
    orders: any;
    status: string;
    _id: string;
};

export type TOrder = {
    _id: string;
    orderedBy: string;
    status: string;
    name: string;
    products: TProduct[];
};

export type TProduct = {
    _id: string;
    name: string;
    price: number;
    category: string;
    gender: string;
    images: string[];
    size: string;
};

export const OrderDetailsContext = createContext({} as TOrderDetailsContext);

export const useOrderDetails = () => {
    return useContext(OrderDetailsContext);
};

export const OrderDetailsProvider = ({ children }: TOrderDetailsProviderProps) => {
    const [orderId, setOrderId] = useState("");
    const [orderDetails, setOrderDetails] = useState<TOrderDetail>({} as TOrderDetail);
    const [userViewOrder, setUserViewOrder] = useState<TOrder>({} as TOrder);
    const { userData } = useAuth();

    const getOrderId = (orderId: string) => {
        setOrderId(orderId);
    };
    const getOrderDetails = async (userId: string) => {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/account/orders/${userId}` as string);
        setOrderDetails(res.data);
    };
    const updateUserOrder = async (orderId: string) => {
        const body = { body: orderId };
        await axios.put(`${process.env.REACT_APP_API_BASE_URL}/checkout/${userData?._id}` as string, body);
    };

    const getUserViewOrder = async (id: string) => {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/account/orders/detail/${id}` as string);
        setUserViewOrder(res.data);
    };
    return (
        <OrderDetailsContext.Provider
            value={{
                getOrderId,
                orderId,
                orderDetails,
                getOrderDetails,
                updateUserOrder,
                userViewOrder,
                getUserViewOrder,
            }}
        >
            {children}
        </OrderDetailsContext.Provider>
    );
};
