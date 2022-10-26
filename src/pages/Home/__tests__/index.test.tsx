import { providerRender, screen } from "testUtils";

import Home from "..";

describe("HomePage", () => {
    it("should render homepage", async () => {
        providerRender(<Home />);
        const allImages = screen.getAllByRole("img");
        expect(allImages.length).toBe(5);
    });
});
