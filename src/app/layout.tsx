import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";

import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { MainNav } from "@/components/admin/main-nav";

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
            <html>
                <body className={`${inter.className} antialiased`}>
                    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                        <div className="container mx-auto flex h-14 items-center">
                            <MainNav />
                            <SignedIn>
                                <div className="ml-auto flex items-center space-x-4">
                                    <UserButton />
                                </div>
                            </SignedIn>
                            <SignedOut>
                                <div className="ml-auto flex items-center space-x-4">
                                    <SignInButton mode="modal" />
                                </div>
                            </SignedOut>
                        </div>
                    </header>
                    <main className="flex-1">{children}</main>
                </body>
            </html>
        </ClerkProvider>
    );
}
