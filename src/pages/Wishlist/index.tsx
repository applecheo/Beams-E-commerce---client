import { useEffect, useState } from "react";

import axios from "axios";
import ProductCard from "components/ProductCard";
import { useAuth } from "context/AuthProvider";
import { TDisplayProduct } from "context/ProductDetailsProvider";

const Wishlist = () => {
    const { userData } = useAuth();
    const [wishList, setWatchList] = useState<TDisplayProduct[]>([]);

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

    return (
        <div className="sm: flex justify-center mx-2 lg:mt-4 xl:mx-72 2xl:mx-96">
            {wishList.length >= 1 ? (
                <div className="sm:mt-5">
                    <h1 className="sm:text-2xl mb-4">Wishlist</h1>
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ">
                        {wishList?.map((product) => (
                            <ProductCard key={product._id} {...product} />
                        ))}
                    </div>
                </div>
            ) : (
                <h1 className="text-2xl text-center mt-10 mx-2">Your wishlist is empty. Start filling it up!</h1>
            )}
        </div>
    );
};

export default Wishlist;
