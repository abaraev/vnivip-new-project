import {
    AnyAction, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { CombinedState } from 'redux';
import { AxiosInstance } from 'axios';
import { UISchema } from 'features/UI';
import { rtkApi } from 'shared/api/rtkApi';
import { DeviceSchema } from 'entities/Device';
import { MainPageNewsSchema } from 'pages/MainPage';
import { NewsPageSchema } from 'pages/NewsPage';
import { NewsDetailsPageSchema } from 'pages/NewsDetailsPage';
import { AdministrationPageSchema } from 'pages/AdministrationPage';
import { AcademicCouncilPageSchema } from 'pages/AcademicCouncilPage';
import { CouncilYoungScientistsPageSchema } from 'pages/CouncilYoungScientistsPage';
import { ScienceDepartmentsPageSchema } from 'pages/ScienceDepartmentsPage';
import { CompetitionsPageSchema } from 'pages/CompetitionsPage';
import { VacanciesPageSchema } from 'pages/VacanciesPage';
import { ActsPageSchema } from 'pages/ActsPage';
import { ServicesPageSchema } from 'pages/ServicesPage';
import { CartSchema } from 'entities/Cart';
import { CartPageSchema } from 'pages/CartPage';
import { AdminAuthFormSchema } from 'features/AdminAuthForm';
import { AdminSchema } from 'entities/Admin';
import { AdminOrdersPageSchema } from 'pages/AdminOrdersPage';
import { AdminOrdersDetailsPageSchema } from 'pages/AdminOrdersDetailsPage';
import { AdminNewsPageSchema } from 'pages/AdminNewsPage';
import { AdminNewsDetailsPageSchema } from 'pages/AdminNewsDetailsPage';
import { AdminServicesPageSchema } from 'pages/AdminServicesPage';
import { AdminServicesDetailsPageSchema } from 'pages/AdminServicesDetailsPage';
import { AdminActsPageSchema } from 'pages/AdminActsPage';
import { AdminMembersPageSchema } from 'pages/AdminMembersPage';
import { AdminMemberDetailsPageSchema } from 'pages/AdminMemberDetailsPage';
import { AdminCompetitionsPageSchema } from 'pages/AdminCompetitionsPage';
import { AdminVacanciesPageSchema } from 'pages/AdminVacanciesPage';
import { AdminRecentEventsPageSchema } from 'pages/AdminRecentEventsPage';
import { AdminEngineeringPageSchema } from 'pages/AdminEngineeringPage';
import { AboutInstitutePageSchema } from 'pages/AboutInstitutePage';
import { MemberDetailsPageSchema } from 'pages/MemberDetailsPage';
import { EducationPageSchema } from 'pages/EducationPage';
import { ClinicPageSchema } from 'pages/ClinicPage';
import { ScienceLibraryPageSchema } from 'pages/ScienceLibraryPage';
import { AdminEducationPageSchema } from 'pages/AdminEducationPage';
import { AdminScienceLibraryPageSchema } from 'pages/AdminScienceLibraryPage';
import { AdminClinicPageSchema } from 'pages/AdminClinicPage';
import { EngineeringPageSchema } from 'pages/EngineeringPage';

export interface StateSchema {
    ui: UISchema;
    device: DeviceSchema;
    cart: CartSchema;
    admin: AdminSchema;
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;
    // Асинхронные редюсеры
    mainPageNews?: MainPageNewsSchema,
    newsPage?: NewsPageSchema,
    newsDetailsPage?: NewsDetailsPageSchema,
    administrationPage?: AdministrationPageSchema,
    academicCouncilPage?: AcademicCouncilPageSchema,
    councilYoungScientistsPage?: CouncilYoungScientistsPageSchema,
    scienceDepartmentsPage?: ScienceDepartmentsPageSchema,
    competitionsPage?: CompetitionsPageSchema,
    vacanciesPage?: VacanciesPageSchema,
    actsPage?: ActsPageSchema,
    educationPage?: EducationPageSchema,
    сlinicPage?: ClinicPageSchema,
    scienceLibraryPage?: ScienceLibraryPageSchema,
    adminEducationPage?: AdminEducationPageSchema,
    adminScienceLibraryPage?: AdminScienceLibraryPageSchema,
    servicesPage?: ServicesPageSchema,
    cartPage?: CartPageSchema,
    adminAuthForm?: AdminAuthFormSchema,
    adminOrdersPage?: AdminOrdersPageSchema,
    adminOrdersDetailsPage?: AdminOrdersDetailsPageSchema,
    adminNewsPage?: AdminNewsPageSchema,
    adminNewsDetailsPage?: AdminNewsDetailsPageSchema,
    adminServicesPage?: AdminServicesPageSchema,
    adminServicesDetailsPage?: AdminServicesDetailsPageSchema,
    adminActsPage?: AdminActsPageSchema,
    adminMembersPage?: AdminMembersPageSchema,
    adminMemberDetailsPage?: AdminMemberDetailsPageSchema,
    adminCompetitionsPage?: AdminCompetitionsPageSchema,
    adminVacanciesPage?: AdminVacanciesPageSchema,
    adminRecentEventsPage?: AdminRecentEventsPageSchema,
    adminEngineeringPage?: AdminEngineeringPageSchema,
    adminClinicPage?: AdminClinicPageSchema,
    aboutInstitutePage?: AboutInstitutePageSchema,
    memberDetailsPage?: MemberDetailsPageSchema,
    engineeringPage?: EngineeringPageSchema,
}

export type StateSchemaKey = keyof StateSchema;
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
    getMountedReducers: () => MountedReducers;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}
