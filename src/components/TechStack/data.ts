export interface StackGroup {
    no: string;
    title: string;
    items: string[];
    /** the last group spans the full row on every layout */
    wide?: boolean;
}

export const STACK: StackGroup[] = [
    { no: "01", title: "Foundations", items: ["Algorithmic Thinking", "Programming Logic", "Design Patterns", "Clean Syntax"] },
    { no: "02", title: "Core", items: ["HTML/CSS", "JS/TS", "RESTful APIs", "Payments"] },
    { no: "03", title: "Frontend", items: ["ReactJS", "NextJS", "Maps"] },
    { no: "04", title: "Backend", items: ["NodeJS", "ExpressJS", "GraphQL", "Auth & Security"] },
    { no: "05", title: "Databases", items: ["MongoDB & Mongoose", "PostgreSQL & Drizzle ORM"] },
    { no: "06", title: "Mobile", items: ["React Native", "Expo"] },
    { no: "07", title: "Tools & Workflow", items: ["Postman", "VS Code", "Notion", "AI Tools", "Figma", "MS Office", "Adobe Apps"], wide: true },
];

export const STACK_HEAD = {
    title: "Tech Stack",
    subtitle: "Technologies, patterns, and tools I master",
    note: "Open to new technologies",
    cta: "Ask What You Want",
};
