import { Link } from "react-router-dom";

const Checkout = () => {
    return (
        <div>
            <h1>
                Your order id: <span> 1234568</span>
            </h1>
            <p>Thanks for shopping with us</p>
            <Link to="/" className="text-xl underline">
                Shop for more
            </Link>
        </div>
    );
};

export default Checkout;
