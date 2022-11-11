import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import axios from "axios";

type TProductDetailsProviderProps = {
    children: ReactNode;
};

export type TProductDetailsContext = {
    productData: TDisplayProduct[];
    viewProductHandler: (productId: string) => void;
    display: string;
};

export type TDisplayProduct = {
    _id: string;
    name: string;
    category: string;
    gender: string;
    images: string[];
    isSoldOut: boolean;
    price: number;
    isNewArrival: boolean;
    size: string;
    createdAt: string;
};

export const ProductDetailsContext = createContext({} as TProductDetailsContext);

export const useProductDetails = () => {
    return useContext(ProductDetailsContext);
};

export const ProductDetailsProvider = ({ children }: TProductDetailsProviderProps) => {
    const [productData, setProductData] = useState<TDisplayProduct[]>([]);
    const [display, setDisplay] = useState("");

    const viewProductHandler = (productId: string) => {
        setDisplay(productId);
    };

    const fetchAllProduct = async () => {
        const res = await axios.get(process.env.REACT_APP_API_BASE_URL as string);
        setProductData(res?.data);
    };

    useEffect(() => {
        fetchAllProduct();
    }, [display]);

    return (
        <ProductDetailsContext.Provider
            value={{
                productData,
                viewProductHandler,
                display,
            }}
        >
            {children}
        </ProductDetailsContext.Provider>
    );
};
