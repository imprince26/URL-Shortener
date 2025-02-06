/* eslint-disable @next/next/no-page-custom-font */
import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import Provider from "@/components/provider";

export const metadata: Metadata = {
  title: "URL Shortener - Modern Link Management",
  description: "Professional URL shortening service with advanced analytics",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="shortcut icon" href="favicon.png" type="image/x-icon" />
      </head>
      <body className="min-h-screen bg-gradient-to-b from-background to-background/95 antialiased font-inter">
        <Provider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
          >
            <div className="relative flex min-h-screen flex-col">
              <Navbar />

              <main className="flex-1">{children}</main>
            </div>
            <Toaster />
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
