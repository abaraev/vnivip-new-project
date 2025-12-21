import { classNames } from 'shared/lib/classNames/classNames';
import { Link, LinkProps } from 'react-router-dom';
import React, { FC, memo } from 'react';
import cls from './AppLinkDesktop.module.scss';

export enum AppLinkDesktopTheme {
    WHITE = 'white',
    WHITE2 = 'white2',
    CLEAN = 'clean',
    GREY = 'grey',
    GREY_SMALL = 'grey_small',
    DARK2 = 'dark2',
}

interface AppLinkDesktopProps extends LinkProps {
    theme?: AppLinkDesktopTheme;
    Svg?: React.VFC<React.SVGProps<SVGSVGElement>>;
}

export const AppLinkDesktop: FC<AppLinkDesktopProps> = memo((props) => {
    const {
        to,
        className,
        children = null,
        Svg,
        theme = AppLinkDesktopTheme.CLEAN,
        ...otherProps
    } = props;

    return (
        <Link
            to={to}
            className={classNames(cls.AppLinkDesktop, {}, [className, cls[theme]])}
            {...otherProps}
        >
            {Svg ? <Svg /> : null}
            {children}
        </Link>
    );
});
