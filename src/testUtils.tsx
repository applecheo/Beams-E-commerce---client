import { ReactElement, ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";

import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const customRender = (ui: ReactElement) => render(ui, { wrapper: BrowserRouter });

export * from "@testing-library/react";
export { userEvent };

export { customRender as render };

// ------------------------------------------------------------------------------------------------------------------------------------------

import { AuthProvider } from "context/AuthProvider";
import { OrderDetailsProvider } from "context/OrderDetailsProvider";
import { ProductDetailsProvider } from "context/ProductDetailsProvider";
import { ShoppingCartProvider } from "context/ShoppingCartProvider";

type TAllTheProviderProps = {
    children: ReactNode;
};

const AllTheProviders = ({ children }: TAllTheProviderProps) => {
    return (
        <AuthProvider>
            <ProductDetailsProvider>
                <OrderDetailsProvider>
                    <ShoppingCartProvider>{children}</ShoppingCartProvider>
                </OrderDetailsProvider>
            </ProductDetailsProvider>
        </AuthProvider>
    );
};

const ProviderRender = (ui: ReactElement) => render(ui, { wrapper: AllTheProviders });

export * from "@testing-library/react";
export { ProviderRender as providerRender };
