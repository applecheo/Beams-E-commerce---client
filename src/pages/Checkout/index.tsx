import { Link } from "react-router-dom";

import { useAuth } from "context/AuthProvider";

const Checkout = () => {
    const { userData } = useAuth();

    return (
        <div className="flex flex-col justify-center items-center mt-10">
            <p className="text-2xl my-2">Thank you for shopping with us</p>

            <Link to={`/account/orders/${userData._id}`} className="text-lg underline">
                My Orders
            </Link>
            <Link to={`/`} className="text-lg underline">
                Shop for more
            </Link>
        </div>
    );
};

export default Checkout;
