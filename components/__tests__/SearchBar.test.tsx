import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../SearchBar";

// mock SearchIcon
jest.mock("../SearchIcon", () => {
  return function MockSearchIcon(props: {
    className?: string;
    onClick?: () => void;
    role?: string;
    "aria-label"?: string;
  }) {
    const { onClick, ...rest } = props;
    return (
      <button
        data-testid="search-icon"
        type="button"
        onClick={onClick}
        {...rest}
      >
        🔍
      </button>
    );
  };
});

describe("SearchBar", () => {
  it("renders input with the given value", () => {
    const handleChange = jest.fn();

    render(<SearchBar value="Kyiv" onChange={handleChange} />);

    const input = screen.getByPlaceholderText(
      /city name.../i
    ) as HTMLInputElement;

    expect(input).toBeInTheDocument();
    expect(input.value).toBe("Kyiv");
  });

  it("focuses the input when SearchIcon is clicked", () => {
    const handleChange = jest.fn();

    render(<SearchBar value="" onChange={handleChange} />);

    const input = screen.getByPlaceholderText(
      /city name.../i
    ) as HTMLInputElement;
    const iconButton = screen.getByTestId("search-icon");

    expect(document.activeElement).not.toBe(input);

    fireEvent.click(iconButton);

    expect(document.activeElement).toBe(input);
  });
});
