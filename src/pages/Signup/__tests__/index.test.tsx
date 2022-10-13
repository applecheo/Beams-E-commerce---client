import { toast } from "react-toastify";

import axios from "axios";
import { customRender, screen, userEvent, waitFor } from "testUtils";

import SignUp from "..";

const axiosPostSpy = jest.spyOn(axios, "post");
const toastErrorSpy = jest.spyOn(toast, "error");
const mockNavigate = jest.fn();
const mockAxios = axios as jest.Mocked<typeof axios>;

jest.mock("axios");
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
}));

describe("SignUp", () => {
    it("should render sign up screen", () => {
        customRender(<SignUp />);
        const allPasswordInput = screen.getAllByLabelText(/password/i);
        expect(allPasswordInput).toHaveLength(2);

        const userInput = screen.getAllByRole("textbox");
        expect(userInput).toHaveLength(3);

        const heading = screen.getByRole("heading", { name: "Beams" });
        expect(heading).toBeInTheDocument();

        const signUpButton = screen.getByRole("button", { name: "Sign Up" });
        expect(signUpButton).toBeInTheDocument();
    });

    it("should send a post req after user submit the form", async () => {
        customRender(<SignUp />);

        fillUpAndSubmitForm();

        await waitFor(() =>
            expect(axiosPostSpy).toHaveBeenCalledWith(
                expect.stringContaining("/signup"),
                {
                    confirmPassword: "password",
                    email: "email@gmail.com",
                    firstName: "first name",
                    lastName: "last name",
                    password: "password",
                },
                { headers: { "Content-Type": "application/json" } }
            )
        );
    });

    it("should redirect to login page upon successful submission", async () => {
        customRender(<SignUp />);

        fillUpAndSubmitForm();

        await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/login"));
    });

    it("should show error when there is error submitting form", async () => {
        mockAxios.post.mockRejectedValue(new Error("Async error"));

        customRender(<SignUp />);

        fillUpAndSubmitForm();

        await waitFor(() => expect(toastErrorSpy).toHaveBeenCalledWith("Email already in use"));
    });

    describe("Error validation", () => {
        it("should render error when required is not met", async () => {
            customRender(<SignUp />);
            const firstNameInput = screen.getByRole("textbox", { name: "First Name" });
            const lastNameInput = screen.getByRole("textbox", { name: "Last Name" });
            const emailInput = screen.getByRole("textbox", { name: "Email Address" });
            const passwordInput = screen.getByLabelText("Password");
            const confirmPasswordInput = screen.getByLabelText("Confirm Password");

            userEvent.click(firstNameInput);
            userEvent.click(lastNameInput);
            userEvent.click(emailInput);
            userEvent.click(passwordInput);
            userEvent.click(confirmPasswordInput);
            userEvent.click(document.body);

            const errorMessage = await screen.findAllByText("Required");
            expect(errorMessage).toHaveLength(5);
        });

        // TODO: ADD FOR OTHER FIELDS
        it.each`
            fieldName          | inputValue        | errorMessage
            ${"Email Address"} | ${"123gmail.com"} | ${"Invalid email address"}
            ${"Email Address"} | ${"123@gmailcom"} | ${"Invalid email address"}
        `(
            "should render error when $fieldName $inputValue is not valid",
            async ({ fieldName, inputValue, errorMessage }) => {
                customRender(<SignUp />);
                const input = screen.getByRole("textbox", { name: fieldName });
                userEvent.clear(input);
                userEvent.type(input, inputValue);
                userEvent.click(document.body);
                const expectedErrorMessage = await screen.findByText(errorMessage);
                expect(expectedErrorMessage).toBeInTheDocument();
            }
        );

        it("should render error when input password error", async () => {
            customRender(<SignUp />);
            const passwordInput = screen.getByLabelText("Password");
            const confirmPasswordInput = screen.getByLabelText("Confirm Password");
            userEvent.clear(passwordInput);
            userEvent.type(passwordInput, "12345678");

            userEvent.clear(confirmPasswordInput);
            userEvent.type(confirmPasswordInput, "1234567");
            userEvent.click(document.body);

            const passwordMustMatch = await screen.findByText("Passwords must match");
            expect(passwordMustMatch).toBeInTheDocument();

            userEvent.clear(passwordInput);
            userEvent.type(passwordInput, "1234567");
            userEvent.click(document.body);

            const atLeast8Character = await screen.findByText("Must be at least 8 characters");
            expect(atLeast8Character).toBeInTheDocument();
        });
    });
});

const fillUpAndSubmitForm = () => {
    const firstNameInput = screen.getByRole("textbox", { name: "First Name" });
    userEvent.clear(firstNameInput);
    userEvent.type(firstNameInput, "first name");

    const lastNameInput = screen.getByRole("textbox", { name: "Last Name" });
    userEvent.clear(lastNameInput);
    userEvent.type(lastNameInput, "last name");

    const emailInput = screen.getByRole("textbox", { name: "Email Address" });
    userEvent.clear(emailInput);
    userEvent.type(emailInput, "email@gmail.com");

    const passwordInput = screen.getByLabelText("Password");
    userEvent.type(passwordInput, "password");

    const confirmPasswordInput = screen.getByText("Confirm Password");
    userEvent.type(confirmPasswordInput, "password");

    const submitButton = screen.getByRole("button", { name: "Sign Up" });
    userEvent.click(submitButton);
};
