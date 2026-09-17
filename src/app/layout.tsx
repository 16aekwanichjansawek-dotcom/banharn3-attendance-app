import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ระบบเช็คชื่อ - รร.บรรหารแจ่มใสวิทยา 3",
  description: "Web App เช็คชื่อนักเรียน โรงเรียนบรรหารแจ่มใสวิทยา 3",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className="antialiased">{children}</body>
    </html>
  );
}