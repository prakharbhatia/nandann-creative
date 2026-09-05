import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Outpost · Your publishing workspace",
  description:
    "Draft, schedule, and publish to LinkedIn and X from one private workspace.",
};
export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
