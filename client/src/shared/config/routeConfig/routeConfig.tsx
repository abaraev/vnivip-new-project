import { RouteProps } from 'react-router-dom';
import { NotFoundPageDesktop, NotFoundPageMobile } from 'pages/NotFoundPage';
import { MainPageDesktop, MainPageMobile } from 'pages/MainPage';
import { NewsPageDesktop, NewsPageMobile } from 'pages/NewsPage';
import { NewsDetailsPageDesktop, NewsDetailsPageMobile } from 'pages/NewsDetailsPage';
import { PartnersPageDesktop, PartnersPageMobile } from 'pages/PartnersPage';
import { ContactsPageDesktop, ContactsPageMobile } from 'pages/ContactsPage';
import { AdministrationPageDesktop, AdministrationPageMobile } from 'pages/AdministrationPage';
import { AcademicCouncilPageDesktop, AcademicCouncilPageMobile } from 'pages/AcademicCouncilPage';
import { CouncilYoungScientistsPageDesktop, CouncilYoungScientistsPageMobile } from 'pages/CouncilYoungScientistsPage';
import { ScienceDepartmentsPageDesktop, ScienceDepartmentsPageMobile } from 'pages/ScienceDepartmentsPage';
import { AboutInstitutePageDesktop, AboutInstitutePageMobile } from 'pages/AboutInstitutePage';
import { EducationPageDesktop, EducationPageMobile } from 'pages/EducationPage';
import { ScienceLibraryPageDesktop, ScienceLibraryPageMobile } from 'pages/ScienceLibraryPage';
import {
    ScienceEducationActivityPageDesktop,
    ScienceEducationActivityPageMobile,
} from 'pages/ScienceEducationActivityPage';
import { ProcurementInfoPageDesktop, ProcurementInfoPageMobile } from 'pages/ProcurementInfoPage';
import { CompetitionsPageDesktop, CompetitionsPageMobile } from 'pages/CompetitionsPage';
import { VacanciesPageDesktop, VacanciesPageMobile } from 'pages/VacanciesPage';
import { ActsPageDesktop, ActsPageMobile } from 'pages/ActsPage';
import { ServicesPageDesktop, ServicesPageMobile } from 'pages/ServicesPage';
import { CartPageDesktop, CartPageMobile } from 'pages/CartPage';
import { AdminAuthPageDesktop } from 'pages/AdminAuthPage';
import { AdminOrdersPageDesktop } from 'pages/AdminOrdersPage';
import { AdminOrdersDetailsPageDesktop } from 'pages/AdminOrdersDetailsPage';
import { AdminNewsPageDesktop } from 'pages/AdminNewsPage';
import { AdminNewsDetailsPageDesktop } from 'pages/AdminNewsDetailsPage';
import { AdminServicesPageDesktop } from 'pages/AdminServicesPage';
import { AdminServicesDetailsPageDesktop } from 'pages/AdminServicesDetailsPage';
import { AdminActsPageDesktop } from 'pages/AdminActsPage';
import { AdminMembersPageDesktop } from 'pages/AdminMembersPage';
import { AdminMemberDetailsPageDesktop } from 'pages/AdminMemberDetailsPage';
import { AdminCompetitionsPageDesktop } from 'pages/AdminCompetitionsPage';
import { AdminVacanciesPageDesktop } from 'pages/AdminVacanciesPage';
import { AdminRecentEventsPageDesktop } from 'pages/AdminRecentEventsPage';
import { MemberDetailsPageDesktop, MemberDetailsPageMobile } from 'pages/MemberDetailsPage';

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
}

export enum AppRoutes {
    MAIN = 'main',
    NEWS = 'news',
    NEWS_DETAILS = 'news_details',
    PARTNERS = 'partners',
    CONTACTS = 'contacts',
    ADMINISTRATION = 'administration',
    ACADEMIC_COUNCIL = 'academic_council',
    COUNCIL_YOUNG_SCIENTISTS = 'council_young_scientists',
    SCIENCE_DEPARTMENTS = 'science_departments',
    ABOUT_INSTITUTE = 'about_institute',
    EDUCATION = 'education',
    SCIENCE_LIBRARY = 'science_library',
    SCIENCE_EDUCATION_ACTIVITY = 'science_education_activity',
    PROCUREMENT_INFO = 'procurement_info',
    COMPETITIONS = 'competitions',
    VACANCIES = 'vacancies',
    ACTS = 'acts',
    SERVICES = 'services',
    MEMBER_DETAILS = 'member_details',
    CART = 'cart',
    NOT_FOUND = 'not_found',
    // Админам
    ADMIN_AUTH = 'admin_auth',
    ADMIN_ORDERS = 'admin_orders',
    ADMIN_ORDERS_DETAILS = 'admin_orders_details',
    ADMIN_NEWS = 'admin_news',
    ADMIN_NEWS_DETAILS = 'admin_news_details',
    ADMIN_SERVICES = 'admin_services',
    ADMIN_SERVICES_DETAILS = 'admin_services_details',
    ADMIN_ACTS = 'admin_acts',
    ADMIN_MEMBERS = 'admin_members',
    ADMIN_MEMBERS_DETAILS = 'admin_members_details',
    ADMIN_COMPETITIONS = 'admin_competitions',
    ADMIN_VACANCIES = 'admin_vacancies',
    ADMIN_RECENT_EVENTS = 'admin_recent_events',
}

export enum AppPaths {
    MAIN = '/',
    NEWS = '/news',
    NEWS_DETAILS = '/news/:id',
    PARTNERS = '/partners',
    CONTACTS = '/contacts',
    ADMINISTRATION = '/administration',
    ACADEMIC_COUNCIL = '/academic_council',
    COUNCIL_YOUNG_SCIENTISTS = '/council_young_scientists',
    SCIENCE_DEPARTMENTS = '/science_departments',
    ABOUT_INSTITUTE = '/about',
    EDUCATION = '/education',
    SCIENCE_LIBRARY = '/science_library',
    SCIENCE_EDUCATION_ACTIVITY = '/science_education_activity',
    PROCUREMENT_INFO = '/procurement_info',
    COMPETITIONS = '/competitions',
    VACANCIES = '/vacancies',
    ACTS = '/acts',
    SERVICES = '/services',
    MEMBER_DETAILS = '/member_details/:id',
    CART = '/cart',
    NOT_FOUND = '*',
    // Админам
    ADMIN_AUTH = '/admin_auth',
    ADMIN_ORDERS = '/admin_orders',
    ADMIN_ORDERS_DETAILS = '/admin_orders/:id',
    ADMIN_NEWS = '/admin_news',
    ADMIN_NEWS_DETAILS = '/admin_news/:id',
    ADMIN_SERVICES = '/admin_services',
    ADMIN_SERVICES_DETAILS = '/admin_services/:id',
    ADMIN_ACTS = '/admin_acts',
    ADMIN_MEMBERS = '/admin_members',
    ADMIN_MEMBERS_DETAILS = '/admin_members/:id',
    ADMIN_COMPETITIONS = '/admin_competitions',
    ADMIN_VACANCIES = '/admin_vacancies',
    ADMIN_RECENT_EVENTS = '/admin_recent_events',
}

export const RoutePath: Record<AppRoutes, AppPaths> = {
    [AppRoutes.MAIN]: AppPaths.MAIN,
    [AppRoutes.NEWS]: AppPaths.NEWS,
    [AppRoutes.NEWS_DETAILS]: AppPaths.NEWS_DETAILS,
    [AppRoutes.PARTNERS]: AppPaths.PARTNERS,
    [AppRoutes.CONTACTS]: AppPaths.CONTACTS,
    [AppRoutes.ADMINISTRATION]: AppPaths.ADMINISTRATION,
    [AppRoutes.ACADEMIC_COUNCIL]: AppPaths.ACADEMIC_COUNCIL,
    [AppRoutes.COUNCIL_YOUNG_SCIENTISTS]: AppPaths.COUNCIL_YOUNG_SCIENTISTS,
    [AppRoutes.SCIENCE_DEPARTMENTS]: AppPaths.SCIENCE_DEPARTMENTS,
    [AppRoutes.ABOUT_INSTITUTE]: AppPaths.ABOUT_INSTITUTE,
    [AppRoutes.EDUCATION]: AppPaths.EDUCATION,
    [AppRoutes.SCIENCE_LIBRARY]: AppPaths.SCIENCE_LIBRARY,
    [AppRoutes.SCIENCE_EDUCATION_ACTIVITY]: AppPaths.SCIENCE_EDUCATION_ACTIVITY,
    [AppRoutes.PROCUREMENT_INFO]: AppPaths.PROCUREMENT_INFO,
    [AppRoutes.COMPETITIONS]: AppPaths.COMPETITIONS,
    [AppRoutes.VACANCIES]: AppPaths.VACANCIES,
    [AppRoutes.ACTS]: AppPaths.ACTS,
    [AppRoutes.SERVICES]: AppPaths.SERVICES,
    [AppRoutes.MEMBER_DETAILS]: AppPaths.MEMBER_DETAILS,
    [AppRoutes.CART]: AppPaths.CART,
    [AppRoutes.NOT_FOUND]: AppPaths.NOT_FOUND,
    // Админам
    [AppRoutes.ADMIN_AUTH]: AppPaths.ADMIN_AUTH,
    [AppRoutes.ADMIN_ORDERS]: AppPaths.ADMIN_ORDERS,
    [AppRoutes.ADMIN_ORDERS_DETAILS]: AppPaths.ADMIN_ORDERS_DETAILS,
    [AppRoutes.ADMIN_NEWS]: AppPaths.ADMIN_NEWS,
    [AppRoutes.ADMIN_NEWS_DETAILS]: AppPaths.ADMIN_NEWS_DETAILS,
    [AppRoutes.ADMIN_SERVICES]: AppPaths.ADMIN_SERVICES,
    [AppRoutes.ADMIN_SERVICES_DETAILS]: AppPaths.ADMIN_SERVICES_DETAILS,
    [AppRoutes.ADMIN_ACTS]: AppPaths.ADMIN_ACTS,
    [AppRoutes.ADMIN_MEMBERS]: AppPaths.ADMIN_MEMBERS,
    [AppRoutes.ADMIN_MEMBERS_DETAILS]: AppPaths.ADMIN_MEMBERS_DETAILS,
    [AppRoutes.ADMIN_COMPETITIONS]: AppPaths.ADMIN_COMPETITIONS,
    [AppRoutes.ADMIN_VACANCIES]: AppPaths.ADMIN_VACANCIES,
    [AppRoutes.ADMIN_RECENT_EVENTS]: AppPaths.ADMIN_RECENT_EVENTS,
};

export const routeConfigDesktop: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPageDesktop />,
    },
    [AppRoutes.NEWS]: {
        path: RoutePath.news,
        element: <NewsPageDesktop />,
    },
    [AppRoutes.NEWS_DETAILS]: {
        path: RoutePath.news_details,
        element: <NewsDetailsPageDesktop />,
    },
    [AppRoutes.PARTNERS]: {
        path: RoutePath.partners,
        element: <PartnersPageDesktop />,
    },
    [AppRoutes.CONTACTS]: {
        path: RoutePath.contacts,
        element: <ContactsPageDesktop />,
    },
    [AppRoutes.ADMINISTRATION]: {
        path: RoutePath.administration,
        element: <AdministrationPageDesktop />,
    },
    [AppRoutes.ACADEMIC_COUNCIL]: {
        path: RoutePath.academic_council,
        element: <AcademicCouncilPageDesktop />,
    },
    [AppRoutes.COUNCIL_YOUNG_SCIENTISTS]: {
        path: RoutePath.council_young_scientists,
        element: <CouncilYoungScientistsPageDesktop />,
    },
    [AppRoutes.SCIENCE_DEPARTMENTS]: {
        path: RoutePath.science_departments,
        element: <ScienceDepartmentsPageDesktop />,
    },
    [AppRoutes.ABOUT_INSTITUTE]: {
        path: RoutePath.about_institute,
        element: <AboutInstitutePageDesktop />,
    },
    [AppRoutes.EDUCATION]: {
        path: RoutePath.education,
        element: <EducationPageDesktop />,
    },
    [AppRoutes.SCIENCE_LIBRARY]: {
        path: RoutePath.science_library,
        element: <ScienceLibraryPageDesktop />,
    },
    [AppRoutes.SCIENCE_EDUCATION_ACTIVITY]: {
        path: RoutePath.science_education_activity,
        element: <ScienceEducationActivityPageDesktop />,
    },
    [AppRoutes.PROCUREMENT_INFO]: {
        path: RoutePath.procurement_info,
        element: <ProcurementInfoPageDesktop />,
    },
    [AppRoutes.COMPETITIONS]: {
        path: RoutePath.competitions,
        element: <CompetitionsPageDesktop />,
    },
    [AppRoutes.VACANCIES]: {
        path: RoutePath.vacancies,
        element: <VacanciesPageDesktop />,
    },
    [AppRoutes.ACTS]: {
        path: RoutePath.acts,
        element: <ActsPageDesktop />,
    },
    [AppRoutes.SERVICES]: {
        path: RoutePath.services,
        element: <ServicesPageDesktop />,
    },
    [AppRoutes.MEMBER_DETAILS]: {
        path: RoutePath.member_details,
        element: <MemberDetailsPageDesktop />,
    },
    [AppRoutes.CART]: {
        path: RoutePath.cart,
        element: <CartPageDesktop />,
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPageDesktop />,
    },
    // Админам
    [AppRoutes.ADMIN_AUTH]: {
        path: RoutePath.admin_auth,
        element: <AdminAuthPageDesktop />,
    },
    [AppRoutes.ADMIN_ORDERS]: {
        path: RoutePath.admin_orders,
        element: <AdminOrdersPageDesktop />,
        authOnly: true,
    },
    [AppRoutes.ADMIN_ORDERS_DETAILS]: {
        path: RoutePath.admin_orders_details,
        element: <AdminOrdersDetailsPageDesktop />,
        authOnly: true,
    },
    [AppRoutes.ADMIN_NEWS]: {
        path: RoutePath.admin_news,
        element: <AdminNewsPageDesktop />,
        authOnly: true,
    },
    [AppRoutes.ADMIN_NEWS_DETAILS]: {
        path: RoutePath.admin_news_details,
        element: <AdminNewsDetailsPageDesktop />,
        authOnly: true,
    },
    [AppRoutes.ADMIN_SERVICES]: {
        path: RoutePath.admin_services,
        element: <AdminServicesPageDesktop />,
        authOnly: true,
    },
    [AppRoutes.ADMIN_SERVICES_DETAILS]: {
        path: RoutePath.admin_services_details,
        element: <AdminServicesDetailsPageDesktop />,
        authOnly: true,
    },
    [AppRoutes.ADMIN_ACTS]: {
        path: RoutePath.admin_acts,
        element: <AdminActsPageDesktop />,
        authOnly: true,
    },
    [AppRoutes.ADMIN_MEMBERS]: {
        path: RoutePath.admin_members,
        element: <AdminMembersPageDesktop />,
        authOnly: true,
    },
    [AppRoutes.ADMIN_MEMBERS_DETAILS]: {
        path: RoutePath.admin_members_details,
        element: <AdminMemberDetailsPageDesktop />,
        authOnly: true,
    },
    [AppRoutes.ADMIN_COMPETITIONS]: {
        path: RoutePath.admin_competitions,
        element: <AdminCompetitionsPageDesktop />,
        authOnly: true,
    },
    [AppRoutes.ADMIN_VACANCIES]: {
        path: RoutePath.admin_vacancies,
        element: <AdminVacanciesPageDesktop />,
        authOnly: true,
    },
    [AppRoutes.ADMIN_RECENT_EVENTS]: {
        path: RoutePath.admin_recent_events,
        element: <AdminRecentEventsPageDesktop />,
        authOnly: true,
    },
};

export const routeConfigMobile: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPageMobile />,
    },
    [AppRoutes.NEWS]: {
        path: RoutePath.news,
        element: <NewsPageMobile />,
    },
    [AppRoutes.NEWS_DETAILS]: {
        path: RoutePath.news_details,
        element: <NewsDetailsPageMobile />,
    },
    [AppRoutes.PARTNERS]: {
        path: RoutePath.partners,
        element: <PartnersPageMobile />,
    },
    [AppRoutes.CONTACTS]: {
        path: RoutePath.contacts,
        element: <ContactsPageMobile />,
    },
    [AppRoutes.ADMINISTRATION]: {
        path: RoutePath.administration,
        element: <AdministrationPageMobile />,
    },
    [AppRoutes.ACADEMIC_COUNCIL]: {
        path: RoutePath.academic_council,
        element: <AcademicCouncilPageMobile />,
    },
    [AppRoutes.COUNCIL_YOUNG_SCIENTISTS]: {
        path: RoutePath.council_young_scientists,
        element: <CouncilYoungScientistsPageMobile />,
    },
    [AppRoutes.SCIENCE_DEPARTMENTS]: {
        path: RoutePath.science_departments,
        element: <ScienceDepartmentsPageMobile />,
    },
    [AppRoutes.ABOUT_INSTITUTE]: {
        path: RoutePath.about_institute,
        element: <AboutInstitutePageMobile />,
    },
    [AppRoutes.EDUCATION]: {
        path: RoutePath.education,
        element: <EducationPageMobile />,
    },
    [AppRoutes.SCIENCE_LIBRARY]: {
        path: RoutePath.science_library,
        element: <ScienceLibraryPageMobile />,
    },
    [AppRoutes.SCIENCE_EDUCATION_ACTIVITY]: {
        path: RoutePath.science_education_activity,
        element: <ScienceEducationActivityPageMobile />,
    },
    [AppRoutes.PROCUREMENT_INFO]: {
        path: RoutePath.procurement_info,
        element: <ProcurementInfoPageMobile />,
    },
    [AppRoutes.COMPETITIONS]: {
        path: RoutePath.competitions,
        element: <CompetitionsPageMobile />,
    },
    [AppRoutes.VACANCIES]: {
        path: RoutePath.vacancies,
        element: <VacanciesPageMobile />,
    },
    [AppRoutes.ACTS]: {
        path: RoutePath.acts,
        element: <ActsPageMobile />,
    },
    [AppRoutes.SERVICES]: {
        path: RoutePath.services,
        element: <ServicesPageMobile />,
    },
    [AppRoutes.MEMBER_DETAILS]: {
        path: RoutePath.member_details,
        element: <MemberDetailsPageMobile />,
    },
    [AppRoutes.CART]: {
        path: RoutePath.cart,
        element: <CartPageMobile />,
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPageMobile />,
    },
    // Админам
    [AppRoutes.ADMIN_AUTH]: {
        path: RoutePath.admin_auth,
        element: <AdminAuthPageDesktop />,
    },
    [AppRoutes.ADMIN_ORDERS]: {
        path: RoutePath.admin_orders,
        element: <AdminOrdersPageDesktop />,
        authOnly: true,
    },
    [AppRoutes.ADMIN_ORDERS_DETAILS]: {
        path: RoutePath.admin_orders_details,
        element: <AdminOrdersDetailsPageDesktop />,
        authOnly: true,
    },
    [AppRoutes.ADMIN_NEWS]: {
        path: RoutePath.admin_news,
        element: <AdminNewsPageDesktop />,
        authOnly: true,
    },
    [AppRoutes.ADMIN_NEWS_DETAILS]: {
        path: RoutePath.admin_news_details,
        element: <AdminNewsDetailsPageDesktop />,
        authOnly: true,
    },
    [AppRoutes.ADMIN_SERVICES]: {
        path: RoutePath.admin_services,
        element: <AdminServicesPageDesktop />,
        authOnly: true,
    },
    [AppRoutes.ADMIN_SERVICES_DETAILS]: {
        path: RoutePath.admin_services_details,
        element: <AdminServicesDetailsPageDesktop />,
        authOnly: true,
    },
    [AppRoutes.ADMIN_ACTS]: {
        path: RoutePath.admin_acts,
        element: <AdminActsPageDesktop />,
        authOnly: true,
    },
    [AppRoutes.ADMIN_MEMBERS]: {
        path: RoutePath.admin_members,
        element: <AdminMembersPageDesktop />,
        authOnly: true,
    },
    [AppRoutes.ADMIN_MEMBERS_DETAILS]: {
        path: RoutePath.admin_members_details,
        element: <AdminMemberDetailsPageDesktop />,
        authOnly: true,
    },
    [AppRoutes.ADMIN_COMPETITIONS]: {
        path: RoutePath.admin_competitions,
        element: <AdminCompetitionsPageDesktop />,
        authOnly: true,
    },
    [AppRoutes.ADMIN_VACANCIES]: {
        path: RoutePath.admin_vacancies,
        element: <AdminVacanciesPageDesktop />,
        authOnly: true,
    },
    [AppRoutes.ADMIN_RECENT_EVENTS]: {
        path: RoutePath.admin_recent_events,
        element: <AdminRecentEventsPageDesktop />,
        authOnly: true,
    },
};
