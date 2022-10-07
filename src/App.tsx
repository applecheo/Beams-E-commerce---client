import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import BrowseMen from "./pages/BrowseMen";
import BrowseWomen from "./pages/BrowseWomen";
import Checkout from "./pages/Checkout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import ProductDetailMen from "./pages/ProductDetailMen";
import ProductDetailWomen from "./pages/ProductDetailWomen";
import Profile from "./pages/Profile";
import SignUp from "./pages/Signup";
import Wishlist from "./pages/Wishlist";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <SignUp />,
        },
        {
          path: "account/orders/id",
          element: <Orders />,
        },
        {
          path: "/checkout",
          element: <Checkout />,
        },
        {
          path: "/men",
          element: <BrowseMen />,
        },
        {
          path: "/women",
          element: <BrowseWomen />,
        },
        {
          path: "/account/profile",
          element: <Profile />,
        },
        {
          path: "/account/wishlist",
          element: <Wishlist />,
        },
        {
          path: "/men/:id",
          element: <ProductDetailMen />,
        },
        {
          path: "/women/:id",
          element: <ProductDetailWomen />,
        },
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
