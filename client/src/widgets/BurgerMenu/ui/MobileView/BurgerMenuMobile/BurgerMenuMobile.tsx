import { classNames } from 'shared/lib/classNames/classNames';
import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Portal } from 'shared/ui/Portal/Portal';
import { HStack, VStack } from 'shared/ui/Stack';
import { LangSwitcher } from 'widgets/LangSwitcher';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { AppLinkMobile, AppLinkMobileTheme } from 'shared/ui/AppLink/MobileView/AppLinkMobile';
import {
    BurgerMenuSpoilerMobile,
} from '../BurgerMenuSpoilerMobile/BurgerMenuSpoilerMobile';
import { BurgerMenuDataSection } from '../../../model/types/BurgerMenuData';
import cls from './BurgerMenuMobile.module.scss';

interface BurgerMenuMobileProps {
    className?: string;
    isOpen?: boolean;
    onClose?: () => void;
}

export const BurgerMenuMobile = memo((props: BurgerMenuMobileProps) => {
    const {
        className,
        isOpen,
        onClose,
    } = props;
    const { t } = useTranslation();

    const aboutInstituteSection: BurgerMenuDataSection = {
        path: RoutePath.about_institute,
        text: t('Об институте'),
        subSections: [
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
        ],
    };

    const educationSection: BurgerMenuDataSection = {
        path: RoutePath.science_education_activity,
        text: t('Научная и образовательная деятельность'),
        subSections: [
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
        ],
    };

    const servicesSection: BurgerMenuDataSection = {
        path: RoutePath.services,
        text: t('Услуги'),
        subSections: [
            {
                path: RoutePath.engineering,
                text: t('Инженерно-технический раздел'),
            },
            {
                path: RoutePath.clinic,
                text: t('Доклинические и клинические исследования'),
            },
            {
                path: RoutePath.cart,
                text: t('Корзина'),
            },
        ],
    };

    const closeHandler = useCallback(() => {
        onClose?.();
    }, [onClose]);

    const onContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <Portal>
            <div className={classNames(cls.BurgerMenuMobile, { [cls.opened]: isOpen }, [className])}>
                <div
                    className={cls.overlay}
                    onClick={closeHandler}
                >
                    <div
                        className={cls.content}
                        onClick={onContentClick}
                    >
                        <VStack
                            maxW
                            maxH
                            paddingT={70}
                            gap={20}
                        >
                            <HStack
                                maxW
                                justify="end"
                                align="center"
                                paddingL={50}
                                paddingR={50}
                            >
                                {/* <Icon */}
                                {/*    Svg={searchIcon} */}
                                {/*    theme={IconTheme.CLICKABLE} */}
                                {/* /> */}
                                <LangSwitcher />
                            </HStack>
                            <VStack
                                maxW
                                className={cls.sectionsWrapper}
                                padding={20}
                                paddingB={70}
                            >
                                <BurgerMenuSpoilerMobile
                                    section={aboutInstituteSection}
                                    onClose={onClose}
                                />
                                <BurgerMenuSpoilerMobile
                                    section={educationSection}
                                    onClose={onClose}
                                />
                                <BurgerMenuSpoilerMobile
                                    section={servicesSection}
                                    onClose={onClose}
                                />
                                <HStack
                                    maxW
                                    gap={50}
                                    paddingT={30}
                                    paddingB={30}
                                    justify="center"
                                >
                                    <AppLinkMobile
                                        theme={AppLinkMobileTheme.WHITE}
                                        to={RoutePath.news}
                                        onClick={closeHandler}
                                    >
                                        {t('Новости')}
                                    </AppLinkMobile>
                                    <AppLinkMobile
                                        theme={AppLinkMobileTheme.WHITE}
                                        to={RoutePath.contacts}
                                        onClick={closeHandler}
                                    >
                                        {t('Контакты')}
                                    </AppLinkMobile>
                                </HStack>
                            </VStack>
                        </VStack>
                    </div>
                </div>
            </div>
        </Portal>
    );
});
