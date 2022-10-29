import React from "react";
import { MemoryRouter } from "react-router-dom";

import axios from "axios";
import { mockProductData } from "service/mockFetchData";
import { providerRender, screen, userEvent, waitFor } from "testUtils";

import Profile from "..";

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

    it("should execute setConfirmDelete when onMouseLeave", async () => {
        const setStateMock = jest.fn();
        const useStateMock: any = (useState: false) => [useState, setStateMock];
        jest.spyOn(React, "useState").mockImplementation(useStateMock);

        providerRender(
            <MemoryRouter>
                <Profile />
            </MemoryRouter>
        );

        const deleteButton = screen.getByRole("button", { name: "Delete my account" });
        expect(deleteButton).toBeInTheDocument();

        userEvent.click(deleteButton);

        userEvent.hover(document.body);

        await waitFor(() => expect(setStateMock).toHaveBeenCalledWith(true));
    });
});
