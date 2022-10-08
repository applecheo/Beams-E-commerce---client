import { render, screen, userEvent } from "testUtils";

import SignUp from "..";

//test for link
//test for fetch
describe("SignUp", () => {
    it("should render sign up screen", () => {
        render(<SignUp />);
        const allPasswordInput = screen.getAllByLabelText(/password/i);
        expect(allPasswordInput).toHaveLength(2);

        const userInput = screen.getAllByRole("textbox");
        expect(userInput).toHaveLength(3);

        const heading = screen.getByRole("heading", { name: "Beams" });
        expect(heading).toBeInTheDocument();

        const signUpButton = screen.getByRole("button", { name: "Sign Up" });
        expect(signUpButton).toBeInTheDocument();
    });

    it("should render error when required is not met", async () => {
        render(<SignUp />);
        const firstNameInput = screen.getByRole("textbox", { name: "First Name" });
        const lastNameInput = screen.getByRole("textbox", { name: "Last Name" });
        const emailInput = screen.getByRole("textbox", { name: "Email Address" });
        const passwordInput = screen.getByLabelText("Password");
        const confirmPasswordInput = screen.getByText("Confirm Password");

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
            render(<SignUp />);
            const input = screen.getByRole("textbox", { name: fieldName });
            userEvent.clear(input);
            userEvent.type(input, inputValue);
            userEvent.click(document.body);
            const expectedErrorMessage = await screen.findByText(errorMessage);
            expect(expectedErrorMessage).toBeInTheDocument();
        }
    );

    it("should render error when input password error", async () => {
        render(<SignUp />);
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
