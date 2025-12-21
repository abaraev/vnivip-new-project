import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import React, { FC, memo } from 'react';
import cls from './AnchorDesktop.module.scss';

export enum AnchorDesktopTheme {
    WHITE = 'white',
    CLEAN = 'clean',
    BLUE = 'blue',
}

interface AnchorDesktopProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    className?: string;
    theme?: AnchorDesktopTheme;
    Svg?: React.VFC<React.SVGProps<SVGSVGElement>>;
}

export const AnchorDesktop: FC<AnchorDesktopProps> = memo((props) => {
    const {
        className,
        children,
        href = '#',
        target = '_blank',
        theme = AnchorDesktopTheme.CLEAN,
        Svg,
        ...otherProps
    } = props;
    const { t } = useTranslation();

    return (
        <a
            {...otherProps}
            className={classNames(cls.AnchorDesktop, {}, [className, cls[theme]])}
            href={href}
            target={target}
        >
            {Svg ? <Svg /> : null}
            {children}
        </a>
    );
});
