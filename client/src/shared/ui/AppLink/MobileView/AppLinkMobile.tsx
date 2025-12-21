import { classNames } from 'shared/lib/classNames/classNames';
import { Link, LinkProps } from 'react-router-dom';
import React, { FC, memo } from 'react';
import cls from './AppLinkMobile.module.scss';

export enum AppLinkMobileTheme {
    WHITE = 'white',
    GREY_SMALL = 'grey_small',
    CLEAN = 'clean',
    GREY = 'grey',
    DARK2 = 'dark2',
}

interface AppLinkMobileProps extends LinkProps {
    theme?: AppLinkMobileTheme;
    Svg?: React.VFC<React.SVGProps<SVGSVGElement>>;
}

export const AppLinkMobile: FC<AppLinkMobileProps> = memo((props) => {
    const {
        to,
        className,
        children = null,
        Svg,
        theme = AppLinkMobileTheme.CLEAN,
        ...otherProps
    } = props;

    return (
        <Link
            to={to}
            className={classNames(cls.AppLinkMobile, {}, [className, cls[theme]])}
            {...otherProps}
        >
            {Svg ? <Svg /> : null}
            {children}
        </Link>
    );
});
