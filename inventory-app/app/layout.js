'use client';
import { metadata } from "./metadata";
import { Inter } from "next/font/google";
import { Container } from "@mui/material";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className={inter.className}>
          <Container>
            {children}
          </Container>
      </body>
    </html>
  );
}
