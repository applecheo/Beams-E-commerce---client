import { customRender } from "testUtils";

import Wishlist from "..";

describe("Browse wishlist page", () => {
    it("should render wishlist page", () => {
        customRender(<Wishlist />);
    });
});
