export interface Job {
    id: string;
    letter: string;
    company: string;
    context: string;
    role: string;
    period: string;
    location: string;
    tags: string[];
    highlights: string[];
}

/*
 * NOTE — only the BrewBotics entry's tags + highlights come from the Figma design;
 * every other card is collapsed there, so its `tags` and `highlights` below are
 * placeholders written from the role and context. Replace them with the real ones.
 */
export const JOBS: Job[] = [
    {
        id: "brewbotics",
        letter: "B",
        company: "BrewBotics",
        context: "Saudi Food-Tech Leading Startup",
        role: "Chief Technology Officer",
        period: "Oct 2025 — Jul 2026",
        location: "Riyadh, Saudi Arabia",
        tags: ["Full Time", "Remotely"],
        highlights: [
            "Built the infrastructure of all tech parts.",
            "Built a store-aggregator SaaS MVP with menus, orders, and payments.",
            "Connected vending machines' API to our systems for inventory tracking.",
        ],
    },
    {
        id: "mofasal",
        letter: "M",
        company: "Mofasal",
        context: "Quranic Plans App",
        role: "Full-Stack & Mobile Developer",
        period: "Nov 2024 — Dec 2025",
        location: "Riyadh, Saudi Arabia",
        tags: ["Full Time", "Remotely"],
        highlights: [
            "Built the memorization plans engine with daily tasks and progress analysis.",
            "Shipped the cross-platform mobile app for both iOS and Android.",
            "Added group management so teachers can track their students.",
        ],
    },
    {
        id: "tokenai",
        letter: "T",
        company: "TokenAI",
        context: "AI E-Learning Platform",
        role: "Architect & Tech Leader",
        period: "Jun 2025 — Sep 2025",
        location: "Riyadh, Saudi Arabia",
        tags: ["Part Time", "Remotely"],
        highlights: [
            "Designed the platform architecture for courses, exams, and discussions.",
            "Set up secure video streaming with signed access.",
            "Integrated the full payment flow end to end.",
        ],
    },
    {
        id: "thiraa",
        letter: "T",
        company: "Thiraa",
        context: "Real Estate Marketing",
        role: "Full-Stack Developer",
        period: "Apr 2023 — May 2025",
        location: "Riyadh, Saudi Arabia",
        tags: ["Full Time", "Remotely"],
        highlights: [
            "Built an SEO-first property store editable by marketing without code.",
            "Built multi-tenant dashboards for developers to publish their units.",
            "Handled reservations and catalog control.",
        ],
    },
    {
        id: "sitdown",
        letter: "S",
        company: "Sitdown",
        context: "English Meetings App",
        role: "Backend Developer",
        period: "Feb 2024 — Oct 2024",
        location: "Riyadh, Saudi Arabia",
        tags: ["Part Time", "Remotely"],
        highlights: [
            "Designed the APIs and database schema for meeting scheduling.",
            "Built auth, permissions, and logging.",
            "Optimized queries and caching for the matching flow.",
        ],
    },
    {
        id: "bytix",
        letter: "B",
        company: "Bytix",
        context: "Tech Academy",
        role: "Founder & CTO",
        period: "Sep 2023 — Sep 2024",
        location: "Menofia, Egypt",
        tags: ["Full Time", "On Site"],
        highlights: [
            "Founded the academy and led all technical decisions.",
            "Built the learning platform used to run the courses.",
            "Mentored the instructor team and designed the curriculum.",
        ],
    },
    {
        id: "3c-leader",
        letter: "3",
        company: "3C",
        context: "Children Coding School",
        role: "Web Team Leader",
        period: "Jan 2022 — Apr 2023",
        location: "Beheira, Egypt",
        tags: ["Part Time", "On Site"],
        highlights: [
            "Led the web team and reviewed their delivery.",
            "Set the curriculum and teaching standards for the web track.",
            "Trained new instructors before they took their own groups.",
        ],
    },
    {
        id: "3c-instructor",
        letter: "3",
        company: "3C",
        context: "Children Coding School",
        role: "Web Instructor",
        period: "Mar 2021 — Jan 2022",
        location: "Beheira, Egypt",
        tags: ["Full Time", "On Site"],
        highlights: [
            "Taught HTML, CSS, and JavaScript to young beginners.",
            "Built teaching material and practical projects for the track.",
            "Followed each student's progress through the full year.",
        ],
    },
    {
        id: "ultras-fci",
        letter: "U",
        company: "Ultras FCI",
        context: "Student Activity",
        role: "Web Designer",
        period: "Feb 2018 — Jan 2021",
        location: "Cairo, Egypt",
        tags: ["Volunteer", "On Site"],
        highlights: [
            "Designed and built the activity's web presence.",
            "Produced the visual identity used across their material.",
            "Kept the site running through three student cycles.",
        ],
    },
];

export const EXPERIENCE_HEAD = {
    title: "My Work Journey Everywhere",
    subtitle: "Work Experience",
    note: "We can draw your line to complete the journey",
    cta: "Hire Me",
};
