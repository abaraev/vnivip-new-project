export const getForStudentsMenu = () => {
    return {
        title: 'Студентам',
        section1: {
            main1: {
                name: 'Информация для студентов',
                link: '#',
                subsections: [],
            },
            main2: {
                name: 'Расписание',
                link: '#',
                subsections: [],
            },
            main3: {
                name: 'Библиотека',
                link: '#',
                subsections: [
                    { name: 'Авторам', link: '#' },
                    { name: 'Преподавателям', link: '#' },
                    { name: 'Инвалидам и лицам с ОВЗ', link: '#' },
                ],
            },
        },
        section2: {
            main1: {
                name: 'Общежития',
                link: '#',
                subsections: [],
            },
            main2: {
                name: 'Воспитательная работа',
                link: '#',
                subsections: [
                    { name: 'Студенческие отряды', link: '#' },
                    { name: 'Студенческий совет', link: '#' },
                    { name: 'Студенческое научное общество', link: '#' },
                    { name: 'Волонтерский центр', link: '#' },
                ],
            },
        },
        section3: {
            main1: {
                name: 'Восстановительная комиссия',
                link: '#',
                subsections: [],
            },
            main2: {
                name: 'Высшие ветеринарные классы',
                link: '#',
                subsections: [],
            },
            main3: {
                name: 'Электронная среда',
                link: '#',
                subsections: [],
            },
            main4: {
                name: 'Магазин СПБГУВМ',
                link: '#',
                subsections: [],
            },
        },
    };
};
