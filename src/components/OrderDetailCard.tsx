import { TProduct } from "context/OrderDetailsProvider";

const OrderDetailCard = ({ images, price, name, size }: TProduct) => {
    return (
        <>
            <div className="m-1 p-1 border-t-2 border-black flex">
                <img
                    src={images?.[0]}
                    alt={images?.[0]}
                    className="h-28 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200"
                />

                <div className="flex flex-col text-xs px-2">
                    <p className="text-sm leading-tight"> {name}</p>
                    <p className="">Price: ${price}</p>
                    <p className="">Size: {size}</p>
                </div>
            </div>
        </>
    );
};
export default OrderDetailCard;
