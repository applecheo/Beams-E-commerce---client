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
    const { viewProductHandler } = useProductDetails();
    const navigate = useNavigate();

    const setDisplayAndNavigate = (productId: string) => {
        viewProductHandler(productId);
        const productDetailLink = `/men/${productId}`;
        navigate(productDetailLink);
    };

    return (
        <div className="flex flex-col px-1 items-center " onClick={() => setDisplayAndNavigate(_id)}>
            <img src={images[0]} alt={name} className="" />
            <p className="leading-tight text-sm p-2">{name}</p>
            <p className="text-sm align-bottom font-normal">${price}</p>
        </div>
    );
};
export default ProductCard;
