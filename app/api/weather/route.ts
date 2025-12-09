import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { WEATHER_API } from "@/lib/constants";

export async function GET(request: NextRequest) {
  const apiKey = process.env.WEATHER_API_KEY;
  const { searchParams } = new URL(request.url);
  const cityName = searchParams.get("cityName");

  if (!apiKey)
    return NextResponse.json(
      { error: "API key not cofigured" },
      { status: 500 }
    );

  const response = await fetch(
    `${WEATHER_API}?q=${cityName}&appid=${apiKey}&units=metric`
  );

  if (!response.ok) {
    if (response.status === 404) {
      return NextResponse.json({ error: "City not found" }, { status: 404 });
    }
    return NextResponse.json(
      { error: "Some error" },
      { status: response.status }
    );
  }

  const weather = await response.json();

  return NextResponse.json(weather);
}
