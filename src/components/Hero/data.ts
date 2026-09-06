export interface Stat {
    value: string;
    label: string[];
}

export const HERO = {
    greeting: "welcome visitor",
    lead: "I’m",
    name: "Ahmed M. Zanaty",
    tagline: "Can Transform Your Digital Presence.",
    description: "Software engineer with 8+ years of experience building systems that solve complex problems.",
    picture: "/media/my-picture.png",
};

export const STATS: Stat[] = [
    { value: "8+", label: ["Years Of", "Experience"] },
    { value: "20+", label: ["Projects", "Shipped"] },
    { value: "2+", label: ["Live", "SaaS"] },
    { value: "25+", label: ["Happy", "Clients"] },
];
