import { classNames } from 'shared/lib/classNames/classNames';
import React, {
    memo, MutableRefObject, TextareaHTMLAttributes, useEffect, useRef,
} from 'react';
import cls from './TextArea.module.scss';

export enum TextAreaTheme {
    WHITE = 'white',
    DARK = 'dark',
    DARK2 = 'dark2',
    GREY = 'grey',
    GREY3 = 'grey3',
    BLUE = 'blue',
    BLUE2 = 'blue2',
    RED = 'red',
}

export enum TextAreaAlign {
    RIGHT = 'right',
    LEFT = 'left',
    CENTER = 'center',
    JUSTIFY = 'justify',
}

export enum TextAreaSize {
    // desktop
    LARGE_DESKTOP = 'large_desktop',
    H1_DESKTOP = 'h1_desktop',
    H1_LIGHT_DESKTOP = 'h1_light_desktop',
    H2_DESKTOP = 'h2_desktop',
    H2_LIGHT_DESKTOP = 'h2_light_desktop',
    H3_DESKTOP = 'h3_desktop',
    H4_DESKTOP = 'h4_desktop',
    H4_MEDIUM_DESKTOP = 'h4_medium_desktop',
    H4_ITALIC_DESKTOP = 'h4_italic_desktop',
    BODY_L_LIGHT_DESKTOP = 'body_l_light_desktop',
    BODY_L_DESKTOP = 'body_l_desktop',
    BODY_DESKTOP = 'body_desktop',
    BODY_LIGHT_ITALIC_DESKTOP = 'body_light_italic_desktop',
    BODY_MEDIUM_DESKTOP = 'body_medium_desktop',
    BODY_S_DESKTOP = 'body_s_desktop',
    BODY_S_MEDIUM_DESKTOP = 'body_s_medium_desktop',
    BODY_MINI_DESKTOP = 'body_mini_desktop',
    BUTTON_DESKTOP = 'button_desktop',
    MENU_DESKTOP = 'menu_desktop',
    MENU_CAPS_DESKTOP = 'menu_caps_desktop',
    MENU_LARGE_ITALIC_DESKTOP = 'menu_large_italic_desktop',
    MENU_LARGE_ITALIC_MEDIUM_DESKTOP = 'menu_large_italic_medium_desktop',
    // mobile
    LARGE_MOBILE = 'large_mobile',
    H1_MOBILE = 'h1_mobile',
    H1_MINI_MOBILE = 'h1_mini_mobile',
    H1_MINI_ITALIC_MOBILE = 'h1_mini_italic_mobile',
    H2_MOBILE = 'h2_mobile',
    H2_MEDIUM_MOBILE = 'h2_medium_mobile',
    H2_ITALIC_MOBILE = 'h2_italic_mobile',
    H3_MOBILE = 'h3_mobile',
    H3_MEDIUM_MOBILE = 'h3_medium_mobile',
    BODY_L_MOBILE = 'body_l_mobile',
    BODY_L_LIGHT_MOBILE = 'body_l_light_mobile',
    BODY_L_MEDIUM_MOBILE = 'body_l_medium_mobile',
    BODY_MOBILE = 'body_mobile',
    BODY_LIGHT_ITALIC_MOBILE = 'body_light_italic_mobile',
    BODY_MEDIUM_MOBILE = 'body_medium_mobile',
    BODY_S_MOBILE = 'body_s_mobile',
    BODY_S_MEDIUM_MOBILE = 'body_s_medium_mobile',
    BODY_MINI_MOBILE = 'body_mini_mobile',
}

type HTMLTextAreaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'value' | 'onChange'>

interface TextAreaProps extends HTMLTextAreaProps {
    className?: string;
    value: string;
    theme: TextAreaTheme;
    align?: TextAreaAlign;
    size: TextAreaSize;
    textIndent?: boolean;
    onChange?: (value: string) => void;
}

export const TextArea = memo((props: TextAreaProps) => {
    const {
        className,
        theme,
        align = TextAreaAlign.LEFT,
        size,
        value,
        textIndent = false,
        onChange,
        ...otherProps
    } = props;
    const ref = useRef() as MutableRefObject<HTMLTextAreaElement>;

    useEffect(() => {
        if (ref.current) {
            ref.current.style.height = 'auto';
            ref.current.style.height = `${ref.current.scrollHeight + 20}px`;
        }
        /* eslint-disable react-hooks/exhaustive-deps */
    }, [ref.current]);

    const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange?.(e.target.value);
        if (ref.current) {
            ref.current.style.height = 'auto';
            ref.current.style.height = `${ref.current.scrollHeight + 20}px`;
        }
    };

    const classes = [
        className,
        cls[theme],
        cls[size],
        cls[align],
        textIndent ? cls.textIndent : undefined,
    ];

    return (
        <textarea
            spellCheck={false}
            ref={ref}
            value={value}
            onChange={onChangeHandler}
            className={classNames(cls.TextArea, {}, classes)}
            {...otherProps}
        />
    );
});
