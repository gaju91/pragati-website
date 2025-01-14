export interface Project {
    id: string;
    title: string;
    tags?: string[];
    description: string;
    images: string[];
    technologies: string[];
    live_url?: string;
    github_url?: string;
    testimonials?: {
        author: string;
        role: string;
        quote: string;
        image: string;
        links: {
            title: string;
            url: string;
        } [];
    };
    project_journals?: string[];
}

export const projects: Project[] = [
    {
        id: "1",
        title: "Saraswati Vidhya Mandir",
        tags: ["School", "Education", "Website"],
        description: "A school website for Saraswati Vidhya Mandir. The website is built with Next.js and Tailwind CSS.",
        images: [
            "https://res.cloudinary.com/dytjes69s/image/upload/v1736857734/Screenshot_2025-01-14_at_4.14.19_PM_bjvzwy.png",
            "https://res.cloudinary.com/dytjes69s/image/upload/v1736857733/Screenshot_2025-01-14_at_4.14.30_PM_bf3djk.png",
            "https://res.cloudinary.com/dytjes69s/image/upload/v1736857733/Screenshot_2025-01-14_at_4.14.06_PM_cggkoz.png",
            "https://res.cloudinary.com/dytjes69s/image/upload/v1736857729/Screenshot_2025-01-14_at_4.14.38_PM_pxbhqv.png",
            "https://res.cloudinary.com/dytjes69s/image/upload/v1736857729/Screenshot_2025-01-13_at_10.20.31_AM_sx1cth.png"
        ],
        technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "Redis", "Docker"],
        live_url: "https://school.svmb.in",
        testimonials: {
            author: 'Mr. Dasrath Singh Ji',
            role: 'Director SVM School',
            quote: 'I am very happy with the work done by the team. They are very professional and have delivered the project on time. I highly recommend them.',
            image: "https://res.cloudinary.com/dytjes69s/image/upload/v1735903076/jmekwl9puavnkvvxc6vf.jpg",
            links: [
                {
                    title: 'Facebook',
                    url: 'https://www.facebook.com/dashrath.rathore.3762'
                },
                {
                    title: 'Instagram',
                    url: 'https://www.instagram.com/dashrath.rathore.3762'
                }
            ]
        },
        project_journals: [
            "In addition to the above, We setup CMS, SEO, and Analytics for the website and every technicl aspect of the website is managed by us."
        ]
    }
];
