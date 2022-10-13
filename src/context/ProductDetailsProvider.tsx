import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import axios from "axios";

type TProductDetailsProviderProps = {
    children: ReactNode;
};

type TProductDetailsContext = {
    productData: TDisplayProduct[];
    viewProductHandler: (productId: string) => void;
    display: string;
    newArrivalData: TDisplayProduct[];
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
};

export const ProductDetailsContext = createContext({} as TProductDetailsContext);

export const useProductDetails = () => {
    return useContext(ProductDetailsContext);
};

export const ProductDetailsProvider = ({ children }: TProductDetailsProviderProps) => {
    const [productData, setProductData] = useState<TDisplayProduct[]>([]);
    const [display, setDisplay] = useState("");
    const [newArrivalData, setNewArrivalData] = useState<TDisplayProduct[]>([]);

    const viewProductHandler = (productId: string) => {
        setDisplay(productId);
    };

    const fetchNewArrival = async () => {
        const res = await axios.get(process.env.REACT_APP_API_BASE_URL as string);
        const data = res?.data;
        const filterNewArrival = data.filter((product: { isNewArrival: boolean }) => product.isNewArrival === true);
        setNewArrivalData(filterNewArrival);
    };

    const fetchAllProduct = async () => {
        const res = await axios.get(process.env.REACT_APP_API_BASE_URL as string);
        setProductData(res?.data);
    };

    useEffect(() => {
        fetchAllProduct();
        fetchNewArrival();
    }, []);

    return (
        <ProductDetailsContext.Provider value={{ productData, viewProductHandler, display, newArrivalData }}>
            {children}
        </ProductDetailsContext.Provider>
    );
};
