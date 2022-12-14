import * as router from "react-router";
import { MemoryRouter } from "react-router-dom";
import { toast } from "react-toastify";

import axios from "axios";
import { mockProductData, mockUserData } from "service/mockFetchData";
import { customRender, providerRender, screen, userEvent, waitFor } from "testUtils";

import Login from "..";

const toastErrorSpy = jest.spyOn(toast, "error");
const toastSuccessSpy = jest.spyOn(toast, "success");
const mockNavigate = jest.fn();

jest.mock("axios");

beforeEach(() => {
    jest.spyOn(router, "useNavigate").mockImplementation(() => mockNavigate);
});

describe("Login", () => {
    it("should render login page", () => {
        customRender(<Login />);
        const heading = screen.getByRole("heading", { name: "Beams" });
        expect(heading).toBeInTheDocument();

        const paragraph = screen.getByText("Ensure you’re not losing out on any rewards & benefits. Login here.");
        expect(paragraph).toBeInTheDocument();

        const emailInput = screen.getByRole("textbox", { name: "Email Address" });
        expect(emailInput).toBeInTheDocument();

        const passwordInput = screen.getByLabelText(/password/i);
        expect(passwordInput).toBeInTheDocument();

        const loginButton = screen.getByRole("button", { name: "Login" });
        expect(loginButton).toBeInTheDocument();

        const signupLink = screen.getByRole("link", { name: "Sign Up" });
        expect(signupLink).toBeInTheDocument();
    });

    it("should login when login button is clicked", async () => {
        customRender(<Login />);
        fillUpAndSubmitForm();

        await waitFor(() =>
            expect(axios.post).toHaveBeenCalledWith(
                expect.stringContaining("/"),
                {
                    email: "test@gmail.com",
                    password: "test",
                },
                { headers: { "Content-Type": "application/json" } }
            )
        );
    });

    it("should navigate to home upon login", async () => {
        customRender(<Login />);
        fillUpAndSubmitForm();

        await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/"));
    });

    it("should toastify success upon successful login", async () => {
        (axios.get as jest.Mock).mockResolvedValue({
            data: mockProductData,
        });

        (axios.post as jest.Mock).mockResolvedValue({
            data: mockUserData,
        });
        providerRender(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );
        fillUpAndSubmitForm();

        await waitFor(() => expect(toastSuccessSpy).toHaveBeenCalledWith("Login Successful"));
    });
});

describe("Error validation", () => {
    it("should toastify error for null input after submit", async () => {
        customRender(<Login />);
        const emailInput = screen.getByRole("textbox", { name: "Email Address" });
        const passwordInput = screen.getByLabelText(/password/i);
        const loginButton = screen.getByRole("button", { name: "Login" });

        userEvent.clear(emailInput);
        userEvent.clear(passwordInput);
        userEvent.click(loginButton);

        await waitFor(() => expect(toastErrorSpy).toHaveBeenCalledWith("Please use a valid email and password"));
    });

    it("should toastify error for null email inputs after submit", async () => {
        customRender(<Login />);
        const emailInput = screen.getByRole("textbox", { name: "Email Address" });
        const passwordInput = screen.getByLabelText(/password/i);
        const loginButton = screen.getByRole("button", { name: "Login" });

        userEvent.clear(emailInput);
        userEvent.type(emailInput, "test@gmail.com");
        userEvent.clear(passwordInput);
        userEvent.click(loginButton);

        await waitFor(() => expect(toastErrorSpy).toHaveBeenCalledWith("Please use a valid email and password"));
    });

    it("should toastify error for null password inputs after submit", async () => {
        customRender(<Login />);
        const emailInput = screen.getByRole("textbox", { name: "Email Address" });
        const passwordInput = screen.getByLabelText(/password/i);
        const loginButton = screen.getByRole("button", { name: "Login" });

        userEvent.clear(emailInput);
        userEvent.clear(passwordInput);
        userEvent.type(passwordInput, "test");
        userEvent.click(loginButton);

        await waitFor(() => expect(toastErrorSpy).toHaveBeenCalledWith("Please use a valid email and password"));
    });

    it("should toastify error for invalid login", async () => {
        (axios.post as jest.Mock).mockRejectedValue(new Error("Async error"));
        customRender(<Login />);

        fillUpAndSubmitForm();

        await waitFor(() => expect(toastErrorSpy).toHaveBeenCalledWith("Please use a valid email and password"));
    });
});

const fillUpAndSubmitForm = () => {
    const emailInput = screen.getByRole("textbox", { name: "Email Address" });
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole("button", { name: "Login" });

    userEvent.clear(emailInput);
    userEvent.type(emailInput, "test@gmail.com");
    userEvent.clear(passwordInput);
    userEvent.type(passwordInput, "test");
    userEvent.click(loginButton);
};
