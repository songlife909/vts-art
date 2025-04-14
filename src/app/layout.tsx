import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { LanguageProvider } from "@/contexts/LanguageContext";
import LanguageToggle from "@/components/LanguageToggle";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VTS Group Lessons",
  description: "Visual Thinking Strategy (VTS) Group Lessons for children's language development",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full font-montserrat antialiased`}>
        <LanguageProvider>
          <Providers>
            <div className="fixed inset-0 -z-10">
              <div className="absolute inset-0 bg-gradient-to-br from-white via-primary-50/50 to-secondary-50/50 backdrop-blur-sm" />
              <div className="absolute inset-0 bg-[url('/images/backgrounds/pattern.svg')] opacity-[0.03]" />
            </div>
            <div className="fixed top-4 right-4 z-50">
              <LanguageToggle />
            </div>
            <main className="min-h-screen">{children}</main>
          </Providers>
        </LanguageProvider>
      </body>
    </html>
  );
}
