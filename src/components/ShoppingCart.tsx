import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useAuth } from "context/AuthProvider";
import { useProductDetails } from "context/ProductDetailsProvider";
import { useShoppingCart } from "context/ShoppingCartProvider";

import CartItem from "./CartItem";

type TData = {
    orderedBy: string;
    products: string[];
};
const ShoppingCart = () => {
    const { closeCart, isOpen, cartItems } = useShoppingCart();
    const { userData } = useAuth();
    const { productData } = useProductDetails();
    const navigate = useNavigate();
    const TOKEN = sessionStorage.getItem("token_key");

    const sendOrderDetail = async (data: TData) => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/checkout/create-checkout-session`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${TOKEN}`,
            },
            body: JSON.stringify({
                orderedBy: userData?._id,
                products: data.products,
            }),
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return res.json().then((json) => Promise.reject(json));
            })

            .then(({ url }) => {
                window.location = url;
            })
            .catch((e) => {
                console.error(e.error);
            });
    };

    const checkout = () => {
        const productIds = cartItems.map((product) => product.id);
        const data = {
            orderedBy: userData?._id,
            products: productIds,
        };
        if (userData?._id && data.products.length !== 0) {
            sendOrderDetail(data);
            return toast.info("Please proceed to make your payment");
        } else if (!userData?._id) {
            closeCart();
            navigate("/login");
            return toast.error("Please Login");
        } else {
            closeCart();
            return toast.error("Nothing in your cart");
        }
    };

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeCart}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-64 max-w-md">
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                        <div className="flex-1  py-3 px-4 h-10">
                                            <div className="flex items-start justify-between">
                                                <Dialog.Title className="text-lg font-medium text-gray-900">
                                                    Shopping cart
                                                </Dialog.Title>
                                                <div className="ml-3 flex h-7 items-center">
                                                    <button
                                                        type="button"
                                                        className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                                                        onClick={closeCart}
                                                    >
                                                        <span className="sr-only">Close panel</span>
                                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="mt-8">
                                                <div className="flow-root"></div>
                                            </div>
                                        </div>
                                        {cartItems?.map((item) => (
                                            <CartItem key={item?.id} {...item} />
                                        ))}
                                        <div className="border-t border-gray-200 py-2 px-4 mt-4">
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                <p className="text-sm">Subtotal</p>
                                                <p>
                                                    $
                                                    {cartItems?.reduce((total, cartItems) => {
                                                        const product = productData?.find(
                                                            (product) => product?._id === cartItems?.id
                                                        );
                                                        return total + (product?.price || 0);
                                                    }, 0)}
                                                </p>
                                            </div>
                                            <p className="mt-2 text-xs text-gray-500">
                                                Shipping and taxes calculated at checkout.
                                            </p>
                                            <div className="mt-3">
                                                <button
                                                    onClick={checkout}
                                                    className="flex items-center justify-center rounded-md border border-transparent bg-black px-2 py-1 text-base font-medium text-white shadow-sm hover:drop-shadow-2xl w-52"
                                                >
                                                    Checkout
                                                </button>
                                            </div>
                                            <div className="mt-3 flex justify-center text-center text-xs text-gray-500">
                                                <p>
                                                    <button
                                                        type="button"
                                                        className="font-medium text-black"
                                                        onClick={closeCart}
                                                    >
                                                        <span>or</span> Continue Shopping
                                                        <span aria-hidden="true"> &rarr;</span>
                                                    </button>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};
export default ShoppingCart;
