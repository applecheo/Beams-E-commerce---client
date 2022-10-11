import { useEffect } from "react";

import OrderDetailCard from "components/OrderDetailCard";
import { useAuth } from "context/AuthProvider";
import { useOrderDetails } from "context/OrderDetailsProvider";

type TProduct = {
    _id: string;
};
const Orders = () => {
    const { orderDetails, getOrderDetails, getUserViewOrder } = useOrderDetails();
    const { user } = useAuth();
    useEffect(() => {
        if (user) {
            getOrderDetails(user);
        }
    }, []);
    return (
        <div className="mx-32">
            {orderDetails ? (
                <div className="flex justify-around my-5">
                    <div className="border-2 border-black">
                        <h1 className="text-xl pl-2 mb-1 ">Orders</h1>
                        {orderDetails?.orders.map((product: TProduct) => (
                            <div key={product._id} className="px-1 m-1 border-2 border-black">
                                <li
                                    onClick={() => getUserViewOrder(product._id)}
                                    className="cursor-pointer list-disc leading-tight pr-1 "
                                >
                                    {product._id}
                                </li>
                            </div>
                        ))}
                    </div>
                    <OrderDetailCard />
                </div>
            ) : (
                <h1>There is no orders in your account</h1>
            )}
        </div>
    );
};

export default Orders;
