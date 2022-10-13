import { MemoryRouter } from "react-router-dom";

import DropDown from "components/Dropdown";
import { providerRender, screen } from "testUtils";

describe("Dropdown", () => {
    it("should render dropdown component", () => {
        providerRender(
            <MemoryRouter>
                <DropDown />
            </MemoryRouter>
        );
        const loginLink = screen.getByRole("link", { name: "Login" });
        expect(loginLink).toBeInTheDocument();
    });
});
