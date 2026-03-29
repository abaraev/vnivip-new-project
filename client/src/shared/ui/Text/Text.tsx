import { classNames } from 'shared/lib/classNames/classNames';
import React, { HTMLAttributes, memo, ReactNode } from 'react';
import cls from './Text.module.scss';

export enum TextTheme {
    WHITE = 'white',
    DARK = 'dark',
    DARK2 = 'dark2',
    GREY = 'grey',
    GREY3 = 'grey3',
    BLUE = 'blue',
    BLUE2 = 'blue2',
    RED = 'red',
    GREEN = 'green',
}

export enum TextAlign {
    RIGHT = 'right',
    LEFT = 'left',
    CENTER = 'center',
    JUSTIFY = 'justify',
}

export enum TextSize {
    // desktop
    LARGE_DESKTOP = 'large_desktop',
    H1_DESKTOP = 'h1_desktop',
    H1_LIGHT_DESKTOP = 'h1_light_desktop',
    H2_DESKTOP = 'h2_desktop',
    H2_LIGHT_DESKTOP = 'h2_light_desktop',
    H2_MEDIUM_DESKTOP = 'h2_medium_desktop',
    H3_DESKTOP = 'h3_desktop',
    H3_LIGHT_DESKTOP = 'h3_light_desktop',
    H4_DESKTOP = 'h4_desktop',
    H4_MEDIUM_DESKTOP = 'h4_medium_desktop',
    H4_ITALIC_DESKTOP = 'h4_italic_desktop',
    BODY_L_LIGHT_DESKTOP = 'body_l_light_desktop',
    BODY_L_DESKTOP = 'body_l_desktop',
    BODY_L_MEDIUM_DESKTOP = 'body_l_medium_desktop',
    BODY_DESKTOP = 'body_desktop',
    BODY_LIGHT_DESKTOP = 'body_light_desktop',
    BODY_LIGHT_ITALIC_DESKTOP = 'body_light_italic_desktop',
    BODY_MEDIUM_DESKTOP = 'body_medium_desktop',
    BODY_S_DESKTOP = 'body_s_desktop',
    BODY_S_LIGHT_ITALIC_DESKTOP = 'body_s_light_italic_desktop',
    BODY_S_MEDIUM_DESKTOP = 'body_s_medium_desktop',
    BODY_XS_DESKTOP = 'body_xs_desktop',
    BODY_MINI_DESKTOP = 'body_mini_desktop',
    BODY_MINI_MEDIUM_DESKTOP = 'body_mini_medium_desktop',
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

interface TextProps extends HTMLAttributes<HTMLDivElement>{
    className?: string;
    children?: ReactNode;
    theme: TextTheme;
    align?: TextAlign;
    size: TextSize;
    textIndent?: boolean;
}

type TextTagType = 'h1' | 'h2' | 'h3' | 'h4' | 'p'

const mapSizeToTextTag: Record<TextSize, TextTagType> = {
    // desktop
    [TextSize.LARGE_DESKTOP]: 'h1',
    [TextSize.H1_DESKTOP]: 'h1',
    [TextSize.H1_LIGHT_DESKTOP]: 'h1',
    [TextSize.H2_DESKTOP]: 'h2',
    [TextSize.H2_LIGHT_DESKTOP]: 'h2',
    [TextSize.H2_MEDIUM_DESKTOP]: 'h2',
    [TextSize.H3_DESKTOP]: 'h3',
    [TextSize.H3_LIGHT_DESKTOP]: 'h3',
    [TextSize.H4_DESKTOP]: 'h4',
    [TextSize.H4_MEDIUM_DESKTOP]: 'h4',
    [TextSize.H4_ITALIC_DESKTOP]: 'h4',
    [TextSize.BODY_L_LIGHT_DESKTOP]: 'p',
    [TextSize.BODY_L_DESKTOP]: 'p',
    [TextSize.BODY_L_MEDIUM_DESKTOP]: 'p',
    [TextSize.BODY_DESKTOP]: 'p',
    [TextSize.BODY_LIGHT_DESKTOP]: 'p',
    [TextSize.BODY_LIGHT_ITALIC_DESKTOP]: 'p',
    [TextSize.BODY_MEDIUM_DESKTOP]: 'p',
    [TextSize.BODY_S_DESKTOP]: 'p',
    [TextSize.BODY_S_LIGHT_ITALIC_DESKTOP]: 'p',
    [TextSize.BODY_S_MEDIUM_DESKTOP]: 'p',
    [TextSize.BODY_XS_DESKTOP]: 'p',
    [TextSize.BODY_MINI_DESKTOP]: 'p',
    [TextSize.BODY_MINI_MEDIUM_DESKTOP]: 'p',
    [TextSize.BUTTON_DESKTOP]: 'p',
    [TextSize.MENU_DESKTOP]: 'p',
    [TextSize.MENU_CAPS_DESKTOP]: 'p',
    [TextSize.MENU_LARGE_ITALIC_DESKTOP]: 'p',
    [TextSize.MENU_LARGE_ITALIC_MEDIUM_DESKTOP]: 'p',
    // mobile
    [TextSize.LARGE_MOBILE]: 'h1',
    [TextSize.H1_MOBILE]: 'h1',
    [TextSize.H1_MINI_MOBILE]: 'h1',
    [TextSize.H1_MINI_ITALIC_MOBILE]: 'h1',
    [TextSize.H2_MOBILE]: 'h2',
    [TextSize.H2_MEDIUM_MOBILE]: 'h2',
    [TextSize.H2_ITALIC_MOBILE]: 'h2',
    [TextSize.H3_MOBILE]: 'h3',
    [TextSize.H3_MEDIUM_MOBILE]: 'h3',
    [TextSize.BODY_L_MOBILE]: 'p',
    [TextSize.BODY_L_LIGHT_MOBILE]: 'p',
    [TextSize.BODY_L_MEDIUM_MOBILE]: 'p',
    [TextSize.BODY_MOBILE]: 'p',
    [TextSize.BODY_LIGHT_ITALIC_MOBILE]: 'p',
    [TextSize.BODY_MEDIUM_MOBILE]: 'p',
    [TextSize.BODY_S_MOBILE]: 'p',
    [TextSize.BODY_S_MEDIUM_MOBILE]: 'p',
    [TextSize.BODY_MINI_MOBILE]: 'p',
};

export const Text = memo((props: TextProps) => {
    const {
        className,
        theme,
        align = TextAlign.LEFT,
        size,
        children,
        textIndent = false,
        ...otherProps
    } = props;

    const TextTag = mapSizeToTextTag[size];

    const classes = [
        className,
        cls[theme],
        cls[size],
        cls[align],
        textIndent ? cls.textIndent : undefined,
    ];

    return (
        <TextTag
            className={classNames(cls.Text, {}, classes)}
            {...otherProps}
        >
            {children}
        </TextTag>
    );
});
