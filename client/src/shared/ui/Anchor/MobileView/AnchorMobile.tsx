import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import React, { FC, memo } from 'react';
import cls from './AnchorMobile.module.scss';

export enum AnchorMobileTheme {
    WHITE = 'white',
    CLEAN = 'clean',
    BLUE = 'blue',
}

export enum AnchorAlign {
    RIGHT = 'right',
    LEFT = 'left',
    CENTER = 'center',
    JUSTIFY = 'justify',
}

interface AnchorMobileProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    className?: string;
    theme?: AnchorMobileTheme;
    Svg?: React.VFC<React.SVGProps<SVGSVGElement>>;
    align?: AnchorAlign;
}

export const AnchorMobile: FC<AnchorMobileProps> = memo((props) => {
    const {
        className,
        children,
        href = '#',
        target = '_blank',
        theme = AnchorMobileTheme.CLEAN,
        Svg,
        align = AnchorAlign.LEFT,
        ...otherProps
    } = props;
    const { t } = useTranslation();

    return (
        <a
            {...otherProps}
            className={classNames(cls.AnchorMobile, {}, [className, cls[theme], cls[align]])}
            href={href}
            target={target}
        >
            {Svg ? <Svg /> : null}
            {children}
        </a>
    );
});
