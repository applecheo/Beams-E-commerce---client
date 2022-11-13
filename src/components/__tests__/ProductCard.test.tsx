import ProductCard from "components/ProductCard";
import { ProductDetailsContext } from "context/ProductDetailsProvider";
import { productDetailContextValue } from "service/mockContextData";
import { customRender, providerRender, screen, userEvent, waitFor } from "testUtils";

const mockNavigate = jest.fn();
jest.mock("axios");

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
}));

describe("ProductCard", () => {
    it("should render card images", () => {
        customRender(<ProductCard _id={"12345678"} name={"test"} gender={"m"} images={["123"]} price={8} />);
        const image = screen.getByAltText("test");
        expect(image).toBeInTheDocument();

        const title = screen.getByText("test");
        expect(title).toBeInTheDocument();

        const price = screen.getByText("$8");
        expect(price).toBeInTheDocument();
    });
    it("should navigate to product detail on image click", async () => {
        providerRender(
            <ProductDetailsContext.Provider value={productDetailContextValue}>
                <ProductCard _id={"id"} name={"test"} gender={"m"} images={["123"]} price={8} />
            </ProductDetailsContext.Provider>
        );

        const image = screen.getByAltText("test");
        userEvent.click(image);
        await waitFor(() => expect(mockNavigate).toBeCalledWith("/gender/id"));
    });
});
