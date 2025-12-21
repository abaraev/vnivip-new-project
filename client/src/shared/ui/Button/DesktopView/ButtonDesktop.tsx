import { classNames } from 'shared/lib/classNames/classNames';
import { ButtonHTMLAttributes, FC, memo } from 'react';
import ArrowRightIcon from 'shared/assets/icons/arrow-right-18-14-fill-none.svg';
import cls from './ButtonDesktop.module.scss';

export enum ButtonDesktopTheme {
    CLEAN = 'clean',
    PRIMARY = 'primary',
    OUTLINE = 'outline',
    OUTLINE_RED = 'outline_red',
    WHITE = 'white'
}

interface ButtonDesktopProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    theme?: ButtonDesktopTheme;
    width?: number;
}

export const ButtonDesktop: FC<ButtonDesktopProps> = memo((props) => {
    const {
        className,
        children,
        type = 'button',
        theme = ButtonDesktopTheme.CLEAN,
        ...otherProps
    } = props;

    return (
        <button
            type={type}
            className={classNames(cls.ButtonDesktop, {}, [className, cls[theme]])}
            {...otherProps}
        >
            {
                theme === ButtonDesktopTheme.OUTLINE
                || theme === ButtonDesktopTheme.PRIMARY
                    ? [
                        <div
                            className={cls.text}
                        >
                            {children}
                        </div>,
                        <ArrowRightIcon className={cls.arrow} />,
                        <div className={cls.animBg} />,
                    ]
                    : children
            }
        </button>
    );
});
