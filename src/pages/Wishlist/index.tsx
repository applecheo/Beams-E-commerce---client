import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "context/AuthProvider";
import { TDisplayProduct, useProductDetails } from "context/ProductDetailsProvider";

const Wishlist = () => {
    const { userData } = useAuth();
    const { productData, viewProductHandler } = useProductDetails();
    const [wishList, setWatchList] = useState<TDisplayProduct[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (userData) {
            for (const wishList of userData.wishList) {
                const product = productData.find((x) => x._id === wishList);
                if (product) {
                    setWatchList((prev) => {
                        const allProducts = [...prev, product];
                        const filterOutDuplicates = Array.from(new Set(allProducts));
                        return filterOutDuplicates;
                    });
                }
            }
        }
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
