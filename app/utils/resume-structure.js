const resumeStructure = {
    id: '',
    name: '',
    author: '',
    layout: 'chronological | functional | combination',
    design: 'plain | hr-cut | vr-cut | polygon-hr-cut | polygon-vr-cut',
    font: '',
    theme: '',
    language: '',
    is_premium: false,
    rating: 0,
    reviews: [
        {
            text: '',
            author: ''
        }
    ],
    visible_fields: [
        'experience',
        '',
        '...'
    ],
    fields: {
        fullname: '',
        role: '',
        email: '',
        phone: {
            code: '',
            number: ''
        },
        socials: {
            portfolio: {
                visible: false,
                label: '',
                link: ''
            },
            github: {
                visible: false,
                label: '',
                link: ''
            },
            linkedin: {
                visible: false,
                label: '',
                link: ''
            }
        },
        experience: {
            title: 'Work Experience | Experience',
            content: [
                {
                    company: '',
                    location: '',
                    period: {
                        from: '',
                        to: ''
                    },
                    description: {
                        type: 'para | unordered_list | ordered_list',
                        text: ''
                    }
                }
            ]
        },
        skills: {
            title: 'Technical Skills | Skills',
            type: 'plain_list | unordered_list | ordered_list | object_list',
            content: []
        },
        education: {
            title: 'Education',
            content: [
                {
                    course: '',
                    period: {
                        from: '',
                        to: ''
                    },
                    institute: ''
                }
            ]
        },
        certificates: {
            title: 'Certificates',
            content: [
                {
                    title: 'Trainings and Certifications | Certifications | Trainings ',
                    period: {
                        from: '',
                        to: ''
                    },
                    text: ''
                }
            ]
        },
        achievements: {
            title: 'Achievements | Awards | Awards & Acknoledgements',
            type: 'plain_list | unordered_list | ordered_list',
            content: []
        },
        interests: {
            title: 'Interests',
            type: 'plain_list | unordered_list | ordered_list',
            content: []
        },
        references: {
            title: 'References',
            type: 'plain_list | unordered_list | ordered_list',
            content: []
        }
    }
}
