import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import axios from "axios";

type TProductDetailsProviderProps = {
    children: ReactNode;
};

export type TProductDetailsContext = {
    productData: TDisplayProduct[];
    viewProductHandler: (productId: string) => void;
    display: string;
    newArrivalData: TDisplayProduct[];
    fetchNewArrival: () => void;
    nextSlide: () => void;
    prevSlide: () => void;

    displayNewArrivalData: TDisplayProduct[];
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
    const [newArrivalData, setNewArrivalData] = useState<TDisplayProduct[]>([]);
    const [displayNewArrivalData, setDisplayNewArrivalData] = useState<TDisplayProduct[]>([]);

    let position;

    const first_5_element = newArrivalData.slice(0, 5);
    const first_element_of_first_5_element = first_5_element?.[0]?._id;
    const second_5_element = newArrivalData.slice(5, 10);
    const first_element_of_second_5_element = second_5_element?.[0]?._id;
    const third_5_element = newArrivalData.slice(10, 15);

    const viewProductHandler = (productId: string) => {
        setDisplay(productId);
    };

    const fetchNewArrival = async () => {
        const res = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/home` as string);
        const data = res?.data;
        const filterNewArrival = data.filter((product: { isNewArrival: boolean }) => product?.isNewArrival === true);
        setNewArrivalData(filterNewArrival);
        const first5 = filterNewArrival.slice(0, 5); //change to 5
        setDisplayNewArrivalData(first5);
    };

    const fetchAllProduct = async () => {
        const res = await axios.get(process.env.REACT_APP_API_BASE_URL as string);
        setProductData(res?.data);
    };

    const nextSlide = () => {
        if (displayNewArrivalData.filter((x) => x._id === first_element_of_first_5_element).length === 1) {
            position = 0;
        } else if (displayNewArrivalData.filter((x) => x._id === first_element_of_second_5_element).length === 1) {
            position = 1;
        } else {
            position = 2;
        }
        switch (position) {
            case 0:
                setDisplayNewArrivalData(second_5_element);
                break;
            case 1:
                setDisplayNewArrivalData(third_5_element);
                break;
            case 2:
                setDisplayNewArrivalData(first_5_element);
                break;
            default:
                setDisplayNewArrivalData(first_5_element);
        }
    };

    const prevSlide = () => {
        if (displayNewArrivalData.filter((x) => x._id === first_element_of_first_5_element).length === 1) {
            position = 0;
        } else if (displayNewArrivalData.filter((x) => x._id === first_element_of_second_5_element).length === 1) {
            position = 1;
        } else {
            position = 2;
        }
        switch (position) {
            case 0:
                setDisplayNewArrivalData(third_5_element);
                break;
            case 1:
                setDisplayNewArrivalData(first_5_element);
                break;
            case 2:
                setDisplayNewArrivalData(second_5_element);
                break;
            default:
                setDisplayNewArrivalData(first_5_element);
        }
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
                newArrivalData,
                fetchNewArrival,
                nextSlide,
                prevSlide,
                displayNewArrivalData,
            }}
        >
            {children}
        </ProductDetailsContext.Provider>
    );
};
