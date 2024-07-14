import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portfolio Rizaldy",
  description: "Portfolio pribadi modern dan minimalis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="z-[-10] bg-slate-950 fixed inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#034a4391,transparent)]" />
          <div className="h-[100vh] w-full top-0 dark:bg-dot-white/[0.2] bg-dot-black/[0.2] absolute flex items-center justify-center">
            <div className="absolute pointer-events-none  inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
          </div>
          <div className="flex justify-center relative my-20 z-10">
            <div className="max-w-[90vw] md:max-w-2xl lg:max-w-[70vw] flex flex-col items-center justify-center">
              {children}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
