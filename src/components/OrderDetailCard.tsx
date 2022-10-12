import { useOrderDetails } from "context/OrderDetailsProvider";

type isView = {
    isView: boolean;
};
const OrderDetailCard = ({ isView }: isView) => {
    const { userViewOrder } = useOrderDetails();
    return (
        <>
            {isView === true && (
                <div className="w-72 border-2 border-black">
                    <div className="p-1">
                        <h1 className="text-xl pl-1">Order status: {userViewOrder.status}</h1>
                        {userViewOrder.products.map((x) => (
                            <div key={x._id} className="m-1 p-1 border-t-2 border-black flex">
                                <img
                                    src={x.images[0]}
                                    alt={x.images[0]}
                                    className="h-24 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200"
                                />
                                <div className="flex flex-col text-xs pl-2">
                                    <p className="text-sm leading-tight"> {x.name}</p>
                                    <p className="">Price: ${x.price}</p>
                                    <p className="">Size: {x.size}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};
export default OrderDetailCard;
