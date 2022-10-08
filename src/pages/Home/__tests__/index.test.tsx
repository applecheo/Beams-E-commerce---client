import { render, screen } from "testUtils";

import Home from "..";

it("should render home page when click", async () => {
    render(<Home />);
    const image = screen.getAllByAltText(/cover/i);
    expect(image).toHaveLength(5);
});
