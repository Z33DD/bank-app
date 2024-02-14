import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Box from "@mui/material/Box";
import Footer from "./components/footer";
import NavBar from "./components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Scalis Challenge",
  description: "A simple finance application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body id="main-body">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <NavBar />
          <main>{children}</main>
          <Footer />
        </Box>
      </body>
    </html>
  );
}
