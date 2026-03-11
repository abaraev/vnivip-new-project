import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import React, { memo } from 'react';
import { ButtonDesktop, ButtonDesktopTheme } from 'shared/ui/Button/DesktopView/ButtonDesktop';
import cls from './LangSwitcher.module.scss';

interface LangSwitcherProps {
    className?: string;
}

export const LangSwitcher = memo(({ className }: LangSwitcherProps) => {
    const { t, i18n } = useTranslation();

    const toggleLang = () => {
        switch (i18n.language) {
        case 'ru': {
            i18n.changeLanguage('en');
            break;
        }
        case 'en': {
            i18n.changeLanguage('chi');
            break;
        }
        case 'chi': {
            i18n.changeLanguage('ru');
            break;
        }
        }
    };

    return (
        <ButtonDesktop
            className={classNames(cls.LangSwitcher, {}, [className])}
            onClick={toggleLang}
            theme={ButtonDesktopTheme.WHITE}
        >
            {t('Короткий язык')}
        </ButtonDesktop>
    );
});
