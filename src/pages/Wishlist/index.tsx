import { useState } from "react";

import { useAuth } from "context/AuthProvider";
import { TDisplayProduct, useProductDetails } from "context/ProductDetailsProvider";

const Wishlist = () => {
    const { userData } = useAuth();
    const { productData } = useProductDetails();
    const [wishList, setWatchList] = useState<TDisplayProduct[]>([]);

    // for (const wishList of userData.wishList) {
    //     const all = productData.find((x) => x._id === wishList);
    //     console.log(all);
    //     if (all) {
    //         setWatchList((prev) => [...prev, all]);
    //     }
    // }
    return (
        <div className="mx-96">
            <div className="mt-5">
                <h1 className="text-xl ">Wishlist</h1>
                {/* <div>{all.map()}</div> */}
            </div>
        </div>
    );
};

export default Wishlist;
