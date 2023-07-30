/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";

import axios from "axios";
import ProductCard from "components/ProductCard";
import { TDisplayProduct } from "context/ProductDetailsProvider";

const BrowseWomen = () => {
    const [womenProduct, setWomenProduct] = useState<TDisplayProduct[]>([]);

    useEffect(() => {
        fetchWomenProduct();
    }, []);
    const fetchWomenProduct = async () => {
        const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/women` as string);

        const sortByDescending = data.sort(
            (a: { createdAt: string | number | Date }, b: { createdAt: string | number | Date }) =>
                new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
        );
        setWomenProduct([...sortByDescending]);
    };
    return (
        <div className="sm: flex justify-center flex-col mx-2 lg:mt-4 xl:mx-72 2xl:mx-96 ">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-3xl mt-2 mb-3">New Arrivals</h1>
                <p className="text-sm mx-2">
                    Never get bored with our women's clothing edit. We offer a wide range of clothing.
                </p>
            </div>
            <div className="grid grid-cols-3 my-2 lg:grid-cols-4 xl:grid-cols-5">
                {womenProduct?.map((product) => (
                    <ProductCard key={product._id} {...product} />
                ))}
            </div>
        </div>
    );
};

export default BrowseWomen;
