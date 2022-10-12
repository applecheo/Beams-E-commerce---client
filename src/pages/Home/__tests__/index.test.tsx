import { render, screen } from "testUtils";

import Home from "..";

describe("HomePage", () => {
    it("should render homepage", async () => {
        render(<Home />);
        const allImages = screen.getAllByRole("img");
        expect(allImages.length).toBe(5);
    });
});
