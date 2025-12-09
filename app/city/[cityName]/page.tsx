import Card from "@/components/Card";
import { formatCityName } from "@/lib/formatters";

export default async function CityWeather({
  params,
}: {
  params: Promise<{ cityName: string }>;
}) {
  const { cityName } = await params;

  return <Card cityName={formatCityName(cityName)} variant="detailed" />;
}
