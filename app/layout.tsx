import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from './providers';
import TechMatrixBg from "./components/ui/techmatrix";
import ScrollProgress from "./components/ui/scrollProgress";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Filip Smojver | Software Developer",
  description: "Explore my portfolio showcasing full-stack applications, technical projects, and past software development experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${jetbrainsMono.variable} h-full antialiased scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans">
        <ScrollProgress />
        <Providers>
          <div className="fixed inset-0 -z-1 pointer-events-none hidden sm:block">
            <TechMatrixBg />
          </div>{children}
        </Providers>
      </body>
    </html>
  );
}