import { Vacancy } from 'entities/Vacancy';

export interface AdminVacanciesPageSchema {
    isLoading: boolean;
    error?: string;
    vacancies: Vacancy[];
    _inited: boolean;
    addingVacancyJobName: string;
    addingVacancyDescription: string;
}
