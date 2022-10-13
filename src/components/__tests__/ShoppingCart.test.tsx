import { MemoryRouter } from "react-router-dom";

import ShoppingCart from "components/ShoppingCart";
import { ShoppingCartContext, TShoppingCartContext } from "context/ShoppingCartProvider";
import { render, screen } from "testUtils";

describe("Shopping Cart", () => {
    it("should render shopping cart", () => {
        renderLayout();

        const shoppingCartHeading = screen.getByText("Shopping cart");
        expect(shoppingCartHeading).toBeInTheDocument();

        const closePanel = screen.getByText("Close panel");
        expect(closePanel).toBeInTheDocument();
    });
});

const cartItemsData = [
    {
        id: "6343946af1f4f6889b0d893f",
        quantity: 1,
    },
];

const shoppingCartContextValue: TShoppingCartContext = {
    openCart: jest.fn(),
    closeCart: jest.fn(),
    isOpen: true,
    addToCart: jest.fn(),
    cartItems: cartItemsData,
    removeFromCart: jest.fn(),
    sendOrderDetail: jest.fn(),
};

const renderLayout = () => {
    render(
        <MemoryRouter>
            <ShoppingCartContext.Provider value={shoppingCartContextValue}>
                <ShoppingCart />
            </ShoppingCartContext.Provider>
        </MemoryRouter>
    );
};
