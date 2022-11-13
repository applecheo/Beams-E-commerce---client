import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import { useAuth } from "context/AuthProvider";
import { TDisplayProduct, useProductDetails } from "context/ProductDetailsProvider";
import { useShoppingCart } from "context/ShoppingCartProvider";

const ProductDetailWomen = () => {
    const { productData, display } = useProductDetails();
    const { updateWishlist } = useAuth();
    const { addToCart } = useShoppingCart();
    const [currentViewing, setCurrentViewing] = useState<TDisplayProduct>({} as TDisplayProduct);
    const { id } = useParams();
    const { userData } = useAuth();

    const displayDetail = async () => {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/women/${id}` as string);
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
        <div className="sm:flex justify-center mx-2 lg:mt-4 xl:mx-72 2xl:mx-96">
            <div className="flex mt-1 sm:flex-col items-center">
                <h1 className="text-2xl sm:text-lg text-center xl:text-2xl">{currentViewing?.name}</h1>

                <p className="text-xl my-1 sm:text-sm text-center xl:text-xl">${currentViewing?.price}</p>
                <div className="grid grid-cols-2 ">
                    {currentViewing?.images?.map((img) => (
                        <img src={img} key={img} alt={img} className="w-48 h-56 p-1 xl:h-64 xl:w-56" />
                    ))}
                </div>
                <div className="flex flex-col items-center">
                    <div className="flex justify-between w-48">
                        <p className="sm:text-sm xl:text-base">
                            Qty:
                            <span className="sm:text-xs xl:text-sm">
                                {
                                    productData
                                        .filter((product) => product.name === currentViewing?.name)
                                        .filter((productSize) => productSize.size === currentViewing?.size).length
                                }
                            </span>
                        </p>
                        <p className="text-lg sm:text-sm xl:text-base">
                            Size:<span className=" sm:text-xs mx-0.5 xl:text-sm">{currentViewing?.size}</span>
                        </p>
                    </div>
                    <div className="flex flex-col items-center my-2">
                        {id && (
                            <button
                                onClick={() => addToCart(id)}
                                className="flex items-center justify-center rounded-md border border-transparent bg-black px-1  text-base font-base text-white shadow-sm hover:drop-shadow-2xl py-1 w-56 my-1 xl:w-80"
                            >
                                Add To Cart
                            </button>
                        )}

                        {id && userData?.wishList?.includes(currentViewing?._id) === true ? (
                            <button
                                onClick={() => updateWishlist(currentViewing?._id)}
                                className="flex items-center justify-center rounded-md border border-transparent bg-black px-1  text-base font-base text-white shadow-sm hover:drop-shadow-2xl py-1 w-56 xl:w-80"
                            >
                                Remove from Wishlist
                            </button>
                        ) : (
                            <button
                                onClick={() => updateWishlist(currentViewing?._id)}
                                className="flex items-center justify-center rounded-md border border-transparent bg-black px-1  text-base font-base text-white shadow-sm hover:drop-shadow-2xl py-1 w-56 xl:w-80"
                            >
                                Add to Wishlist
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailWomen;
