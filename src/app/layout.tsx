import AOSWrapper from "@/components/AOSWrapper";
import GoToTop from "@/components/GoToTop";
import constants from "@/config/constants";
import comfortaa from "@/config/fonts";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
    metadataBase: new URL(constants.siteUrl),
    title: `${constants.name} — ${constants.role}`,
    description: "Software engineer with 8+ years of experience building systems that solve complex problems.",
    keywords: [
        "ahmed m. zanaty",
        "ahmed zanaty",
        "zanaty",
        "ahmdmznaty",
        "software engineer",
        "full-stack developer",
        "web developer",
        "backend developer",
        "mobile developer",
        "nextjs developer",
        "react developer",
        "react native developer",
        "nodejs developer",
        "portfolio",
    ],
    authors: [{ name: constants.name, url: constants.siteUrl }],
    openGraph: {
        title: `${constants.name} — ${constants.role}`,
        description: "Can transform your digital presence.",
        type: "website",
        siteName: constants.name,
        url: constants.siteUrl,
    },
    twitter: {
        card: "summary_large_image",
        title: `${constants.name} — ${constants.role}`,
        description: "Can transform your digital presence.",
    },
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en" className={comfortaa.variable}>
            <head>
                <link rel="icon" href="/page-icon.svg" />
            </head>
            <body>
                {children}
                <GoToTop />
                <AOSWrapper />
            </body>
        </html>
    );
}
