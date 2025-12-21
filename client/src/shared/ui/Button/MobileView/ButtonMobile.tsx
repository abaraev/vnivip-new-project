import { classNames } from 'shared/lib/classNames/classNames';
import { ButtonHTMLAttributes, FC, memo } from 'react';
import ArrowRightIcon from 'shared/assets/icons/arrow-right-18-14-fill-none.svg';
import cls from './ButtonMobile.module.scss';

export enum ButtonMobileTheme {
    CLEAN = 'clean',
    PRIMARY = 'primary',
    OUTLINE = 'outline',
    WHITE = 'white'
}

interface ButtonMobileProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    theme?: ButtonMobileTheme;
    width?: number;
}

export const ButtonMobile: FC<ButtonMobileProps> = memo((props) => {
    const {
        className,
        children,
        type = 'button',
        theme = ButtonMobileTheme.CLEAN,
        ...otherProps
    } = props;

    return (
        <button
            type={type}
            className={classNames(cls.ButtonMobile, {}, [className, cls[theme]])}
            {...otherProps}
        >
            {
                theme === ButtonMobileTheme.OUTLINE
                || theme === ButtonMobileTheme.PRIMARY
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
