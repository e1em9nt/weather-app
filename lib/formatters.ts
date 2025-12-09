export function formatCityName(name: string) {
  return name.at(0)?.toUpperCase() + name.slice(1, name.length);
}

export function formatDate(unixSeconds: number, timezoneOffsetSeconds: number) {
  return new Date((unixSeconds + timezoneOffsetSeconds) * 1000)
    .toDateString()
    .split(" ")
    .splice(0, 3)
    .join(" ");
}

export function formatTime(unixSeconds: number, timezoneOffsetSeconds: number) {
  const cityDate = new Date((unixSeconds + timezoneOffsetSeconds) * 1000);
  return new Intl.DateTimeFormat(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC", // we've already shifted, so lock to UTC
  }).format(cityDate);
}
