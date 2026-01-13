import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Questify | Quiz Builder",
  description: "Create and manage your quizzes easily",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased min-h-screen bg-zinc-50 dark:bg-zinc-950`}>
        <Navbar />
        <main className="container mx-auto px-4 py-8 sm:px-6">
          {children}
        </main>
      </body>
    </html>
  );
}
