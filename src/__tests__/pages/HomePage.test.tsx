import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import HomePage from "../../pages/HomePage";

describe("HomePage", () => {
  it("renders HomePage with correct text", () => {
    render(<HomePage />);

    const heading = screen.getByText(/Home Page/i);
    expect(heading).toBeInTheDocument();

    expect(heading).toHaveClass(
      "text-ellipsis text-3xl font-bold text-red-800"
    );
  });
});
