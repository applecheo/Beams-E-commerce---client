import { MemoryRouter } from "react-router-dom";

import Layout from "layout";
import { providerRender, screen } from "testUtils";

describe("Layout", () => {
    it("should render navbar component", () => {
        providerRender(
            <MemoryRouter>
                <Layout />
            </MemoryRouter>
        );
        const beamsLink = screen.getByRole("link", { name: "Beams" });
        expect(beamsLink).toBeInTheDocument();

        const menLink = screen.getByRole("link", { name: "Men" });
        expect(menLink).toBeInTheDocument();

        const womenLink = screen.getByRole("link", { name: "Women" });
        expect(womenLink).toBeInTheDocument();

        const shoppingCartImg = screen.getByTestId("cart-svg");
        expect(shoppingCartImg).toBeInTheDocument();
    });
});
