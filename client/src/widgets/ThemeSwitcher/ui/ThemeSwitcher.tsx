import { classNames } from 'shared/lib/classNames/classNames';
import React, { memo } from 'react';
import { useTheme } from 'app/providers/ThemeProvider';
import { useTranslation } from 'react-i18next';
import cls from './ThemeSwitcher.module.scss';

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
    const { toggleTheme } = useTheme();
    const { t } = useTranslation();

    const onToggle = () => {
        toggleTheme();
    };

    return (
        <button
            className={classNames(cls.ThemeSwitcher, {}, [className])}
            onClick={onToggle}
            type="button"
        >
            toggle theme
        </button>
    );
});
