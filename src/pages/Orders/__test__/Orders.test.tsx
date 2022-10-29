import AuthContext from "context/AuthProvider";
import { OrderDetailsContext } from "context/OrderDetailsProvider";
import { authContextValue, orderDetailContextValue } from "service/mockContextData";
import { render, screen } from "testUtils";

import Orders from "..";

jest.mock("axios");

describe("Orders page", () => {
    it("should render order page", () => {
        // (axios.get as jest.Mock).mockResolvedValue({
        //     data: mockOrderData,
        // });
        render(
            <AuthContext.Provider value={authContextValue}>
                <OrderDetailsContext.Provider value={orderDetailContextValue}>
                    <Orders />
                </OrderDetailsContext.Provider>
            </AuthContext.Provider>
        );
        const header = screen.getByRole("heading", { name: "Orders" });
        expect(header).toBeInTheDocument();
    });
});
