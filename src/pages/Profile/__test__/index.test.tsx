/* eslint-disable @typescript-eslint/no-explicit-any */
import { MemoryRouter } from "react-router-dom";

import axios from "axios";
import AuthContext from "context/AuthProvider";
import { authContextValue } from "service/mockContextData";
import { mockProductData } from "service/mockFetchData";
import { providerRender, screen, userEvent, waitFor } from "testUtils";

import Profile from "..";

const axiosDeleteSpy = jest.spyOn(axios, "delete");

const mockNavigate = jest.fn();
jest.mock("axios");

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
}));

describe("Profile page", () => {
    it("should render profile page", async () => {
        (axios.get as jest.Mock).mockResolvedValue({
            data: mockProductData,
        });
        providerRender(
            <MemoryRouter>
                <Profile />
            </MemoryRouter>
        );
        const deleteButton = screen.getByRole("button", { name: "Delete my account" });
        expect(deleteButton).toBeInTheDocument();

        userEvent.click(deleteButton);
        const confirmDeleteButton = await screen.findByRole("button", { name: "Confirm" });
        await waitFor(() => expect(confirmDeleteButton).toBeInTheDocument());
    });

    it("should delete user when confirm button is clicked", async () => {
        providerRender(
            <MemoryRouter>
                <AuthContext.Provider value={authContextValue}>
                    <Profile />
                </AuthContext.Provider>
            </MemoryRouter>
        );
        const deleteButton = screen.getByRole("button", { name: "Delete my account" });
        expect(deleteButton).toBeInTheDocument();

        userEvent.click(deleteButton);
        userEvent.click(deleteButton);

        await waitFor(() =>
            expect(axiosDeleteSpy).toHaveBeenCalledWith(expect.stringContaining("/account/profile/userid"))
        );
    });
});
