import { useEffect, useState } from "react";

import OrderDetailCard from "components/OrderDetailCard";
import { useAuth } from "context/AuthProvider";
import { useOrderDetails } from "context/OrderDetailsProvider";

type TProduct = {
    _id: string;
};
const Orders = () => {
    const { orderDetails, getOrderDetails, getUserViewOrder, userViewOrder } = useOrderDetails();

    const { user } = useAuth();
    const [isView, setIsView] = useState(false);
    useEffect(() => {
        if (user) {
            getOrderDetails(user);
        }
    }, []);

    const fetchUserOrder = (productId: string) => {
        if (userViewOrder._id === productId) {
            return;
        } else {
            getUserViewOrder(productId);
        }
    };
    return (
        <div className="mx-96">
            {orderDetails ? (
                <div className="flex justify-around my-5">
                    <div className="border-2 border-black">
                        <h1 className="text-xl px-2 mb-1 ">Orders</h1>
                        {orderDetails?.orders?.map((product: TProduct) => (
                            <div key={product?._id} className="px-1 m-1 border-2 border-black">
                                <li
                                    onMouseOver={() => fetchUserOrder(product?._id)}
                                    onClick={() => setIsView(true)}
                                    className="cursor-pointer list-disc leading-tight pr-1 "
                                >
                                    {product._id}
                                </li>
                            </div>
                        ))}
                    </div>
                    <OrderDetailCard isView={isView} />
                </div>
            ) : (
                <h1 className="text-2xl">There is no orders in your account</h1>
            )}
        </div>
    );
};

export default Orders;
