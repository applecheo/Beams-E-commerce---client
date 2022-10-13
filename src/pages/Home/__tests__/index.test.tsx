import { customRender, screen } from "testUtils";

import Home from "..";

describe("HomePage", () => {
    it("should render homepage", async () => {
        customRender(<Home />);
        const allImages = screen.getAllByRole("img");
        expect(allImages.length).toBe(5);
    });
});
