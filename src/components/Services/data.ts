export interface Service {
    icon: string;
    title: string;
    subtitle: string;
    features: string[];
}

export const FEATURE_ICON = "/media/service-feature.png";

export const SERVICES: Service[] = [
    {
        icon: "/media/backend-service.png",
        title: "Secure Server Apps",
        subtitle: "I build secure, scalable, stable, and documented server apps.",
        features: ["Design secure APIs & DB schemas", "Optimize queries, caching & indexes", "Set up auth, permissions & logging"],
    },
    {
        icon: "/media/web-service.png",
        title: "Strong Web Apps",
        subtitle: "I ship responsive, dynamic, and installable web apps.",
        features: ["Build responsive UIs from Figma files", "Improve load times & Core Web Vitals", "Ship installable, offline-ready PWAs"],
    },
    {
        icon: "/media/mobile-service.png",
        title: "Great Mobile Apps",
        subtitle: "I design cross-platform, dynamic, and scalable mobile apps.",
        features: ["Build apps for both iOS & Android", "Wire up push, camera & location APIs", "Handle offline sync & store releases"],
    },
];

export const SERVICES_HEAD = {
    title: "What Can I Do?",
    subtitle: "Where I've spent most of the last 8 years",
    note: "And much more...",
    cta: "Contact Me Now",
};
