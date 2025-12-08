import type { Metadata } from "next";

import { ThemeProvider } from "@/lib/context/ThemeContext";
import Header from "@/components/Header";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Weather Forecast",
  description: "",
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
          <Header />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
