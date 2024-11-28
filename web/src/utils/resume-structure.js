export const fetchDefaultData = (template_id) => {
    switch (template_id) {
        // t'Elegance
        case '66672b6efe02b86cb6927af8': return {
            "fullname": "Your Fullname",
            "role": "Your current role / designation",
            "socials": {
                "title": "contact",
                "icons": true,
                "phone_code": "+91",
                "phone_number": "XXXXXXXXXX",
                "email": "xyz_qwe@email.com",
                "portfolio_label": "www.abc.com",
                "portfolio_value": "https://www.abc.com",
                "linkedin_label": "asfkasa",
                "linkedin_value": "https://www.asfkasa.linkedin.com",
                "github_label": "asqs1",
                "github_value": "https://www.asqs1.github.com",
            },
            "skills": {
                "title": "Technical Skills",
                "content_type": "plain_list",
                "content_data": [
                    {
                        "label": "Skill Label 1",
                        "content_values": ["Skill 1", "Skill 2"]
                    },
                    {
                        "label": "Skill Label 2",
                        "content_values": ["Skill 1", "Skill 2"]
                    }
                ],
            },
            "experience": {
                "title": "Work Experience",
                "content": [
                    {
                        "role": "Your Job Title",
                        "company": "Your Company / Agency",
                        "location": "Job Location",
                        "period_from": "XXXX",
                        "period_to": "XXXX",
                        "description_type": "unordered_list",
                        "description_list": ["Highlight your responsibilites, your contributions and your achievements in the position."]
                    },
                    {
                        "role": "Your Job Title",
                        "company": "Your Company / Agency",
                        "location": "Job Location",
                        "period_from": "XXXX",
                        "period_to": "XXXX",
                        "description_type": "unordered_list",
                        "description_list": ["Highlight your responsibilites, your contributions and your achievements in the position."]
                    }
                ],
            },
            "projects": {
                "title": "Projects",
                "content": [
                    {
                        "name": "Project Name",
                        "project_link": "Project Link",
                        "github_link": "Github Link",
                        "description_type": "unordered_list",
                        "description_list": ["Highlight your responsibilites, your contributions and your achievements in the position."]
                    },
                    {
                        "name": "Project Name",
                        "project_link": "Project Link",
                        "github_link": "Github Link",
                        "description_type": "unordered_list",
                        "description_list": ["Highlight your responsibilites, your contributions and your achievements in the position."]
                    }
                ],
            },
            "education": {
                "title": "Education",
                "content": [
                    {
                        "course": "Your course / degree",
                        "institute": "Your institute / school",
                        "location": "Institute / School Location",
                        "period_from": "XXXX",
                        "period_to": "XXXX"
                    },
                    {
                        "course": "Your course / degree",
                        "institute": "Your institute / school",
                        "location": "Institute / School Location",
                        "period_from": "XXXX",
                        "period_to": "XXXX"
                    }
                ],
            },
            "achievements": {
                "title": "Achievements",
                "content_type": "plain_list",
                "content_data": [
                    {
                        "title": "achievement_1",
                        "period": "XXXX"
                    },
                    {
                        "title": "achievement_2",
                        "period": "XXXX"
                    }
                ],
            },
            "references": {
                "title": "References",
                "content_type": "plain_list",
                "content_data": ["references_1", "references_2"],
            }
        }

        // t'Simplicity
        case '66672b96fe02b86cb6927afa': return {
            "fullname": "Your Fullname",
            "role": "Your current role / designation",
            "socials": {
                "title": "contact",
                "icons": false,
                "phone_code": "+91",
                "phone_number": "XXXXXXXXXX",
                "email": "xyz_qwe@email.com",
                "portfolio_label": "www.abc.com",
                "portfolio_value": "https://www.abc.com",
                "linkedin_label": "asfkasa",
                "linkedin_value": "https://www.asfkasa.linkedin.com",
                "github_label": "asqs1",
                "github_value": "https://www.asqs1.github.com",
            },
            "skills": {
                "title": "Technical Skills",
                "content_type": "plain_list",
                "content_data": [
                    {
                        "label": "Skill Label 1",
                        "content_values": ["Skill 1", "Skill 2"]
                    },
                    {
                        "label": "Skill Label 2",
                        "content_values": ["Skill 1", "Skill 2"]
                    }
                ],
            },
            "experience": {
                "title": "Work Experience",
                "content": [
                    {
                        "role": "Your Job Title",
                        "company": "Your Company / Agency",
                        "location": "Job Location",
                        "period_from": "XXXX",
                        "period_to": "XXXX",
                        "description_type": "unordered_list",
                        "description_list": ["Highlight your responsibilites, your contributions and your achievements in the position."]
                    },
                    {
                        "role": "Your Job Title",
                        "company": "Your Company / Agency",
                        "location": "Job Location",
                        "period_from": "XXXX",
                        "period_to": "XXXX",
                        "description_type": "unordered_list",
                        "description_list": ["Highlight your responsibilites, your contributions and your achievements in the position."]
                    }
                ],
            },
            "projects": {
                "title": "Projects",
                "content": [
                    {
                        "name": "Project Name",
                        "project_link": "Project Link",
                        "github_link": "Github Link",
                        "description_type": "unordered_list",
                        "description_list": ["Highlight your responsibilites, your contributions and your achievements in the position."]
                    },
                    {
                        "name": "Project Name",
                        "project_link": "Project Link",
                        "github_link": "Github Link",
                        "description_type": "unordered_list",
                        "description_list": ["Highlight your responsibilites, your contributions and your achievements in the position."]
                    }
                ],
            },
            "education": {
                "title": "Education",
                "content": [
                    {
                        "course": "Your course / degree",
                        "institute": "Your institute / school",
                        "location": "Institute / School Location",
                        "period_from": "XXXX",
                        "period_to": "XXXX"
                    },
                    {
                        "course": "Your course / degree",
                        "institute": "Your institute / school",
                        "location": "Institute / School Location",
                        "period_from": "XXXX",
                        "period_to": "XXXX"
                    }
                ],
            },
            "achievements": {
                "title": "achievements",
                "content_type": "plain_list",
                "content_data": ["achievement_1", "achievement_2"],
            },
            "references": {
                "title": "references",
                "content_type": "plain_list",
                "content_data": ["references_1", "references_2"],
            }
        }

        // t'Shadow
        case '66672b9cfe02b86cb6927afc': return {
            "fullname": "Your Fullname",
            "role": "Your current role / designation",
            "socials": {
                "title": "contact",
                "icons": true,
                "phone_code": "+91",
                "phone_number": "XXXXXXXXXX",
                "email": "xyz_qwe@email.com",
                "portfolio_label": "www.abc.com",
                "portfolio_value": "https://www.abc.com",
                "linkedin_label": "asfkasa",
                "linkedin_value": "https://www.asfkasa.linkedin.com",
                "github_label": "asqs1",
                "github_value": "https://www.asqs1.github.com",
            },
            "skills": {
                "title": "Technical Skills",
                "content_type": "plain_list",
                "content_data": [
                    {
                        "label": "Skill Label 1",
                        "content_values": ["Skill 1", "Skill 2"]
                    },
                    {
                        "label": "Skill Label 2",
                        "content_values": ["Skill 1", "Skill 2"]
                    }
                ],
            },
            "experience": {
                "title": "Work Experience",
                "content": [
                    {
                        "role": "Your Job Title",
                        "company": "Your Company / Agency",
                        "location": "Job Location",
                        "period_from": "XXXX",
                        "period_to": "XXXX",
                        "description_type": "unordered_list",
                        "description_list": ["Highlight your responsibilites, your contributions and your achievements in the position."]
                    },
                    {
                        "role": "Your Job Title",
                        "company": "Your Company / Agency",
                        "location": "Job Location",
                        "period_from": "XXXX",
                        "period_to": "XXXX",
                        "description_type": "unordered_list",
                        "description_list": ["Highlight your responsibilites, your contributions and your achievements in the position."]
                    }
                ],
            },
            "projects": {
                "title": "Projects",
                "content": [
                    {
                        "name": "Project Name",
                        "project_link": "Project Link",
                        "github_link": "Github Link",
                        "description_type": "unordered_list",
                        "description_list": ["Highlight your responsibilites, your contributions and your achievements in the position."]
                    },
                    {
                        "name": "Project Name",
                        "project_link": "Project Link",
                        "github_link": "Github Link",
                        "description_type": "unordered_list",
                        "description_list": ["Highlight your responsibilites, your contributions and your achievements in the position."]
                    }
                ],
            },
            "education": {
                "title": "Education",
                "content": [
                    {
                        "course": "Your course / degree",
                        "institute": "Your institute / school",
                        "location": "Institute / School Location",
                        "period_from": "XXXX",
                        "period_to": "XXXX"
                    },
                    {
                        "course": "Your course / degree",
                        "institute": "Your institute / school",
                        "location": "Institute / School Location",
                        "period_from": "XXXX",
                        "period_to": "XXXX"
                    }
                ],
            },
            "achievements": {
                "title": "Achievements",
                "content_type": "plain_list",
                "content_data": [
                    {
                        "title": "achievement_1",
                        "period": "XXXX"
                    },
                    {
                        "title": "achievement_2",
                        "period": "XXXX"
                    }
                ],
            },
            "references": {
                "title": "References",
                "content_type": "plain_list",
                "content_data": ["references_1", "references_2"],
            }
        }

        // t'Serenity
        case '66672ba1fe02b86cb6927afe': return {
            "fullname": "Your Fullname",
            "role": "Your current role / designation",
            "socials": {
                "title": "contact",
                "icons": true,
                "phone_code": "+91",
                "phone_number": "XXXXXXXXXX",
                "email": "xyz_qwe@email.com",
                "portfolio_label": "www.abc.com",
                "portfolio_value": "https://www.abc.com",
                "linkedin_label": "asfkasa",
                "linkedin_value": "https://www.asfkasa.linkedin.com",
                "github_label": "asqs1",
                "github_value": "https://www.asqs1.github.com",
            },
            "skills": {
                "title": "Technical Skills",
                "content_type": "plain_list",
                "content_data": [
                    {
                        "label": "Skill Label 1",
                        "content_values": ["Skill 1", "Skill 2"]
                    },
                    {
                        "label": "Skill Label 2",
                        "content_values": ["Skill 1", "Skill 2"]
                    }
                ],
            },
            "experience": {
                "title": "Work Experience",
                "content": [
                    {
                        "role": "Your Job Title",
                        "company": "Your Company / Agency",
                        "location": "Job Location",
                        "period_from": "XXXX",
                        "period_to": "XXXX",
                        "description_type": "unordered_list",
                        "description_list": ["Highlight your responsibilites, your contributions and your achievements in the position."]
                    },
                    {
                        "role": "Your Job Title",
                        "company": "Your Company / Agency",
                        "location": "Job Location",
                        "period_from": "XXXX",
                        "period_to": "XXXX",
                        "description_type": "unordered_list",
                        "description_list": ["Highlight your responsibilites, your contributions and your achievements in the position."]
                    }
                ],
            },
            "projects": {
                "title": "Projects",
                "content": [
                    {
                        "name": "Project Name",
                        "project_link": "Project Link",
                        "github_link": "Github Link",
                        "description_type": "unordered_list",
                        "description_list": ["Highlight your responsibilites, your contributions and your achievements in the position."]
                    },
                    {
                        "name": "Project Name",
                        "project_link": "Project Link",
                        "github_link": "Github Link",
                        "description_type": "unordered_list",
                        "description_list": ["Highlight your responsibilites, your contributions and your achievements in the position."]
                    }
                ],
            },
            "education": {
                "title": "Education",
                "content": [
                    {
                        "course": "Your course / degree",
                        "institute": "Your institute / school",
                        "location": "Institute / School Location",
                        "period_from": "XXXX",
                        "period_to": "XXXX"
                    },
                    {
                        "course": "Your course / degree",
                        "institute": "Your institute / school",
                        "location": "Institute / School Location",
                        "period_from": "XXXX",
                        "period_to": "XXXX"
                    }
                ],
            },
            "achievements": {
                "title": "Achievements",
                "content_type": "plain_list",
                "content_data": [
                    {
                        "title": "achievement_1",
                        "period": "XXXX"
                    },
                    {
                        "title": "achievement_2",
                        "period": "XXXX"
                    }
                ],
            },
            "references": {
                "title": "References",
                "content_type": "plain_list",
                "content_data": ["references_1", "references_2"],
            }
        }

        // t'Aura
        case '66672ba5fe02b86cb6927b00': return {
            "fullname": "Your Fullname",
            "role": "Your current role / designation",
            "socials": {
                "title": "contact",
                "icons": true,
                "phone_code": "+91",
                "phone_number": "XXXXXXXXXX",
                "email": "xyz_qwe@email.com",
                "portfolio_label": "www.abc.com",
                "portfolio_value": "https://www.abc.com",
                "linkedin_label": "asfkasa",
                "linkedin_value": "https://www.asfkasa.linkedin.com",
                "github_label": "asqs1",
                "github_value": "https://www.asqs1.github.com",
            },
            "skills": {
                "title": "Technical Skills",
                "content_type": "plain_list",
                "content_data": [
                    {
                        "label": "Skill Label 1",
                        "content_values": ["Skill 1", "Skill 2"]
                    },
                    {
                        "label": "Skill Label 2",
                        "content_values": ["Skill 1", "Skill 2"]
                    }
                ],
            },
            "experience": {
                "title": "Work Experience",
                "content": [
                    {
                        "role": "Your Job Title",
                        "company": "Your Company / Agency",
                        "location": "Job Location",
                        "period_from": "XXXX",
                        "period_to": "XXXX",
                        "description_type": "unordered_list",
                        "description_list": ["Highlight your responsibilites, your contributions and your achievements in the position."]
                    },
                    {
                        "role": "Your Job Title",
                        "company": "Your Company / Agency",
                        "location": "Job Location",
                        "period_from": "XXXX",
                        "period_to": "XXXX",
                        "description_type": "unordered_list",
                        "description_list": ["Highlight your responsibilites, your contributions and your achievements in the position."]
                    }
                ],
            },
            "projects": {
                "title": "Projects",
                "content": [
                    {
                        "name": "Project Name",
                        "project_link": "Project Link",
                        "github_link": "Github Link",
                        "description_type": "unordered_list",
                        "description_list": ["Highlight your responsibilites, your contributions and your achievements in the position."]
                    },
                    {
                        "name": "Project Name",
                        "project_link": "Project Link",
                        "github_link": "Github Link",
                        "description_type": "unordered_list",
                        "description_list": ["Highlight your responsibilites, your contributions and your achievements in the position."]
                    }
                ],
            },
            "education": {
                "title": "Education",
                "content": [
                    {
                        "course": "Your course / degree",
                        "institute": "Your institute / school",
                        "location": "Institute / School Location",
                        "period_from": "XXXX",
                        "period_to": "XXXX"
                    },
                    {
                        "course": "Your course / degree",
                        "institute": "Your institute / school",
                        "location": "Institute / School Location",
                        "period_from": "XXXX",
                        "period_to": "XXXX"
                    }
                ],
            },
            "achievements": {
                "title": "Achievements",
                "content_type": "plain_list",
                "content_data": [
                    {
                        "title": "achievement_1",
                        "period": "XXXX"
                    },
                    {
                        "title": "achievement_2",
                        "period": "XXXX"
                    }
                ],
            },
            "references": {
                "title": "References",
                "content_type": "plain_list",
                "content_data": ["references_1", "references_2"],
            }
        }
    }
}

export const resumeStructure = {
    fullname: 'Your Fullname',
    role: 'Your current role / designation',
    socials: {
        title: '',
        icons: false,
        email: 'sample_xyz@email.com',
        phone_code: '+91',
        phone_number: 'XXXXXXXXXX',
        portfolio_label: 'www.abc.com',
        portfolio_value: 'https://www.abc.com',
        github_label: 'asqs1',
        github_value: 'https://www.asqs1.github.com',
        linkedin_label: 'asfkasa',
        linkedin_link: 'https://www.asfkasa.linkedin.com'
    },
    experience: {
        title: 'Work Experience',
        content: [
            {
                role: 'Your Job Title',
                company: 'Your Company',
                location: 'Job Location',
                period_from: '',
                period_to: '',
                description_type: 'unordered_list',
                description_list: ["Highlight your responsibilites, your contributions and your achievements in the position."]
            },
            {
                role: 'Your Job Title',
                company: 'Your Company',
                location: 'Job Location',
                period_from: '',
                period_to: '',
                description_type: 'unordered_list',
                description_list: ["Highlight your responsibilites, your contributions and your achievements in the position."]
            }
        ]
    },
    skills: {
        title: 'Technical Skills',
        content_type: 'plain_list',
        content_data: [
            { label: 'Skill Label 1', content_values: [''] },
            { label: 'Skill Label 2', content_values: [''] }
        ]
    },
    projects: {
        title: 'Projects',
        content: [
            {
                name: '',
                project_link: '',
                github_link: '',
                description_list: []
            }
        ]
    },
    education: {
        title: 'Education',
        content: [
            {
                course: '',
                institute: '',
                location: '',
                period_from: '',
                period_to: ''
            },
            {
                course: '',
                institute: '',
                location: '',
                period_from: '',
                period_to: ''
            }
        ]
    },
    achievements: {
        title: 'Achievements',
        content_type: 'plain_list',
        content_data: ["achievement_1", "achievement_2"]
    },
    references: {
        title: 'References',
        content_type: 'plain_list',
        content_data: ["ref_1", "ref_2"]
    }
}
