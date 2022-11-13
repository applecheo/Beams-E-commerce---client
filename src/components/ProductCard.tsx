import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useProductDetails } from "context/ProductDetailsProvider";

type TProductCard = {
    _id: string;
    name: string;
    gender: string;
    images: string[];
    price: number;
};

const ProductCard = ({ name, images, price, _id }: TProductCard) => {
    const { viewProductHandler, productData } = useProductDetails();
    const [MouseOver, setMouseOver] = useState(false);
    const navigate = useNavigate();

    const setDisplayAndNavigate = (productId: string) => {
        const product = productData.find((product) => product._id === productId);
        viewProductHandler(productId);
        const productDetailLink = `/${product?.gender}/${productId}`;
        navigate(productDetailLink);
    };

    return (
        <div className="flex flex-col px-1 items-center cursor-pointer my-1" onClick={() => setDisplayAndNavigate(_id)}>
            {MouseOver === false ? (
                <img src={images[0]} alt={name} className="" onMouseEnter={() => setMouseOver(true)} />
            ) : (
                <img src={images[1]} alt={name} className="" onMouseLeave={() => setMouseOver(false)} />
            )}
            <p className="leading-tight text-sm px-2 pt-1 text-center w-32 truncate ">{name}</p>
            <p className="text-xs align-bottom font-normal">${price}</p>
        </div>
    );
};
export default ProductCard;
