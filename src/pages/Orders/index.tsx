import { useEffect, useState } from "react";

import OrderDetailCard from "components/OrderDetailCard";
import { useAuth } from "context/AuthProvider";
import { TProduct, useOrderDetails } from "context/OrderDetailsProvider";

type TProductId = {
    _id: string;
};

const Orders = () => {
    const { orderDetails, getOrderDetails, getUserViewOrder } = useOrderDetails();

    const { userData } = useAuth();
    const [isView, setIsView] = useState<TProduct>({} as TProduct);

    useEffect(() => {
        if (userData) {
            getOrderDetails(userData._id);
        }
    }, []);

    const updateView = (productId: string) => {
        const { products } = orderDetails.orders.find((x: TProductId) => x._id === productId);
        setIsView(products[0]);
        getUserViewOrder(productId);
    };

    return (
        <div className="mx-96">
            {orderDetails?.orders?.length !== 0 ? (
                <div className="flex justify-between my-5 items-start">
                    <div className="border-2 border-black">
                        <h1 className="text-xl px-2 mb-1 ">Orders</h1>

                        {orderDetails?.orders?.map((product: TProductId) => (
                            <div key={product?._id} className="px-1 m-1 border-2 border-black ">
                                <li
                                    onClick={() => updateView(product?._id)}
                                    className="cursor-pointer list-disc leading-tight pr-1 "
                                >
                                    {product._id}
                                </li>
                            </div>
                        ))}
                    </div>
                    {isView._id && <OrderDetailCard isView={isView} />}
                </div>
            ) : (
                <h1 className="text-2xl text-center mt-10">There are no orders in your account</h1>
            )}
        </div>
    );
};

export default Orders;
