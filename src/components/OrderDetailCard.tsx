import { TProduct, useOrderDetails } from "context/OrderDetailsProvider";

export type TisView = {
    isView: TProduct;
};

const OrderDetailCard = ({ isView }: TisView) => {
    const { userViewOrder } = useOrderDetails();

    return (
        <>
            {isView && (
                <div className="w-96 border-2 border-black">
                    <div className="p-1">
                        <h1 className="text-xl pl-1">Order status: {userViewOrder.status}</h1>

                        <div className="m-1 p-1 border-t-2 border-black flex">
                            <img
                                src={isView?.images?.[0]}
                                alt={isView?.images?.[0]}
                                className="h-24 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200"
                            />

                            <div className="flex flex-col text-xs pl-2">
                                <p className="text-sm leading-tight"> {isView.name}</p>
                                <p className="">Price: ${isView.price}</p>
                                <p className="">Size: {isView.size}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
export default OrderDetailCard;
