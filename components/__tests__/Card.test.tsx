import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Card from "../Card";
import { Weather } from "../Card";

// mock router
const push = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
}));

// mock next/image
jest.mock("next/image", () => {
  function MockNextImage(props: any) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={props.alt} {...props} />;
  }

  return MockNextImage;
});

// mock UpdateButton
jest.mock("../UpdateButton", () => {
  return function MockUpdateButton(props: {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  }) {
    return (
      <button data-testid="update-btn" onClick={props.onClick}>
        Update
      </button>
    );
  };
});

// mock formatters
jest.mock("@/lib/formatters", () => ({
  formatDate: () => "Mon Jan 01",
  formatTime: () => "10:00",
}));

const mockWeather = {
  name: "Kyiv",
  main: {
    temp: 21.5,
    humidity: 60,
    feels_like: 20.2,
    pressure: 1012,
  },
  weather: [{ main: "Clear", icon: "01d" }],
  wind: { speed: 5 },
  sys: {
    sunrise: 1700000000,
    sunset: 1700040000,
  },
  timezone: 7200,
  dt: 1700020000,
} as Weather;

describe("Card", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // mock fetch for each test
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => mockWeather,
    } as any);
  });

  it("fetches and renders weather data", async () => {
    render(<Card cityName="Kyiv" variant="summary" />);

    await waitFor(() => expect(screen.getByText("Kyiv")).toBeInTheDocument());

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      `/api/weather?cityName=${encodeURIComponent("Kyiv")}`
    );

    expect(screen.getByText("Clear")).toBeInTheDocument();
    expect(screen.getByText(/Humidity:/i)).toBeInTheDocument();
  });

  it("navigates to city page when the summary card is clicked", async () => {
    const { container } = render(<Card cityName="Kyiv" variant="summary" />);

    await waitFor(() => expect(screen.getByText("Kyiv")).toBeInTheDocument());

    const card = container.querySelector(".card.summary-card") as HTMLElement;
    fireEvent.click(card);

    expect(push).toHaveBeenCalledTimes(1);
    expect(push).toHaveBeenCalledWith("/city/Kyiv");
  });

  it("clicking UpdateButton reloads weather for this card only and does not navigate", async () => {
    render(<Card cityName="Kyiv" variant="summary" />);

    await waitFor(() => expect(screen.getByText("Kyiv")).toBeInTheDocument());

    const updateBtn = screen.getByTestId("update-btn");
    const fetchMock = global.fetch as jest.Mock;

    fetchMock.mockClear();
    push.mockClear();

    fireEvent.click(updateBtn);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      `/api/weather?cityName=${encodeURIComponent("Kyiv")}`
    );
    expect(push).not.toHaveBeenCalled();
  });
});
