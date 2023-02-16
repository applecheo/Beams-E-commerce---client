import axios from "axios";
import { mockOrderData } from "service/mockFetchData";
import { customRender, screen, waitFor } from "testUtils";

import Orders from "..";

jest.mock("axios");

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: () => ({
        id: "userid",
    }),
}));
beforeEach(() => {
    (axios.get as jest.Mock).mockResolvedValue({
        data: mockOrderData,
    });
});
describe("Order Page", () => {
    it("should render Order Page", async () => {
        customRender(<Orders />);

        const orderID = await screen.findByRole("heading", { name: "Order #63439401f1f4f6889b0d8937" });
        await waitFor(() => expect(orderID).toBeInTheDocument());

        const date = await screen.findByText("2022-10-12");
        await waitFor(() => expect(date).toBeInTheDocument());

        const name_of_product = await screen.findByRole("heading", {
            name: "Marshall Artist siren injection T-shirt in green",
        });
        await waitFor(() => expect(name_of_product).toBeInTheDocument());

        const category = await screen.findByText("T-shirts");
        await waitFor(() => expect(category).toBeInTheDocument());
    });
});
