import type { Metadata } from "next";

import { ThemeProvider } from "@/lib/context/ThemeContext";
import { CitiesProvider } from "@/lib/context/CitiesContext";
import Header from "@/components/Header";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Weather Forecast",
  description: "SPA that shows the weather in selected cities",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <CitiesProvider>
            <Header />
            <main>{children}</main>
          </CitiesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
