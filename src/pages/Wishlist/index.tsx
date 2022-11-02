import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { useAuth } from "context/AuthProvider";
import { TDisplayProduct, useProductDetails } from "context/ProductDetailsProvider";

const Wishlist = () => {
    const { userData } = useAuth();
    const { viewProductHandler } = useProductDetails();
    const [wishList, setWatchList] = useState<TDisplayProduct[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const displayWishlist = async () => {
            const res = await axios.get(
                `${process.env.REACT_APP_API_BASE_URL}/account/wishlist/${userData?._id}` as string
            );
            const wishListData = res?.data?.wishList;
            const products = wishListData?.filter((x: { isSoldOut: boolean }) => x?.isSoldOut === false);
            setWatchList(products);
        };
        displayWishlist();
    }, []);

    const navigateToProductDetailPage = (id: string) => {
        viewProductHandler(id);
        const productDetailLink = `/men/${id}`;
        navigate(productDetailLink);
    };
    return (
        <div className="mx-96">
            <div className="mt-5">
                <h1 className="text-xl mb-4">Wishlist</h1>
                <div className="grid grid-cols-5">
                    {wishList.map((x) => (
                        <div
                            key={x._id}
                            className="cursor-pointer hover:drop-shadow-xl"
                            onClick={() => navigateToProductDetailPage(x._id)}
                        >
                            <img
                                src={x.images[0]}
                                alt={x.name}
                                className="h-44 w-36 flex-shrink-0 overflow-hidden rounded-md border  "
                            />
                            <h1 className="w-36 text-sm leading-tight text-center truncate">{x.name}</h1>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Wishlist;
