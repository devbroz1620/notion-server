import "./globals.css";

export const metadata = {
  title: "Notion API Server",
  description: "API server for Notion content",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
