import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "context/AuthProvider";

const DropDown = () => {
    const { user } = useAuth();
    const linkToOrder = `/account/orders/${user}`;
    const navigate = useNavigate();
    const signOut = () => {
        navigate("/");
        sessionStorage.removeItem("token_key");
        window.location.reload();
    };
    return (
        <>
            <div
                className="absolute right-1 z-10 mt-3 w-28 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                tabIndex={-1}
            >
                <div className="py-2 flex flex-col justify-center items-center" role="none">
                    {user ? (
                        <Link
                            to="/account/profile"
                            className="text-black block  text-sm"
                            role="menuitem"
                            tabIndex={-1}
                            id="menu-item-0"
                        >
                            Profile
                        </Link>
                    ) : (
                        <Link to="/login" className="text-black block  text-sm">
                            Profile
                        </Link>
                    )}

                    {user && (
                        <Link
                            to={linkToOrder}
                            className="text-black block text-sm"
                            role="menuitem"
                            tabIndex={-1}
                            id="menu-item-0"
                        >
                            Orders
                        </Link>
                    )}
                    {user ? (
                        <Link
                            to="/account/wishlist"
                            className="text-black block  text-sm"
                            role="menuitem"
                            tabIndex={-1}
                            id="menu-item-0"
                        >
                            WishList
                        </Link>
                    ) : (
                        <Link to="/login" className="text-black block  text-sm">
                            WishList
                        </Link>
                    )}

                    {!user ? (
                        <Link to="/login" className="text-black block  text-sm">
                            Login
                        </Link>
                    ) : (
                        <button
                            type="submit"
                            className="text-black block  text-sm"
                            role="menuitem"
                            tabIndex={-1}
                            id="menu-item-3"
                            onClick={signOut}
                        >
                            Sign out
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};
export default DropDown;
