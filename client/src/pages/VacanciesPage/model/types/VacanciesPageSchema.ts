import { Vacancy } from 'entities/Vacancy';

export interface VacanciesPageSchema {
    isLoading: boolean;
    error?: string;
    vacancies: Vacancy[];
    _inited: boolean;
}
