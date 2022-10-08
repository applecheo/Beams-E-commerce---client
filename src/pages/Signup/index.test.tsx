import React from "react";
import { getByLabelText, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignUp from ".";
import { useNavigate } from "react-router-dom";

//test for link
//test for fetch
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

it("should render error when required in not met", async () => {
  render(<SignUp />);
  const firstNameInput = screen.getByRole("textbox", { name: "First Name" });
  const lastNameInput = screen.getByRole("textbox", { name: "Last Name" });
  const emailInput = screen.getByRole("textbox", { name: "Email Address" });
  const passwordInput = screen.getByLabelText("Password");
  const confirmPasswordInput = screen.getByText("Confirm Password");

  await userEvent.click(firstNameInput);
  await userEvent.click(lastNameInput);
  await userEvent.click(emailInput);
  await userEvent.click(passwordInput);
  await userEvent.click(confirmPasswordInput);
  await userEvent.click(document.body);

  const errorMessage = await screen.findAllByText("Required");
  expect(errorMessage).toHaveLength(5);
});

it("should render error when email is not valid", async () => {
  render(<SignUp />);
  const emailInput = screen.getByRole("textbox", { name: "Email Address" });
  await userEvent.clear(emailInput);
  await userEvent.type(emailInput, "123gmail.com");
  await userEvent.click(document.body);

  const InputWithoutAt = await screen.findByText("Invalid email address");
  expect(InputWithoutAt).toBeInTheDocument();

  await userEvent.clear(emailInput);
  await userEvent.type(emailInput, "123@gmailcom");
  await userEvent.click(document.body);

  const InputWithoutDot = await screen.findByText("Invalid email address");
  expect(InputWithoutDot).toBeInTheDocument();
});

it("should render error when input password error", async () => {
  render(<SignUp />);
  const passwordInput = screen.getByLabelText("Password");
  const confirmPasswordInput = screen.getByLabelText("Confirm Password");
  await userEvent.clear(passwordInput);
  await userEvent.type(passwordInput, "12345678");

  await userEvent.clear(confirmPasswordInput);
  await userEvent.type(confirmPasswordInput, "1234567");
  await userEvent.click(document.body);

  const passwordMustMatch = await screen.findByText("Passwords must match");
  expect(passwordMustMatch).toBeInTheDocument();

  await userEvent.clear(passwordInput);
  await userEvent.type(passwordInput, "1234567");
  await userEvent.click(document.body);

  const atLeast8Character = await screen.findByText(
    "Must be at least 8 characters"
  );
  expect(atLeast8Character).toBeInTheDocument();
});
