import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "context/AuthProvider";

const DropDown = () => {
    const { userData, updateUserData } = useAuth();
    const linkToOrder = `/account/orders/${userData._id}`;
    const navigate = useNavigate();
    const signOut = () => {
        sessionStorage.removeItem("token_key");
        navigate("/");
        const resetUser = { email: "", firstName: "", gender: "", lastName: "", wishList: [], _id: "" };
        updateUserData(resetUser);
    };
    return (
        <>
            <div
                className="relative top-14 right-24 z-10 mt-3 w-32 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                tabIndex={-1}
            >
                <div className="py-2 flex flex-col justify-center items-center" role="none">
                    {userData._id ? (
                        <>
                            <Link
                                to="/account/profile"
                                className="text-black block  text-sm"
                                role="menuitem"
                                tabIndex={-1}
                                id="menu-item-0"
                            >
                                Profile
                            </Link>

                            <Link
                                to={linkToOrder}
                                className="text-black block text-sm"
                                role="menuitem"
                                tabIndex={-1}
                                id="menu-item-0"
                            >
                                Orders
                            </Link>

                            <Link
                                to="/account/wishlist"
                                className="text-black block  text-sm"
                                role="menuitem"
                                tabIndex={-1}
                                id="menu-item-0"
                            >
                                Wishlist
                            </Link>

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
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-black block  text-sm">
                                Profile
                            </Link>

                            <Link to="/login" className="text-black block  text-sm">
                                Wishlist
                            </Link>

                            <Link to="/login" className="text-black block  text-sm">
                                Login
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};
export default DropDown;
