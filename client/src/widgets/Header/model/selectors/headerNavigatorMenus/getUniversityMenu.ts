export const getUniversityMenu = () => {
    return {
        title: 'Университет',
        section1: {
            main1: {
                name: 'Об университете',
                link: '#',
                subsections: [],
            },
            main2: {
                name: 'Структура и контакты',
                link: '#',
                subsections: [],
            },
            main3: {
                name: 'Ректорат',
                link: '#',
                subsections: [
                    { name: 'О ректоре', link: '#' },
                    { name: 'Проректор по учебно-воспитательной работе и молодежной политике', link: '#' },
                    { name: 'Проректор по научной работе и международным связям', link: '#' },
                    { name: 'Проректор по развитию, качеству образования и цифровой трансформации', link: '#' },
                ],
            },
        },
        section2: {
            main1: {
                name: 'Новости и афиша',
                link: '#',
                subsections: [],
            },
            main2: {
                name: 'Цифровая трансформация',
                link: '#',
                subsections: [],
            },
            main3: {
                name: 'Инклюзивное образование',
                link: '#',
                subsections: [],
            },
            main4: {
                name: 'Ветеринарная клиника',
                link: '#',
                subsections: [],
            },
            main5: {
                name: 'Музеи',
                link: '#',
                subsections: [
                    { name: 'Музей кафедры анатомии животных', link: '#' },
                    { name: 'Музей кафедры патологической анатомии и судебной ветеринарной медицины', link: '#' },
                    { name: 'Музей кафедры ветеринарно-санитарной экспертизы', link: '#' },
                    { name: 'Музей кафедры паразитологии', link: '#' },
                ],
            },
        },
        section3: {
            main1: {
                name: 'Работникам',
                link: '#',
                subsections: [],
            },
            main2: {
                name: 'Партнерам',
                link: '#',
                subsections: [],
            },
            main3: {
                name: 'Выпускникам',
                link: '#',
                subsections: [
                    { name: 'Практика студентов', link: '#' },
                    { name: 'Трудоустройство выпускников', link: '#' },
                ],
            },
        },
    };
};
