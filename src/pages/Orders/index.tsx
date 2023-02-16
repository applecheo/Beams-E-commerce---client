import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

export type TOrder = {
    _id: string;
    orderedBy: string;
    status: string;
    name: string;
    products: TProduct[];
    createdAt: string;
};

export type TProduct = {
    _id: string;
    name: string;
    price: number;
    category: string;
    gender: string;
    images: string[];
    size: string;
};

const Orders = () => {
    const [orderDetails, setOrderDetails] = useState<TOrder[]>([]);

    const getOrderDetails = async (userId: string) => {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/account/orders/${userId}` as string);
        setOrderDetails(res.data.orders);
        console.log(res.data.orders);
    };
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            getOrderDetails(id);
        }
    }, []);

    return (
        <div className="mx-2 xl:mx-72 2xl:mx-96">
            {orderDetails.length > 0 ? (
                orderDetails.map((order: TOrder) => {
                    return (
                        <div className="py-8" key={order._id}>
                            <div className="flex justify-start item-start space-y-2 flex-col ">
                                <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9  text-gray-800">
                                    Order #{order?._id}
                                </h1>
                                <p className="text-base font-medium leading-6 text-gray-600">
                                    {order?.createdAt.slice(0, 10)} <span>{order?.createdAt.slice(11, 16)}</span>
                                </p>
                            </div>
                            <div className="mt-5 flex flex-col xl:flex-row justify-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                                <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                                    <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                                        {order.products.map((product: TProduct) => {
                                            return (
                                                <div
                                                    className="mt-4 md:mt-6 flex  flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full "
                                                    key={product._id}
                                                >
                                                    <div className="pb-4 md:pb-8 w-full md:w-40">
                                                        <img
                                                            className="w-full hidden md:block"
                                                            src={product.images[0]}
                                                            alt={`${product._id}-img`}
                                                        />
                                                        <img
                                                            className="w-1/2 md:hidden"
                                                            src={product.images[0]}
                                                            alt={`${product._id}-img-mobile`}
                                                        />
                                                    </div>
                                                    <div className="border-b border-gray-200  w-full  pb-8 space-y-4 md:space-y-0">
                                                        <div className="w-full flex flex-col justify-start items-start space-y-8">
                                                            <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">
                                                                {product.name}
                                                            </h3>
                                                            <div className="flex justify-start items-start flex-col space-y-2">
                                                                <p className="text-sm leading-none text-gray-800">
                                                                    <span className="text-gray-300">Category: </span>{" "}
                                                                    {product.category}
                                                                </p>
                                                                <p className="text-sm leading-none text-gray-800">
                                                                    <span className="text-gray-300">Size: </span>{" "}
                                                                    {product.size}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-between space-x-8 items-start w-full">
                                                            <p className="mt-3 text-base xl:text-lg font-semibold leading-6 text-gray-800">
                                                                ${product.price}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                                        <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6   ">
                                            <h3 className="text-xl font-semibold leading-5 text-gray-800">Summary</h3>
                                            <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                                                <div className="flex justify-between  w-full">
                                                    <p className="text-base leading-4 text-gray-800">Subtotal</p>
                                                    <p className="text-base leading-4 text-gray-600">
                                                        $
                                                        {order.products
                                                            .map((x: { price: number }) => x.price)
                                                            .reduce(function (a: number, b: number) {
                                                                return a + b;
                                                            })}
                                                    </p>
                                                </div>

                                                <div className="flex justify-between items-center w-full">
                                                    <p className="text-base leading-4 text-gray-800">Shipping</p>
                                                    <p className="text-base leading-4 text-gray-600">Free</p>
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center w-full">
                                                <p className="text-base font-semibold leading-4 text-gray-800">Total</p>
                                                <p className="text-base font-semibold leading-4 text-gray-600">
                                                    $
                                                    {order.products
                                                        .map((x: { price: number }) => x.price)
                                                        .reduce(function (a: number, b: number) {
                                                            return a + b;
                                                        })}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6   ">
                                            <h3 className="text-xl font-semibold leading-5 text-gray-800">
                                                Order Status
                                            </h3>
                                            <div className="flex justify-between items-start w-full">
                                                <div className="flex justify-center items-center space-x-4">
                                                    <div className="w-8 h-8">
                                                        <img
                                                            className="w-full h-full"
                                                            alt="logo"
                                                            src="https://i.ibb.co/L8KSdNQ/image-3.png"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col justify-start items-center">
                                                        <p className="text-lg leading-6 font-semibold text-gray-800">
                                                            {order.status}
                                                            <br />
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-full flex justify-center items-center">
                                                <button className="hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white">
                                                    View Carrier Details
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })
            ) : (
                <h1 className="text-3xl lg:text-4xl font-semibold   text-gray-800 text-center mt-10">
                    Your orders is empty. Start filling it up!
                </h1>
            )}
        </div>
    );
};

export default Orders;
