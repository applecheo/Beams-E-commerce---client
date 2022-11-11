import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import { useAuth } from "context/AuthProvider";
import { TDisplayProduct, useProductDetails } from "context/ProductDetailsProvider";
import { useShoppingCart } from "context/ShoppingCartProvider";

const ProductDetailMen = () => {
    const { productData, display } = useProductDetails();
    const { updateWishlist } = useAuth();
    const { addToCart } = useShoppingCart();
    const [currentViewing, setCurrentViewing] = useState<TDisplayProduct>({} as TDisplayProduct);
    const { id } = useParams();
    const { userData } = useAuth();

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
        <div className="mx-96">
            <div className="my-16 flex justify-around">
                <div className="grid grid-cols-2 ">
                    {currentViewing?.images?.map((img) => (
                        <img src={img} key={img} alt={img} className="w-48 h-56 p-1" />
                    ))}
                </div>
                <div className="flex flex-col">
                    <div className="w-80">
                        <h1 className="text-2xl">{currentViewing?.name}</h1>
                        <p className="text-xl my-1">${currentViewing?.price}</p>
                        <p className="text-l ">Size: {currentViewing?.size}</p>
                        <p>
                            Qty:
                            {
                                productData
                                    .filter((product) => product.name === currentViewing?.name)
                                    .filter((productSize) => productSize.size === currentViewing?.size).length
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

                        {id && userData?.wishList?.includes(currentViewing?._id) === true ? (
                            <button
                                onClick={() => updateWishlist(currentViewing?._id)}
                                className="flex items-center justify-center rounded-md border border-transparent bg-black px-1  text-base font-base text-white shadow-sm hover:drop-shadow-2xl py-1 w-56"
                            >
                                Remove from Wishlist
                            </button>
                        ) : (
                            <button
                                onClick={() => updateWishlist(currentViewing?._id)}
                                className="flex items-center justify-center rounded-md border border-transparent bg-black px-1  text-base font-base text-white shadow-sm hover:drop-shadow-2xl py-1 w-56"
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

export default ProductDetailMen;
