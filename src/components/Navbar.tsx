import { useState } from "react";
import { NavLink } from "react-router-dom";

import { useShoppingCart } from "context/ShoppingCartProvider";

import DropDown from "./Dropdown";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const { openCart } = useShoppingCart();

    return (
        <div className="sm:flex items-baseline border-b-2 border-black justify-between min-w-full px-2 xl:px-64 2xl:px-80">
            <div>
                <NavLink to={"/"} className=" text-4xl ">
                    Beams
                </NavLink>
                <NavLink to={"/men"} className="pl-5 text-base">
                    Men
                </NavLink>
                <NavLink to={"/women"} className="pl-3 text-base">
                    Women
                </NavLink>
            </div>

            <div className="sm:flex items-center justify-evenly h-10" data-testid="cart-svg">
                <button className="w-5 h-8 relative " onClick={openCart}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor" className="">
                        <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
                    </svg>
                </button>
                <div className="cursor-pointer " onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
                    <div>
                        <div className="w-5 ml-4 mr-2">
                            <svg
                                height="24"
                                viewBox="0 0 24 24"
                                stroke="#212b36"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                fill="none"
                            >
                                <circle cx="12" cy="8" r="5" />
                                <path d="M3,21 h18 C 21,12 3,12 3,21" />
                            </svg>
                            {open === true && <DropDown />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Navbar;
