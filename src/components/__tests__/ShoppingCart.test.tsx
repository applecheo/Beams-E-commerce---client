import { MemoryRouter } from "react-router-dom";
import { toast } from "react-toastify";

import ShoppingCart from "components/ShoppingCart";
import AuthContext from "context/AuthProvider";
import { OrderDetailsContext } from "context/OrderDetailsProvider";
import { ProductDetailsContext } from "context/ProductDetailsProvider";
import { ShoppingCartContext } from "context/ShoppingCartProvider";
import {
    authContextValue,
    orderDetailContextValue,
    productDetailContextValue,
    shoppingCartContextValue,
} from "service/mockContextData";
import { render, screen, userEvent, waitFor } from "testUtils";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
}));

const toastInfoSpy = jest.spyOn(toast, "info");
const toastErrorSpy = jest.spyOn(toast, "error");

beforeEach(() => {
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
        observe: () => null,
        unobserve: () => null,
        disconnect: () => null,
    });
    window.IntersectionObserver = mockIntersectionObserver;
});

describe("Shopping Cart", () => {
    it("should render shopping cart", () => {
        renderLayout();

        const shoppingCartHeading = screen.getByText("Shopping cart");
        expect(shoppingCartHeading).toBeInTheDocument();

        const closePanel = screen.getByText("Close panel");
        expect(closePanel).toBeInTheDocument();

        const checkoutButton = screen.getByRole("button", { name: "Checkout" });
        expect(checkoutButton).toBeInTheDocument();
    });
});

describe("checkout", () => {
    // it("should navigate to checkout page when there is product in cart and user is logged in", async () => {
    //     renderLayout();

    //     checkout();

    //     await waitFor(() => expect(mockNavigate).toBeCalledWith("/checkout"));
    // });

    it("should toastify make payment upon successful checkout", async () => {
        renderLayout();

        checkout();

        await waitFor(() => expect(toastInfoSpy).toHaveBeenCalledWith("Please proceed to make your payment"));
    });

    it("should toastify error if there is nothing in cart upon checkout", async () => {
        render(
            <MemoryRouter>
                <ProductDetailsContext.Provider value={productDetailContextValue}>
                    <OrderDetailsContext.Provider value={orderDetailContextValue}>
                        <ShoppingCartContext.Provider value={shoppingCartContextValue}>
                            <ShoppingCart />
                        </ShoppingCartContext.Provider>
                    </OrderDetailsContext.Provider>
                </ProductDetailsContext.Provider>
            </MemoryRouter>
        );

        checkout();

        await waitFor(() => expect(toastErrorSpy).toHaveBeenCalledWith("Please Login"));
    });

    it("should toastify error if there is nothing in cart upon checkout", async () => {
        render(
            <MemoryRouter>
                <AuthContext.Provider value={authContextValue}>
                    <ProductDetailsContext.Provider value={productDetailContextValue}>
                        <OrderDetailsContext.Provider value={orderDetailContextValue}>
                            <ShoppingCartContext.Provider value={{ ...shoppingCartContextValue, cartItems: [] }}>
                                <ShoppingCart />
                            </ShoppingCartContext.Provider>
                        </OrderDetailsContext.Provider>
                    </ProductDetailsContext.Provider>
                </AuthContext.Provider>
            </MemoryRouter>
        );

        checkout();

        await waitFor(() => expect(toastErrorSpy).toHaveBeenCalledWith("Nothing in your cart"));
    });
});

const renderLayout = () => {
    render(
        <MemoryRouter>
            <AuthContext.Provider value={authContextValue}>
                <ProductDetailsContext.Provider value={productDetailContextValue}>
                    <OrderDetailsContext.Provider value={orderDetailContextValue}>
                        <ShoppingCartContext.Provider value={shoppingCartContextValue}>
                            <ShoppingCart />
                        </ShoppingCartContext.Provider>
                    </OrderDetailsContext.Provider>
                </ProductDetailsContext.Provider>
            </AuthContext.Provider>
        </MemoryRouter>
    );
};

const checkout = () => {
    const checkoutButton = screen.getByRole("button", { name: "Checkout" });
    userEvent.click(checkoutButton);
};
