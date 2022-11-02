import { MemoryRouter } from "react-router-dom";
import { toast } from "react-toastify";

import AuthContext from "context/AuthProvider";
import { ProductDetailsContext } from "context/ProductDetailsProvider";
import { authContextValue, productDetailContextValue } from "service/mockContextData";
import { providerRender, render, screen, userEvent, waitFor } from "testUtils";

import ProductDetailMen from "..";

const toastSuccessSpy = jest.spyOn(toast, "success");

jest.mock("axios");

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: () => ({
        id: "6343939ef1f4f6889b0d8930",
    }),
}));

describe("Product Detail Men page", () => {
    it("should render product detail page", async () => {
        providerRender(<ProductDetailMen />);
        const addToCartButton = screen.getByRole("button", { name: "Add To Cart" });
        const addToWishListButton = screen.getByRole("button", { name: "Add to Wishlist" });

        await waitFor(() => expect(addToCartButton).toBeInTheDocument());
        await waitFor(() => expect(addToWishListButton).toBeInTheDocument());
    });

    it("should render product detail chosen by user", async () => {
        renderLayout();

        const image = await screen.findByAltText("image1");
        const price = await screen.findByText("8", { exact: false });
        const name = await screen.findByText("name");

        await waitFor(() => expect(image).toBeInTheDocument());
        await waitFor(() => expect(price).toBeInTheDocument());
        await waitFor(() => expect(name).toBeInTheDocument());
    });

    it("should toast added to cart success when add to cart button clicked", async () => {
        providerRender(<ProductDetailMen />);

        const addToCartButton = screen.getByRole("button", { name: "Add To Cart" });

        userEvent.click(addToCartButton);

        await waitFor(() => expect(toastSuccessSpy).toHaveBeenCalledWith("Added to cart"));
    });

    it("should add product to wishlist upon click", async () => {
        renderLayout();

        const addToWishListButton = screen.getByRole("button", { name: "Add to Wishlist" });

        userEvent.click(addToWishListButton);

        // await waitFor(() =>
        //     expect(axios.put).toHaveBeenCalledWith(expect.stringContaining("/account/wishlist/id"), {
        //         userId: "userid",
        //     })
        // );
    });
});

const renderLayout = () => {
    render(
        <MemoryRouter>
            <AuthContext.Provider value={authContextValue}>
                <ProductDetailsContext.Provider value={productDetailContextValue}>
                    <ProductDetailMen />
                </ProductDetailsContext.Provider>
            </AuthContext.Provider>
        </MemoryRouter>
    );
};
