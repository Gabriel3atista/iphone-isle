import "./globals.css";
import localFont from "next/font/local"
import { clsx } from "clsx";

const sfpro = localFont({ 
  src: "../../public/assets/SF-Pro.ttf",
  variable: "--font-sfpro",
  weight: "400 700"
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={
        clsx('bg-slate-50 text-gray-500 antialiased', sfpro.className)
      }>{children}</body>
    </html>
  );
}
