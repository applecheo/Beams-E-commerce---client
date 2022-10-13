import React from "react";
import { MemoryRouter } from "react-router-dom";

import axios from "axios";
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
            data: [
                {
                    _id: "6343939ef1f4f6889b0d8930",
                    name: "COLLUSION fantasy print T-shirt in black",
                    price: 26.9,
                    category: "T-shirts",
                    gender: "Men",
                    images: ["https://images.asos-media.com/products/collusion-fantasy-print-t-shirt-in-black/"],
                    size: "S",
                    createdAt: "2022-10-10T03:38:06.158Z",
                    updatedAt: "2022-10-10T03:38:06.158Z",
                    __v: 0,
                    isNewArrival: true,
                    isSoldOut: false,
                },
            ],
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
        (axios.get as jest.Mock).mockResolvedValue({
            data: [
                {
                    _id: "6343939ef1f4f6889b0d8930",
                    name: "COLLUSION fantasy print T-shirt in black",
                    price: 26.9,
                    category: "T-shirts",
                    gender: "Men",
                    images: ["https://images.asos-media.com/products/collusion-fantasy-print-t-shirt-in-black/"],
                    size: "S",
                    createdAt: "2022-10-10T03:38:06.158Z",
                    updatedAt: "2022-10-10T03:38:06.158Z",
                    __v: 0,
                    isNewArrival: true,
                    isSoldOut: false,
                },
            ],
        });

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

    // it("should navigate to home when confirm button is click", async () => {
    //     (axios.post as jest.Mock).mockResolvedValue({
    //         data: {
    //             token: "123",
    //             user: {
    //                 email: "test@email.com",
    //                 firstName: "first name",
    //                 gender: "gender",
    //                 lastName: "last name",
    //                 watchList: [],
    //                 _id: "1",
    //             },
    //         },
    //     });
    //     (axios.get as jest.Mock).mockResolvedValue({
    //         data: [
    //             {
    //                 _id: "6343939ef1f4f6889b0d8930",
    //                 name: "COLLUSION fantasy print T-shirt in black",
    //                 price: 26.9,
    //                 category: "T-shirts",
    //                 gender: "Men",
    //                 images: ["https://images.asos-media.com/products/collusion-fantasy-print-t-shirt-in-black/"],
    //                 size: "S",
    //                 createdAt: "2022-10-10T03:38:06.158Z",
    //                 updatedAt: "2022-10-10T03:38:06.158Z",
    //                 __v: 0,
    //                 isNewArrival: true,
    //                 isSoldOut: false,
    //             },
    //         ],
    //     });
    //     providerRender(
    //         <MemoryRouter>
    //             <Profile />
    //         </MemoryRouter>
    //     );
    //     const deleteButton = screen.getByRole("button", { name: "Delete my account" });
    //     expect(deleteButton).toBeInTheDocument();

    //     userEvent.click(deleteButton);
    //     const confirmDeleteButton = await screen.findByRole("button", { name: "Confirm" });

    //     userEvent.click(confirmDeleteButton);
    //     await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/"));
    // });
});
