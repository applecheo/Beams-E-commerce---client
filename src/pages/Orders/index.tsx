import { useEffect, useState } from "react";

import OrderDetailCard from "components/OrderDetailCard";
import { useAuth } from "context/AuthProvider";
import { TProduct, useOrderDetails } from "context/OrderDetailsProvider";

type TOrderId = {
    _id: string;
};

type TDisplayOrder = {
    products: TProduct[];
    status: string;
};

const Orders = () => {
    const { orderDetails, getOrderDetails, getUserViewOrder } = useOrderDetails();

    const { userData } = useAuth();
    const [isView, setIsView] = useState<TDisplayOrder>({} as TDisplayOrder);

    useEffect(() => {
        if (userData) {
            getOrderDetails(userData._id);
        }
    }, []);

    const updateView = (orderId: string) => {
        const displayOrder = orderDetails.orders.find((x: TOrderId) => x._id === orderId);
        setIsView(displayOrder);
        getUserViewOrder(orderId);
    };

    return (
        <div className="md:mx-56 mt-5 lg:mx-80 xl:mx-72 2xl:mx-96">
            {orderDetails?.orders?.length !== 0 ? (
                <div className="sm: m-3 flex flex-col xl:flex-row justify-around my-5 ">
                    <div className="border-2 border-black">
                        <h1 className="text-xl px-2 mb-1 ">Orders</h1>
                        {orderDetails?.orders?.map((order: TOrderId) => (
                            <div key={`${order?._id}-orderDetails`} className="px-1 m-1 border-2 border-black text-lg">
                                <li
                                    onClick={() => updateView(order?._id)}
                                    className="cursor-pointer list-disc leading-tight pr-1 "
                                >
                                    {order._id}
                                </li>
                            </div>
                        ))}
                    </div>
                    <div className="border-2 border-black mt-5 xl:mt-0">
                        <h1 className="text-xl px-1">Order status: {isView?.status}</h1>
                        {isView?.products?.map((product) => (
                            <OrderDetailCard key={product._id} {...product} />
                        ))}
                    </div>
                </div>
            ) : (
                <h1 className="text-2xl text-center mt-10">There are no orders in your account</h1>
            )}
        </div>
    );
};

export default Orders;
