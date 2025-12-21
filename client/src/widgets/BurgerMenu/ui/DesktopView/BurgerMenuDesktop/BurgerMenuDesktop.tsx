import { classNames } from 'shared/lib/classNames/classNames';
import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Portal } from 'shared/ui/Portal/Portal';
import { HStack, VStack } from 'shared/ui/Stack';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { AppLinkDesktop, AppLinkDesktopTheme } from 'shared/ui/AppLink/DesktopView/AppLinkDesktop';
import { BurgerMenuSpoilerDesktop } from '../BurgerMenuSpoilerDesktop/BurgerMenuSpoilerDesktop';
import { BurgerMenuDataSection } from '../../../model/types/BurgerMenuData';
import cls from './BurgerMenuDesktop.module.scss';

interface BurgerMenuDesktopProps {
    className?: string;
    isOpen?: boolean;
    onClose?: () => void;
}

export const BurgerMenuDesktop = memo((props: BurgerMenuDesktopProps) => {
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
            <div className={classNames(cls.BurgerMenuDesktop, { [cls.opened]: isOpen }, [className])}>
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
                            paddingT={80}
                            gap={20}
                        >
                            <VStack
                                maxW
                                className={cls.sectionsWrapper}
                                padding={20}
                                paddingB={70}
                            >
                                <BurgerMenuSpoilerDesktop
                                    section={aboutInstituteSection}
                                    onClose={onClose}
                                />
                                <BurgerMenuSpoilerDesktop
                                    section={educationSection}
                                    onClose={onClose}
                                />
                                <BurgerMenuSpoilerDesktop
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
                                    <AppLinkDesktop
                                        theme={AppLinkDesktopTheme.WHITE}
                                        to={RoutePath.news}
                                        onClick={closeHandler}
                                    >
                                        {t('Новости')}
                                    </AppLinkDesktop>
                                    <AppLinkDesktop
                                        theme={AppLinkDesktopTheme.WHITE}
                                        to={RoutePath.contacts}
                                        onClick={closeHandler}
                                    >
                                        {t('Контакты')}
                                    </AppLinkDesktop>
                                </HStack>
                            </VStack>
                        </VStack>
                    </div>
                </div>
            </div>
        </Portal>
    );
});
