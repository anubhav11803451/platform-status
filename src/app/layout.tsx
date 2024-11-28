import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";

import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Platform Status",
    description: "A platform to track the status of your favorite services",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={`${inter.className} antialiased`}>
                    <header>
                        <SignedOut>
                            <SignInButton mode="modal" />
                        </SignedOut>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </header>
                    {children}
                </body>
            </html>
        </ClerkProvider>
    );
}
