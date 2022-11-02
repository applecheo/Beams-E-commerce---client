import OrderDetailCard from "components/OrderDetailCard";
import { OrderDetailsContext } from "context/OrderDetailsProvider";
import { orderDetailContextValue } from "service/mockContextData";
import { providerRender, screen } from "testUtils";

describe("Order Detail Card", () => {
    it("should render order details", () => {
        providerRender(
            <OrderDetailsContext.Provider value={orderDetailContextValue}>
                <OrderDetailCard
                    isView={{
                        _id: "id",
                        name: "name",
                        price: 0,
                        category: "category",
                        gender: "male",
                        images: ["img1"],
                        size: "size",
                    }}
                />
            </OrderDetailsContext.Provider>
        );
        const status = screen.getByRole("heading", { name: "Order status: status" });
        const image = screen.getByAltText("img1");
        const name = screen.getByText("name");
        const size = screen.getByText("Size: size");
        expect(status).toBeInTheDocument();
        expect(image).toBeInTheDocument();
        expect(size).toBeInTheDocument();
        expect(name).toBeInTheDocument();
    });
});
