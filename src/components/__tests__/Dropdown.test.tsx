import { MemoryRouter } from "react-router-dom";

import DropDown from "components/Dropdown";
import AuthContext from "context/AuthProvider";
import { authContextValue } from "service/mockContextData";
import { providerRender, screen, userEvent, waitFor } from "testUtils";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
}));
describe("Dropdown", () => {
    it("should render dropdown component ", () => {
        providerRender(
            <MemoryRouter>
                <DropDown />
            </MemoryRouter>
        );
        const profileLink = screen.getByRole("link", { name: "Profile" });
        expect(profileLink).toBeInTheDocument();

        const wishListLink = screen.getByRole("link", { name: "Wishlist" });
        expect(wishListLink).toBeInTheDocument();

        const loginLink = screen.getByRole("link", { name: "Login" });
        expect(loginLink).toBeInTheDocument();
    });

    it("should render logged in dropdown component ", () => {
        providerRender(
            <MemoryRouter>
                <AuthContext.Provider value={authContextValue}>
                    <DropDown />
                </AuthContext.Provider>
            </MemoryRouter>
        );
        const profileLink = screen.getByText("Profile");
        expect(profileLink).toBeInTheDocument();

        const ordersLink = screen.getByText("Orders");
        expect(ordersLink).toBeInTheDocument();

        const wishListLink = screen.getByText("Wishlist");
        expect(wishListLink).toBeInTheDocument();

        const signOutButton = screen.getByText("Sign out");
        expect(signOutButton).toBeInTheDocument();
    });

    it("should sign user out when sign out is clicked ", async () => {
        providerRender(
            <MemoryRouter>
                <AuthContext.Provider value={authContextValue}>
                    <DropDown />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        const signOutButton = screen.getByText("Sign out");
        userEvent.click(signOutButton);
        await waitFor(() => expect(mockNavigate).toBeCalledWith("/"));
    });
});
