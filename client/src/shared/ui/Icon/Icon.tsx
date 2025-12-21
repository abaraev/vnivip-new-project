import { classNames } from 'shared/lib/classNames/classNames';
import React, { FC, memo, SVGAttributes } from 'react';
import cls from './Icon.module.scss';

export enum IconTheme {
    CLEAN = 'clean',
    CLICKABLE = 'clickable',
    CLICKABLE_BG = 'clickable_bg',
    BLUE = 'blue',
}

interface IconProps extends SVGAttributes<HTMLOrSVGElement> {
    Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
    theme?: IconTheme;
}

export const Icon: FC<IconProps> = memo((props) => {
    const {
        className,
        Svg,
        theme = IconTheme.CLEAN,
        ...otherProps
    } = props;

    const classes = [
        className,
        cls[theme],
    ];

    return (
        <div
            className={classNames(cls.Icon, {}, classes)}
            {...otherProps}
        >
            <Svg className={cls.svg} />
        </div>
    );
});
