import React from "react";

import CartItem from "components/CartItem";
import { providerRender, screen, userEvent } from "testUtils";

describe("CartItem", () => {
    it("should render Cart Item", () => {
        providerRender(<CartItem id={""} quantity={0} />);
        const removeButton = screen.getByRole("button", { name: "Remove" });
        expect(removeButton).toBeInTheDocument();
    });

    it("should remove cart item when remove is clicked", () => {
        const setStateMock = jest.fn();
        const useStateMock: any = (useState: any) => [useState, setStateMock];
        jest.spyOn(React, "useState").mockImplementation(useStateMock);

        providerRender(<CartItem id={""} quantity={0} />);
        const removeButton = screen.getByRole("button", { name: "Remove" });
        userEvent.click(removeButton);
        expect(setStateMock).toHaveBeenCalled();
    });
});
