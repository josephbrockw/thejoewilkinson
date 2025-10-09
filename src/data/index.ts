interface Project {
    title: string;
    description: string;
    image: string;
    technologies: string[];
    objectFit: "cover" | "contain" | "fill" | "scale-down";
    featured: boolean;
}

export const projects: Project[] = [
    {
        title: "Prompt with Friends",
        description: "A social party game where players write creative prompts and compete to generate the funniest or most on-theme AI images — the best image wins the round.",
        image: "/images/pwf_logo.png",
        technologies: ["ReactNative", "GenAI", "Python", "Django"],
        objectFit: "contain",
        featured: true
    },
    {
        title: "Capwise",
        description: "A custom fantasy basketball platform that transforms a dynasty league into a true front office experience — complete with salary cap management, rookie drafts, and a real-time trade machine.",
        image: "/images/capwise_logo.png",
        technologies: ["Next.js", "Stripe", "Tailwind", "MongoDB"],
        objectFit: "contain",
        featured: true
    },
    {
        title: "TripleBlind Router",
        description: "Developed the TripleBlind Router, the core service powering authentication, data sharing permissions, and multi-party compute orchestration between organizations within the Privacy Suite platform.",
        image: "/images/TripleBlind_logo.png",
        technologies: ["Django", "API", "React", "Celery"],
        objectFit: "contain",
        featured: true
    },
    {
        title: "CharizmaAI",
        description: "Practice interviewing with anyone with AI generated real-time practice interviews.",
        image: "/images/charizma_logo.png",
        technologies: ["Next.js", "GenAI"],
        objectFit: "contain",
        featured: false 
    },
    {
        title: "Watch Duty",
        description: "Digital character sheets for a satirical fantasy RPG of corruption, compromise, and civic survival in the soot-choked streets of Brassport.",
        image: "/images/watchduty_logo.png",
        technologies: ["TTRPG","React", "Django", "PostgreSQL"],
        objectFit: "cover",
        featured: false 
    }
]