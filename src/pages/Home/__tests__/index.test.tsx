/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

import axios from "axios";
import { mockProductData } from "service/mockFetchData";
import { providerRender, screen, userEvent, waitFor } from "testUtils";

import Home from "..";

jest.mock("axios");

describe("HomePage", () => {
    beforeEach(() => {
        (axios.put as jest.Mock).mockResolvedValue({
            data: mockProductData,
        });
    });
    it("should render homepage", async () => {
        providerRender(<Home />);
        const allImages = await screen.findAllByRole("img");
        await waitFor(() => expect(allImages.length).toBe(5));

        const prevArrowButton = await screen.findByTestId("prev-arrow-button");
        await waitFor(() => expect(prevArrowButton).toBeInTheDocument());

        const nextArrowButton = await screen.findByTestId("next-arrow-button");
        await waitFor(() => expect(nextArrowButton).toBeInTheDocument());
    });

    it("should show next page when next slide is clicked", async () => {
        const setStateMock = jest.fn();
        const useStateMock: any = (useState: any) => [useState, setStateMock];
        jest.spyOn(React, "useState").mockImplementation(useStateMock);

        providerRender(<Home />);

        const nextArrowButton = await screen.findByTestId("next-arrow-button");
        await waitFor(() => expect(nextArrowButton).toBeInTheDocument());

        userEvent.click(nextArrowButton);
        expect(setStateMock).toHaveBeenCalled();
    });

    it("should show prev page when prev slide is clicked", async () => {
        const setStateMock = jest.fn();
        const useStateMock: any = (useState: any) => [useState, setStateMock];
        jest.spyOn(React, "useState").mockImplementation(useStateMock);

        providerRender(<Home />);

        const prevArrowButton = await screen.findByTestId("prev-arrow-button");
        await waitFor(() => expect(prevArrowButton).toBeInTheDocument());

        userEvent.click(prevArrowButton);
        expect(setStateMock).toHaveBeenCalled();
    });
});
