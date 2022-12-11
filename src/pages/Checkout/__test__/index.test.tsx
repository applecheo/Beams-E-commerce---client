import { MemoryRouter } from "react-router-dom";

import { providerRender, screen } from "testUtils";

import Checkout from "..";

describe("Checkout", () => {
    it("should render checkout page", () => {
        providerRender(
            <MemoryRouter>
                <Checkout />
            </MemoryRouter>
        );

        const doNotRefresh = screen.getByText("PLEASE DO NOT REFRESH THIS PAGE");
        expect(doNotRefresh).toBeInTheDocument();
    });
    // it("should render checkout page", () => {
    //     providerRender(
    //         <MemoryRouter>
    //             <Checkout />
    //         </MemoryRouter>
    //     );

    //     const orderParagraph = screen.getByText("Thank you for shopping with us");
    //     expect(orderParagraph).toBeInTheDocument();

    //     const linkToHomepage = screen.getByRole("link", { name: "Shop for more" });
    //     expect(linkToHomepage).toBeInTheDocument();

    //     const linkToOrders = screen.getByRole("link", { name: "My Orders" });
    //     expect(linkToOrders).toBeInTheDocument();
    // });
});
