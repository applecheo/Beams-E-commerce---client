import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import { TDisplayProduct, useProductDetails } from "context/ProductDetailsProvider";
import { useShoppingCart } from "context/ShoppingCartProvider";

const ProductDetailMen = () => {
    const { productData, display } = useProductDetails();
    const { addToCart } = useShoppingCart();
    const [currentViewing, setCurrentViewing] = useState<TDisplayProduct>({} as TDisplayProduct);
    const { id } = useParams();

    const displayDetail = async () => {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/men/${id}` as string);
        const data = res?.data;
        setCurrentViewing(data);
    };

    useEffect(() => {
        const viewProduct = productData.find((x) => x._id === display);
        if (viewProduct) {
            return setCurrentViewing(viewProduct);
        } else {
            displayDetail();
        }
    }, []);
    return (
        <div className="mx-32">
            <div className="flex my-5 justify-around">
                <div className="grid grid-cols-2 ">
                    {currentViewing?.images?.map((img) => (
                        <img src={img} key={img} className="w-48 h-64 m-2" />
                    ))}
                </div>
                <div className="flex flex-col">
                    <div className="">
                        <h1 className="text-3xl">{currentViewing.name}</h1>
                        <p className="text-2xl">${currentViewing.price}</p>
                        <p className="text-xl">Size: {currentViewing.size}</p>
                        <p>
                            Quantity:
                            {
                                productData
                                    .filter((product) => product.name === currentViewing.name)
                                    .filter((productSize) => productSize.size === currentViewing.size).length
                            }
                        </p>
                    </div>
                    <div className="flex flex-col items-center mt-10">
                        {id && (
                            <button
                                onClick={() => addToCart(id)}
                                className="flex items-center justify-center rounded-md border border-transparent bg-black px-1  text-base font-base text-white shadow-sm hover:drop-shadow-2xl py-1 w-56 my-1"
                            >
                                Add To Cart
                            </button>
                        )}

                        {id && (
                            <button className="flex items-center justify-center rounded-md border border-transparent bg-black px-1  text-base font-base text-white shadow-sm hover:drop-shadow-2xl py-1 w-56">
                                Add to WishList
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailMen;
