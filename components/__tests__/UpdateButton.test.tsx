import { render, screen, fireEvent } from "@testing-library/react";
import UpdateButton from "../UpdateButton";

describe("UpdateButton", () => {
  it("renders with text 'Update'", () => {
    const handleClick = jest.fn();

    render(<UpdateButton onClick={handleClick} />);

    expect(screen.getByRole("button", { name: /update/i })).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();

    render(<UpdateButton onClick={handleClick} />);

    const button = screen.getByRole("button", { name: /update/i });

    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("has btn class", () => {
    const handleClick = jest.fn();

    render(<UpdateButton onClick={handleClick} />);

    const button = screen.getByRole("button", { name: /update/i });

    expect(button).toHaveClass("btn");
  });
});
