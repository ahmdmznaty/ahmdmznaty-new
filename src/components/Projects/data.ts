export interface ProjectMedia {
    /** path under /public */
    src: string;
    /**
     * Intrinsic pixel size of the file. Required, and generated rather than typed by hand.
     *
     * It is what lets the viewer know a shot is long enough to auto-scroll WITHOUT first
     * downloading and decoding it — so only the shot on screen is ever fetched. It also
     * reserves the right box up front, so nothing shifts as images arrive.
     */
    width: number;
    height: number;
    /** caption shown under the viewer */
    label: string;
    /** hint only — used to pick a frame background */
    kind?: "web" | "mobile" | "print";
}

export interface Project {
    /** drives the `?project=` query — keep it url-safe and stable */
    slug: string;
    name: string;
    logo: string;

    /* ---- shown on the card ---- */
    tagline: string;
    description: string;

    /* ---- shown in the popup ---- */
    sector: string;
    summary: string;
    year: string;
    role: string;
    status: "Live" | "In Development" | "Delivered" | "Internal";
    /** display text, e.g. "menuket.com" — leave empty to hide the link */
    domain?: string;
    /** full href for the domain; only used when `domain` is set */
    url?: string;
    /** technologies — rendered as chips */
    stack: string[];
    /** short bullets describing what was built */
    highlights: string[];
    /** screenshots, in display order */
    media: ProjectMedia[];
}

/*
 * NOTE — the `summary`, `role`, `year`, `stack` and `highlights` below are drafts written
 * from the screenshots and from the tech stack section. Verify them before launch.
 * `domain`/`url` are intentionally left blank rather than guessed — fill them in and the
 * popup will show a live link automatically.
 */
export const PROJECTS: Project[] = [
    {
        slug: "menuket",
        name: "Menuket",
        logo: "/projects/menuket-logo.svg",
        tagline: "Online-Menu & Ordering SaaS",
        description: "QR menu platform for stores, publish & control their menus, receive orders, and still building features.",
        sector: "SaaS · Digital Menus",
        summary:
            "A multi-tenant QR menu platform. Stores publish a scannable menu, toggle items and prices live, and run several branches from one dashboard — no app download for the customer, and updates land in seconds.",
        year: "2024 — Present",
        role: "Founder & Full-Stack Developer",
        status: "Live",
        stack: ["NextJS", "NodeJS", "ExpressJS", "MongoDB", "Mongoose", "JWT Auth", "PWA"],
        highlights: [
            "Multi-tenant architecture with per-branch pricing and availability.",
            "Live menu editing that reflects on the customer QR page instantly.",
            "Light and dark customer themes driven by the store's own branding.",
            "Role-based dashboard for owners, managers and staff.",
        ],
        media: [
            { src: "/projects/menuket/menuket-1.webp", width: 1013, height: 4200, label: "Website — Full Page", kind: "web" },
            { src: "/projects/menuket/menuket-2.webp", width: 1280, height: 832, label: "Customer Menu — Light & Dark", kind: "mobile" },
            { src: "/projects/menuket/menuket-3.webp", width: 1200, height: 750, label: "Dashboard — Menu Items", kind: "web" },
            { src: "/projects/menuket/menuket-4.webp", width: 1200, height: 750, label: "Dashboard — Branches", kind: "web" },
        ],
    },
    {
        slug: "brewapp",
        name: "BrewApp",
        logo: "/projects/brewapp-logo.svg",
        tagline: "Store Aggregator & Loyalty SaaS",
        description: "Loyalty & ordering ecosystem, points, wallet, and challenges for customers, control for stores, and more.",
        sector: "FoodTech · Loyalty & Ordering",
        summary:
            "A store-aggregator ecosystem for the BrewBotics group: customers browse nearby stores, order, collect points and spend from an in-app wallet, while each store controls its own catalogue, branches and offers from a shared dashboard.",
        year: "2025 — 2026",
        role: "Chief Technology Officer",
        status: "In Development",
        stack: ["React Native", "Expo", "NextJS", "NodeJS", "GraphQL", "MongoDB", "Maps", "Payments"],
        highlights: [
            "Cross-platform customer app for both iOS and Android.",
            "Points, wallet and challenges engine with a full transaction ledger.",
            "Store discovery on a live map with branch-level detail.",
            "Vending machine API wired into the same inventory system.",
        ],
        media: [
            { src: "/projects/brewapp/brewapp-1.webp", width: 1200, height: 750, label: "Customer App — Home & Profile", kind: "mobile" },
            { src: "/projects/brewapp/brewapp-2.webp", width: 1200, height: 750, label: "Customer App — Store Map & Menu", kind: "mobile" },
            { src: "/projects/brewapp/brewapp-3.webp", width: 1200, height: 750, label: "Customer App — Store Page & Loyalty", kind: "mobile" },
            { src: "/projects/brewapp/brewapp-4.webp", width: 1200, height: 750, label: "Customer App — Wallet & Transactions", kind: "mobile" },
            { src: "/projects/brewapp/brewapp-5.webp", width: 1200, height: 750, label: "Dashboard — Add Branch", kind: "web" },
            { src: "/projects/brewapp/brewapp-6.webp", width: 1200, height: 750, label: "Dashboard — Products & Categories", kind: "web" },
            { src: "/projects/brewapp/brewzy-site.webp", width: 1195, height: 4200, label: "Brewzy — Website", kind: "web" },
            { src: "/projects/brewapp/brewbotics-site.webp", width: 1066, height: 4200, label: "BrewBotics — Corporate Website", kind: "web" },
            { src: "/projects/brewapp/brewzy-menu.webp", width: 1280, height: 832, label: "Brewzy — Online Menu", kind: "web" },
            { src: "/projects/brewapp/brewzy-old.webp", width: 1280, height: 2846, label: "Brewzy — Old Version", kind: "web" },
        ],
    },
    {
        slug: "mofasal",
        name: "Mofasal",
        logo: "/projects/mofasal-logo.svg",
        tagline: "Quranic Tracking Platform",
        description: "Quran memorization and learning app with daily plans, task tracking, analysis, and group management.",
        sector: "Education · Mobile",
        summary:
            "A memorization companion that turns a long-term Quran plan into daily tasks. Students track what they memorised and revised, see their progress broken down by surah and week, and teachers follow whole groups from one place.",
        year: "2024 — 2025",
        role: "Full-Stack & Mobile Developer",
        status: "Live",
        stack: ["React Native", "Expo", "NodeJS", "ExpressJS", "MongoDB", "Push Notifications"],
        highlights: [
            "Plan engine that splits a memorization goal into daily tasks.",
            "Progress analysis with per-surah and per-period breakdowns.",
            "Group management so teachers can follow their students.",
            "Printable progress reports for offline follow-up.",
        ],
        media: [
            { src: "/projects/mofasal/mofasal-landing.webp", width: 810, height: 4200, label: "Landing Page", kind: "web" },
            { src: "/projects/mofasal/mofasal-1.webp", width: 1440, height: 900, label: "Mobile App — Daily Plan & Progress", kind: "mobile" },
            { src: "/projects/mofasal/mofasal-2.webp", width: 1440, height: 900, label: "Mobile App — Plan Setup & Tracking", kind: "mobile" },
            { src: "/projects/mofasal/mofasal-3.webp", width: 1440, height: 900, label: "Mobile App — Notifications & Profile", kind: "mobile" },
            { src: "/projects/mofasal/mofasal-4.webp", width: 1440, height: 900, label: "Printable Progress Report", kind: "print" },
        ],
    },
    {
        slug: "offplan",
        name: "OffPlan",
        logo: "/projects/offplan-logo.svg",
        tagline: "Off-Plan Property Store",
        description: "SEO-first store for off-plan property, fully editable by marketing without touching code.",
        sector: "Real Estate · Website",
        summary:
            "An SEO-first storefront for off-plan property in Saudi Arabia. Buyers browse by region, filter on an interactive map, and open a unit to see its specs and payment plan — while marketing edits every page without touching code.",
        year: "2023 — 2025",
        role: "Full-Stack Developer",
        status: "Live",
        stack: ["NextJS", "SSR & SEO", "NodeJS", "PostgreSQL", "Drizzle ORM", "Maps"],
        highlights: [
            "Server-rendered pages built for search visibility from the start.",
            "Interactive map search with region and project clustering.",
            "Deep filtering across developer, unit type, area and price.",
            "Unit pages with full specs, payment plan and developer profile.",
        ],
        media: [
            { src: "/projects/offplan/offplan-home.webp", width: 1440, height: 7568, label: "Home — Full Page", kind: "web" },
            { src: "/projects/offplan/offplan-projects.webp", width: 1440, height: 3858, label: "Projects Page", kind: "web" },
            { src: "/projects/offplan/offplan-unit.webp", width: 1440, height: 4335, label: "Unit Page", kind: "web" },
            { src: "/projects/offplan/offplan-developer.webp", width: 1440, height: 3037, label: "Developer Page", kind: "web" },
            { src: "/projects/offplan/offplan-map.webp", width: 1440, height: 900, label: "Interactive Map", kind: "web" },
            { src: "/projects/offplan/offplan-map-filters.webp", width: 1440, height: 900, label: "Map Filters", kind: "web" },
            { src: "/projects/offplan/offplan-contacts.webp", width: 1440, height: 2112, label: "Contact Page", kind: "web" },
        ],
    },
    {
        slug: "tokenai",
        name: "TokenAI",
        logo: "/projects/token-logo.svg",
        tagline: "AI E-Learning Platform",
        description: "AI e-learning platform, courses, exams, discussions, secure video streaming, and full payment integration.",
        sector: "EdTech · Arabic Learning Platform",
        summary:
            "An Arabic-first platform for learning AI and data science. Learners browse a faceted catalogue, follow structured paths, work through video lessons with progress tracking, sit timed exams, and check out through a Gulf payment stack — the whole interface built right-to-left.",
        year: "2025",
        role: "Architect & Tech Leader",
        status: "Delivered",
        stack: ["NextJS", "RTL / Arabic-first", "NodeJS", "GraphQL", "PostgreSQL", "Secure Video", "Payments"],
        highlights: [
            "Faceted catalogue and search across rating, duration, category, level and price.",
            "Course player with per-lesson progress, completion tracking and certificates.",
            "Timed exams with a countdown and question-by-question navigation.",
            "Ratings, reviews and threaded discussion under every course.",
            "Cart to checkout with Mada, Visa, Mastercard and Apple Pay, VAT-inclusive.",
        ],
        media: [
            { src: "/projects/tokenai/tokenai-1.webp", width: 970, height: 4200, label: "Landing Page", kind: "web" },
            { src: "/projects/tokenai/tokenai-2.webp", width: 1223, height: 2400, label: "Course Catalogue & Filters", kind: "web" },
            { src: "/projects/tokenai/tokenai-3.webp", width: 1221, height: 3000, label: "Course Detail — Curriculum & Reviews", kind: "web" },
            { src: "/projects/tokenai/tokenai-4.webp", width: 1226, height: 2400, label: "Search Results", kind: "web" },
            { src: "/projects/tokenai/tokenai-5.webp", width: 1440, height: 1812, label: "Profile — My Courses & Progress", kind: "web" },
            { src: "/projects/tokenai/tokenai-6.webp", width: 1440, height: 1752, label: "Timed Exam", kind: "web" },
            { src: "/projects/tokenai/tokenai-7.webp", width: 1440, height: 1372, label: "Checkout & Payment Methods", kind: "web" },
        ],
    },
    {
        slug: "deiar",
        name: "Deiar",
        logo: "/projects/deiar-logo.svg",
        tagline: "Property Developers SaaS",
        description: "Multi-tenant SaaS for property developers, manage & publish units, receive reservations, control their catalogs.",
        sector: "PropTech · SaaS",
        summary:
            "A multi-tenant platform for property developers. Each developer manages projects and units in a private dashboard, publishes them to a public catalogue, and receives reservations — with a map view and filtering for buyers.",
        year: "2023 — 2025",
        role: "Full-Stack Developer",
        status: "Live",
        stack: ["NextJS", "NodeJS", "ExpressJS", "MongoDB", "Maps", "Auth & Roles"],
        highlights: [
            "Per-developer workspaces with isolated projects and units.",
            "Unit tables with pricing, status and specification control.",
            "Public catalogue with list and map browsing.",
            "Project pages carrying guarantees, files and media galleries.",
        ],
        media: [
            { src: "/projects/deiar/deiar-site.webp", width: 926, height: 4200, label: "Website — Full Page", kind: "web" },
            { src: "/projects/deiar/deiar-4.webp", width: 1200, height: 750, label: "Public Site — Map Search", kind: "web" },
            { src: "/projects/deiar/deiar-3.webp", width: 1200, height: 750, label: "Public Site — Unit Listings", kind: "web" },
            { src: "/projects/deiar/deiar-unit.webp", width: 1280, height: 832, label: "Unit Popup", kind: "web" },
            { src: "/projects/deiar/deiar-project.webp", width: 1280, height: 2544, label: "Project Page — Units & Files", kind: "web" },
            { src: "/projects/deiar/deiar-1.webp", width: 1200, height: 750, label: "Dashboard — Projects", kind: "web" },
            { src: "/projects/deiar/deiar-2.webp", width: 1200, height: 750, label: "Dashboard — Project Units", kind: "web" },
            { src: "/projects/deiar/deiar-site-old.webp", width: 1118, height: 4200, label: "Website — Old Version", kind: "web" },
        ],
    },
];

export const PROJECTS_HEAD = {
    title: "Some I've Already Built",
    subtitle: "Featured Projects",
    note: "Those are just some...",
    cta: "Let's Build Yours",
    explore: "Explore Project",
};

export const PROJECT_QUERY = "project";

/**
 * How long the closed popup keeps its content mounted — must match `--t-popup` (0.65s), the
 * panel's exit transition, or the panel would blank out mid-animation.
 *
 * Unmounting matters for more than tidiness: it stops the viewer's requestAnimationFrame pan,
 * which would otherwise go on scrolling a 5781px-tall screenshot behind a closed popup for the
 * rest of the session, and it releases the decoded images.
 */
export const POPUP_EXIT_MS = 650;
