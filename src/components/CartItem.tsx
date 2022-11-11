import { useProductDetails } from "context/ProductDetailsProvider";
import { TCartItems, useShoppingCart } from "context/ShoppingCartProvider";

const CartItem = ({ id, quantity }: TCartItems) => {
    const { productData } = useProductDetails();
    const { removeFromCart } = useShoppingCart();
    const item = productData?.find((product) => product?._id === id);
    // if (item === null) return null;
    return (
        <div className="mt-4 px-1">
            <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                    <li key={id} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 ">
                            <img
                                src={item?.images[0]}
                                alt={item?.images[0]}
                                className="h-full w-full object-cover object-center"
                            />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                            <div>
                                <div
                                    className="flex justify-between text-base font-medium text-gray-900 flex-col"
                                    style={{ fontSize: "10px" }}
                                >
                                    <p className="leading-tight">{item?.name}</p>
                                    {item?.price && <p style={{ fontSize: "12px" }}>${item.price}</p>}
                                    Size: {item?.size}
                                </div>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                                <p className="text-gray-500">Qty {quantity}</p>

                                <div className="flex">
                                    <button
                                        onClick={() => removeFromCart(id)}
                                        type="button"
                                        className="text-xs text-indigo-600 hover:text-indigo-500"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default CartItem;
