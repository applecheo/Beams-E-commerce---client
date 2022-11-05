import { TAuthContext } from "context/AuthProvider";
import { TOrderDetailsContext } from "context/OrderDetailsProvider";
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
    sendOrderDetail: jest.fn(),
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
    newArrivalData: [],
    fetchNewArrival: jest.fn(),
    prevSlide: jest.fn(),
    nextSlide: jest.fn(),
    displayNewArrivalData: productData,
};

const userViewOrderData = {
    _id: "id",
    orderedBy: "test",
    status: "status",
    name: "name",
    products: [],
};
const orderDetailsData = { orders: [productData], status: "status", _id: "orderId" };

export const orderDetailContextValue: TOrderDetailsContext = {
    getOrderId: jest.fn(),
    orderId: "123",
    orderDetails: orderDetailsData,
    getOrderDetails: jest.fn(),
    updateUserOrder: jest.fn(),
    userViewOrder: userViewOrderData,
    getUserViewOrder: jest.fn(),
};

const userData = {
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
