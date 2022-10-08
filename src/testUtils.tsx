import { ReactElement } from "react";
import { BrowserRouter } from "react-router-dom";

import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const customRender = (ui: ReactElement) => render(ui, { wrapper: BrowserRouter });

export * from "@testing-library/react";
export { userEvent };

export { customRender as render };
