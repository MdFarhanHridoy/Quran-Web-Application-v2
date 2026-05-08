import type { Metadata } from "next";
import "./globals.css";
import { SettingsProvider } from "@/context/SettingsContext";
import SettingsSidebarWrapper from "@/components/SettingsSidebarWrapper";

export const metadata: Metadata = {
  title: "Quran Web Application",
  description: "Read the Holy Quran with Arabic text and English translation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Scheherazade+New:wght@400&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col">
        <SettingsProvider>
          <SettingsSidebarWrapper />
          <main className="flex-1">
            {children}
          </main>
        </SettingsProvider>
      </body>
    </html>
  );
}
