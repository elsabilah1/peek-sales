import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import DateFilter from "@/components/date-filter";

const rubik = Rubik({ subsets: ["latin"], preload: false });

export const metadata: Metadata = {
  title: "Peek Sales",
  description: "description about the app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("container max-w-[1000px]", rubik.className)}>
        <header className="flex flex-col justify-between gap-3 py-5 sm:flex-row sm:items-center">
          <h1 className="text-lg text-primary font-bold tracking-tighter">
            PEEK SALES
          </h1>
          <DateFilter />
        </header>

        {children}
      </body>
    </html>
  );
}
