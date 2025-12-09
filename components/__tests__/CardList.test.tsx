import { render, screen, fireEvent } from "@testing-library/react";
import CardList from "../CardList";
import { useCities } from "@/lib/context/CitiesContext";

// mock the hook from context
jest.mock("@/lib/context/CitiesContext", () => ({
  useCities: jest.fn(),
}));

// mock Card so we don't depend on its internal fetch etc.
jest.mock("../Card", () => {
  return function MockCard(props: { cityName: string; onRemove: () => void }) {
    const { cityName, onRemove } = props;
    return (
      <div data-testid={`card-${cityName}`} onClick={onRemove}>
        Mock Card {cityName}
      </div>
    );
  };
});

const mockedUseCities = useCities as jest.MockedFunction<typeof useCities>;

describe("CardList", () => {
  it("renders empty state message when there are no cities", () => {
    mockedUseCities.mockReturnValue({
      cities: [],
      addCity: jest.fn(),
      removeCity: jest.fn(),
    });

    render(<CardList />);

    expect(
      screen.getByText(
        /Nothing to show yet\. Search for a city to get its weather\./i
      )
    ).toBeInTheDocument();
  });

  it("renders a list of cards for each city and calls removeCity for that city", () => {
    const removeCity = jest.fn();

    mockedUseCities.mockReturnValue({
      cities: ["Kyiv", "Paris"],
      addCity: jest.fn(),
      removeCity,
    });

    render(<CardList />);

    expect(screen.getByTestId("card-Kyiv")).toBeInTheDocument();
    expect(screen.getByTestId("card-Paris")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("card-Kyiv"));

    expect(removeCity).toHaveBeenCalledTimes(1);
    expect(removeCity).toHaveBeenCalledWith("Kyiv");
  });
});
