import { Outlet } from "react-router-dom";

import Navbar from "components/Navbar";
import ShoppingCart from "components/ShoppingCart";

const Layout = () => {
    return (
        <main>
            <Navbar />
            <ShoppingCart />

            <Outlet />
        </main>
    );
};

export default Layout;
