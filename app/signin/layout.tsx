import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Box from "@mui/material/Box";
import Footer from "../components/footer";

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
      <body className={inter.className}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          {children}
          <Box
            component="footer"
            sx={{
              py: 3,
              px: 2,
              mt: "auto",
            }}
          >
            <Footer />
          </Box>
        </Box>
      </body>
    </html>
  );
}
