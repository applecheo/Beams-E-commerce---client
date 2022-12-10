import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import axios from "axios";
import { useAuth } from "context/AuthProvider";

const Checkout = () => {
    const { userData } = useAuth();

    const search = useLocation().search;
    const id = new URLSearchParams(search).get("id");
    const TOKEN = sessionStorage.getItem("token_key");

    useEffect(() => {
        const updateOrderStatus = async () => {
            const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/checkout-session?id=` + id);
            if (data.payment_status === "paid" && userData._id) {
                await axios.put(`${process.env.REACT_APP_API_BASE_URL}/checkout?id=` + id, userData, {
                    headers: {
                        Authorization: `Bearer ${TOKEN}`,
                    },
                });
            }
        };
        updateOrderStatus();
    }, [userData]);
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
