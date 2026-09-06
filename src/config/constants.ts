const constants = {
    name: "Ahmed M. Zanaty",
    role: "Software Engineer",
    email: "ahmdmznaty@gmail.com",
    cv: "/ahmdmznaty-cv.pdf",
    siteUrl: "https://ahmdmznaty.com",

    /* section class selectors — scrolling is done in JS against these, never via #id anchors */
    sections: {
        hero: ".hero",
        services: ".services",
        projects: ".projects",
        techStack: ".tech-stack",
        experience: ".experience",
        testimonials: ".testimonials",
        footer: ".footer",
    },

    socials: {
        whatsapp: "https://wa.me/+201100134340",
        linkedin: "https://linkedin.com/in/ahmdmznaty",
        github: "https://github.com/ahmdmznaty",
        stackoverflow: "https://stackoverflow.com/users/20708566/ahmed-m-znaty",
        upwork: "https://www.upwork.com/freelancers/~016c0254f4053a631a",
    },
} as const;

export default constants;
