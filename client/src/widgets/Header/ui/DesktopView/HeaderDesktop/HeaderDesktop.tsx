import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Icon, IconTheme } from 'shared/ui/Icon/Icon';
import mainLogo from 'shared/assets/icons/main-logo.svg';
import { HStack } from 'shared/ui/Stack';
import { LangSwitcher } from 'widgets/LangSwitcher';
import { Dropdown, DropdownData } from 'shared/ui/Dropdown/Dropdown';
import { AppLinkDesktop, AppLinkDesktopTheme } from 'shared/ui/AppLink/DesktopView/AppLinkDesktop';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { HEADER_ID } from 'shared/const/components';
import { useLocation } from 'react-router-dom';
import { useModal } from 'shared/lib/hooks/useModal/useModal';
import MediaQuery from 'react-responsive';
import { Portal } from 'shared/ui/Portal/Portal';
import burgerMenuActiveIcon from 'shared/assets/icons/burger-menu-33-33-white-active.svg';
import burgerMenuDefaultIcon from 'shared/assets/icons/burger-menu-33-33-white-default.svg';
import { BurgerMenuDesktop } from 'widgets/BurgerMenu';
import cls from './HeaderDesktop.module.scss';

interface HeaderDesktopProps {
    className?: string;
    isFixed?: boolean;
}

export const HeaderDesktop = memo((props: HeaderDesktopProps) => {
    const {
        className,
        isFixed = false,
    } = props;
    const { t } = useTranslation();
    const { pathname } = useLocation();
    const [isOpenBurgerMenu, bindBurgerMenu] = useModal();

    if (pathname.includes('admin_')) {
        return null;
    }

    const aboutInstituteLinks: DropdownData[] = [
        {
            path: RoutePath.administration,
            text: t('Администрация'),
        },
        {
            path: RoutePath.competitions,
            text: t('Объявления о конкурсах'),
        },
        {
            path: RoutePath.acts,
            text: t('Нормативно-правовые акты'),
        },
        {
            path: RoutePath.procurement_info,
            text: t('Информация о закупках'),
        },
        {
            path: RoutePath.vacancies,
            text: t('Вакансии'),
        },
        {
            path: RoutePath.partners,
            text: t('Партнеры'),
        },
    ];

    const educationLinks: DropdownData[] = [
        {
            path: RoutePath.science_departments,
            text: t('Научные отделы'),
        },
        {
            path: RoutePath.academic_council,
            text: t('Ученый совет'),
        },
        {
            path: RoutePath.council_young_scientists,
            text: t('Совет молодых ученых'),
        },
        {
            path: RoutePath.education,
            text: t('Образование'),
        },
        {
            path: RoutePath.science_library,
            text: t('Научная библиотека'),
        },
    ];

    const servicesLinks: DropdownData[] = [
        {
            path: RoutePath.cart,
            text: t('Корзина'),
        },
    ];

    const mods: Mods = {
        [cls.fixed]: isFixed,
    };

    return (
        <HStack
            className={classNames(cls.HeaderDesktop, mods, [className])}
            id={HEADER_ID}
            ContentTag="header"
            justify="between"
            align="center"
        >
            <AppLinkDesktop
                to={RoutePath.main}
            >
                <Icon
                    Svg={mainLogo}
                    theme={IconTheme.CLICKABLE}
                />
            </AppLinkDesktop>

            <HStack
                gap={50}
                maxH
                align="center"
                className={cls.dropdownsWrapper}
            >
                <Dropdown
                    sectionName={t('Об институте')}
                    sectionPath={RoutePath.about_institute}
                    data={aboutInstituteLinks}
                    key={1}
                />
                <Dropdown
                    sectionName={t('Научная и образовательная деятельность')}
                    sectionPath={RoutePath.science_education_activity}
                    data={educationLinks}
                    key={2}
                />
                <Dropdown
                    sectionName={t('Услуги')}
                    sectionPath={RoutePath.services}
                    data={servicesLinks}
                    key={3}
                />
                <AppLinkDesktop
                    theme={AppLinkDesktopTheme.WHITE}
                    to={RoutePath.news}
                >
                    {t('Новости')}
                </AppLinkDesktop>
                <AppLinkDesktop
                    theme={AppLinkDesktopTheme.WHITE}
                    to={RoutePath.contacts}
                >
                    {t('Контакты')}
                </AppLinkDesktop>
            </HStack>

            <HStack
                gap={30}
                className={cls.btns}
                maxH
                align="center"
            >
                {isOpenBurgerMenu && (
                    <Portal>
                        <LangSwitcher
                            className={cls.langSwitcherAbsolute}
                        />
                    </Portal>
                )}
                {!isOpenBurgerMenu && (
                    <LangSwitcher />
                )}
                <MediaQuery
                    maxWidth={1300}
                >
                    {isOpenBurgerMenu && (
                        <Portal>
                            <Icon
                                Svg={burgerMenuActiveIcon}
                                theme={IconTheme.CLICKABLE}
                                onClick={bindBurgerMenu.onCloseModal}
                                className={cls.burgerIconAbsolute}
                            />
                        </Portal>
                    )}
                    <Icon
                        Svg={burgerMenuDefaultIcon}
                        theme={IconTheme.CLICKABLE}
                        onClick={bindBurgerMenu.onShowModal}
                    />
                    <BurgerMenuDesktop
                        isOpen={isOpenBurgerMenu}
                        onClose={bindBurgerMenu.onCloseModal}
                    />
                </MediaQuery>
                {/* <Icon */}
                {/*    Svg={searchIcon} */}
                {/*    theme={IconTheme.CLICKABLE} */}
                {/* /> */}
            </HStack>
        </HStack>
    );
});
