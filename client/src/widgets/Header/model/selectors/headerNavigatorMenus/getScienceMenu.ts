export const getScienceMenu = () => {
    return {
        title: 'Наука',
        section1: {
            main1: {
                name: 'Аспирантура',
                link: '#',
                subsections: [],
            },
            main2: {
                name: 'Докторантура',
                link: '#',
                subsections: [],
            },
            main3: {
                name: 'Диссертационные советы',
                link: '#',
                subsections: [],
            },
        },
        section2: {
            main1: {
                name: 'Научные лаборатории',
                link: '#',
                subsections: [],
            },
            main2: {
                name: 'Научные журналы',
                link: '#',
                subsections: [
                    { name: 'Международный вестник ветеринарии', link: '#' },
                    { name: 'Нормативно-правовое регулирование в ветеринарии', link: '#' },
                ],
            },
        },
        section3: {
            main1: {
                name: 'Научные школы',
                link: '#',
                subsections: [],
            },
            main2: {
                name: 'Студенческое научное общество',
                link: '#',
                subsections: [],
            },
            main3: {
                name: 'Совет молодых ученых',
                link: '#',
                subsections: [],
            },
        },
    };
};
