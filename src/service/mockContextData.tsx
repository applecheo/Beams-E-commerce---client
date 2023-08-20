import { TAuthContext } from "context/AuthProvider";
import { TProductDetailsContext } from "context/ProductDetailsProvider";
import { TShoppingCartContext } from "context/ShoppingCartProvider";

const cartItemsData = [
    {
        id: "6343946af1f4f6889b0d893f",
        quantity: 1,
    },
];

export const shoppingCartContextValue: TShoppingCartContext = {
    openCart: jest.fn(),
    closeCart: jest.fn(),
    isOpen: true,
    addToCart: jest.fn(),
    cartItems: cartItemsData,
    removeFromCart: jest.fn(),
};

const productData = [
    {
        _id: "id",
        name: "name",
        category: "category",
        gender: "gender",
        images: ["image1"],
        isSoldOut: false,
        price: 8,
        isNewArrival: true,
        size: "size",
        createdAt: "",
    },
];

export const productDetailContextValue: TProductDetailsContext = {
    productData: productData,
    viewProductHandler: jest.fn(),
    display: "id",
};

export const userData = {
    email: "email",
    firstName: "firstName",
    gender: "gender",
    lastName: "lastName",
    wishList: [],
    _id: "userid",
};

export const authContextValue: TAuthContext = {
    userData: userData,
    updateUserData: jest.fn(),
    updateWishlist: jest.fn(),
};
