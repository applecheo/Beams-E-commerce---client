import CartItem from "components/CartItem";
import { providerRender, screen, userEvent } from "testUtils";

describe("CartItem", () => {
    it("should render Cart Item", () => {
        providerRender(<CartItem id={""} quantity={0} />);
        const removeButton = screen.getByRole("button", { name: "Remove" });
        expect(removeButton).toBeInTheDocument();
    });

    it("should remove cart item when remove is clicked", () => {
        providerRender(<CartItem id={""} quantity={0} />);
        const removeButton = screen.getByRole("button", { name: "Remove" });
        userEvent.click(removeButton);
    });
});
