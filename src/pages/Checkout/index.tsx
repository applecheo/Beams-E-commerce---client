import { Link } from "react-router-dom";

import { useAuth } from "context/AuthProvider";
import { useOrderDetails } from "context/OrderDetailsProvider";

const Checkout = () => {
    const { orderId, updateUserOrder } = useOrderDetails();
    const { user } = useAuth();

    return (
        <div className="flex flex-col justify-center items-center mt-10">
            <h1 className="text-xl ">
                Order id: <span> {orderId}</span>
            </h1>
            <p className="lg my-2">Thank you for shopping with us</p>
            <Link to="/" className="text-xl underline" onClick={() => updateUserOrder(user)}>
                Shop for more
            </Link>
        </div>
    );
};

export default Checkout;
