import { render, screen } from "testUtils";

import Checkout from "..";

describe("Checkout", () => {
    it("should render checkout page", () => {
        render(<Checkout />);
        const orderHeader = screen.getByRole("heading", { name: "Order id:" });
        expect(orderHeader).toBeInTheDocument();

        const orderParagraph = screen.getByText("Thank you for shopping with us");
        expect(orderParagraph).toBeInTheDocument();

        const linkToHomepage = screen.getByRole("link", { name: "Shop for more" });
        expect(linkToHomepage).toBeInTheDocument();
    });
});
