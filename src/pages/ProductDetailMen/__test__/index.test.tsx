import { toast } from "react-toastify";

import { providerRender, screen, userEvent, waitFor } from "testUtils";

import ProductDetailMen from "..";

const toastSuccessSpy = jest.spyOn(toast, "success");

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: () => ({
        id: "12",
    }),
}));

describe("Product Detail Men page", () => {
    it("should render product detail page", () => {
        providerRender(<ProductDetailMen />);
        const addToCartButton = screen.getByRole("button", { name: "Add To Cart" });
        expect(addToCartButton).toBeInTheDocument();

        // const addToWishListButton = screen.getByRole("button", { name: "Add to Wishlist" });
        // expect(addToWishListButton).toBeInTheDocument();
    });

    it("should toast added to cart success when add to cart button clicked", async () => {
        providerRender(<ProductDetailMen />);

        const addToCartButton = screen.getByRole("button", { name: "Add To Cart" });

        userEvent.click(addToCartButton);

        await waitFor(() => expect(toastSuccessSpy).toHaveBeenCalledWith("Added to cart"));
    });
});
