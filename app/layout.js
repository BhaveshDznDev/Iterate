import "./globals.css";

export const metadata = {
  title: "Iterate — PM Growth Platform",
  description:
    "AI coaching, structured skill tracking, and a community of product managers — built for the day-to-day reality of the job.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body>{children}</body>
    </html>
  );
}
