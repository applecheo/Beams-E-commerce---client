import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "./index";
import userEvent from "@testing-library/user-event";

it("should render home page when click", async () => {
  render(<Home />);
  const image = screen.getAllByAltText(/cover/i);
  expect(image).toHaveLength(2);

  // const homeButton = await screen.findByRole("link", { name: "Beams" });
  // await userEvent.click(homeButton);
  // expect(homeButton).toBeInTheDocument();
});
