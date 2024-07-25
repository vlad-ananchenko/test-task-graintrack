import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import SignInForm from "../../../../features/forms/components/SignInForm";
import useSignInForm from "../../../../features/forms/hooks/useSignInForm";

vi.mock("../../../../features/forms/hooks/useSignInForm");

const mockUseSignInForm = useSignInForm as jest.MockedFunction<
  typeof useSignInForm
>;

describe("SignInForm", () => {
  beforeEach(() => {
    mockUseSignInForm.mockReturnValue({
      email: "",
      password: "",
      handleEmailChange: vi.fn(),
      handlePasswordChange: vi.fn(),
      handleSubmit: vi.fn((e) => e.preventDefault()),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render form fields and submit button", () => {
    render(<SignInForm />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign in/i })
    ).toBeInTheDocument();
  });

  it("should call handleEmailChange when email input changes", () => {
    render(<SignInForm />);

    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    expect(mockUseSignInForm().handleEmailChange).toHaveBeenCalled();
  });

  it("should call handlePasswordChange when password input changes", () => {
    render(<SignInForm />);

    const passwordInput = screen.getByLabelText(/password/i);
    fireEvent.change(passwordInput, { target: { value: "password" } });

    expect(mockUseSignInForm().handlePasswordChange).toHaveBeenCalled();
  });

  it("should call handleSubmit when form is submitted", () => {
    render(<SignInForm />);

    const form = document.querySelector(".form-root");
    fireEvent.submit(form!);

    expect(mockUseSignInForm().handleSubmit).toHaveBeenCalled();
  });
});
