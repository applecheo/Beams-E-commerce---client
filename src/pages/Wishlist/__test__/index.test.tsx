import { MemoryRouter } from "react-router-dom";

import axios from "axios";
import { mockWishListData } from "service/mockFetchData";
import { customRender, providerRender, screen, userEvent, waitFor } from "testUtils";

import Wishlist from "..";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
}));

jest.mock("axios");

describe("Browse wishlist page", () => {
    it("should render wishlist page", async () => {
        customRender(<Wishlist />);
        const heading = screen.getByRole("heading", { name: "Wishlist" });
        await waitFor(() => expect(heading).toBeInTheDocument());
    });

    it("should display user wishlist", async () => {
        (axios.get as jest.Mock).mockResolvedValue({
            data: mockWishListData,
        });

        providerRender(
            <MemoryRouter>
                <Wishlist />
            </MemoryRouter>
        );

        const productName = await screen.findByRole("heading", { name: "COLLUSION fantasy print T-shirt in black" });

        await waitFor(() => expect(productName).toBeInTheDocument());
    });

    it("should navigate to selected product page", async () => {
        (axios.get as jest.Mock).mockResolvedValue({
            data: mockWishListData,
        });

        providerRender(
            <MemoryRouter>
                <Wishlist />
            </MemoryRouter>
        );

        const productName = await screen.findByRole("heading", { name: "COLLUSION fantasy print T-shirt in black" });

        // eslint-disable-next-line testing-library/no-wait-for-side-effects
        await waitFor(() => userEvent.click(productName));
        await waitFor(() => expect(mockNavigate).toBeCalledWith("/men/6343939ef1f4f6889b0d8930"));
    });
});
