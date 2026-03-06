import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alan Cifuentes | Senior Full Stack Developer — Node.js, TypeScript, React, AI-Assisted",
  description: "Senior Full Stack Engineer with 6+ years building production-grade systems. Expert in Node.js, TypeScript, React/Next.js, PostgreSQL, AWS. 3+ years daily AI-assisted development (Claude Code, GitHub Copilot). Open to remote opportunities with US/European companies.",
  keywords: [
    "Senior Full Stack Developer",
    "Node.js TypeScript React",
    "AI-assisted development",
    "Remote developer",
    "Next.js PostgreSQL AWS",
    "Claude Code GitHub Copilot",
    "Guatemala developer",
    "Full Stack Engineer remote",
  ],
  authors: [{ name: "Alan Cifuentes", url: "https://acifuentes.vercel.app" }],
  openGraph: {
    type: "website",
    url: "https://acifuentes.vercel.app",
    title: "Alan Cifuentes | Senior Full Stack Developer — AI-Assisted Development",
    description: "Senior Full Stack Engineer delivering production-grade systems 3-4x faster with AI-assisted workflows. Node.js · TypeScript · React · Next.js · PostgreSQL · AWS. Open to remote roles.",
    siteName: "Alan Cifuentes Portfolio",
    images: [
      {
        url: "https://acifuentes.vercel.app/logo.png",
        width: 400,
        height: 400,
        alt: "Alan Cifuentes — Senior Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alan Cifuentes | Senior Full Stack Developer",
    description: "Delivering production-grade systems 3-4x faster with AI-assisted workflows. Node.js · TypeScript · React · AWS. Open to remote roles.",
    images: ["https://acifuentes.vercel.app/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
