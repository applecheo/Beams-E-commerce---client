import { MemoryRouter } from "react-router-dom";

import axios from "axios";
import { mockWishListData } from "service/mockFetchData";
import { customRender, providerRender, screen, waitFor } from "testUtils";

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
        const heading = screen.getByRole("heading", { name: "Your wishlist is empty. Start filling it up!" });
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

        const wishlist = await screen.findByRole("heading", { name: "Wishlist" });

        await waitFor(() => expect(wishlist).toBeInTheDocument());
    });
});
