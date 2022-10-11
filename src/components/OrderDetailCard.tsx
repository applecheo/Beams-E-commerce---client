import { useOrderDetails } from "context/OrderDetailsProvider";

const OrderDetailCard = () => {
    const { userViewOrder } = useOrderDetails();
    return (
        <div className="w-72 border-2 border-black">
            <div className="p-1">
                <h1 className="text-xl">Order status: {userViewOrder?.status}</h1>
                {userViewOrder?.products.map((x) => (
                    <div key={x._id} className="m-1 border-t-2 border-black">
                        <p className="text-sm"> {x.name}</p>
                        <div className="flex justify-around items-center text-xs">
                            <p>Price: ${x.price}</p>
                            <p className="text-xs  ">Size: {x.size}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default OrderDetailCard;
