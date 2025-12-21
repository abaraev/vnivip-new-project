import { classNames } from 'shared/lib/classNames/classNames';
import { FC, HTMLAttributes, memo } from 'react';
import cls from './Card.module.scss';

type CardNumbers =
    4
    | 8
    | 16
    | 32
    | 64
    | 128
    | 10
    | 20
    | 30
    | 40
    | 50
    | 60
    | 70
    | 80
    | 90
    | 100
    | 110
    | 120;

// borders
const borderRClasses: Record<CardNumbers, string> = {
    4: cls.borderR4,
    8: cls.borderR8,
    16: cls.borderR16,
    32: cls.borderR32,
    64: cls.borderR64,
    128: cls.borderR128,
    10: cls.borderR10,
    20: cls.borderR20,
    30: cls.borderR30,
    40: cls.borderR40,
    50: cls.borderR50,
    60: cls.borderR60,
    70: cls.borderR70,
    80: cls.borderR80,
    90: cls.borderR90,
    100: cls.borderR100,
    110: cls.borderR110,
    120: cls.borderR120,
};

const borderRtlClasses: Record<CardNumbers, string> = {
    4: cls.borderRtl4,
    8: cls.borderRtl8,
    16: cls.borderRtl16,
    32: cls.borderRtl32,
    64: cls.borderRtl64,
    128: cls.borderRtl128,
    10: cls.borderRtl10,
    20: cls.borderRtl20,
    30: cls.borderRtl30,
    40: cls.borderRtl40,
    50: cls.borderRtl50,
    60: cls.borderRtl60,
    70: cls.borderRtl70,
    80: cls.borderRtl80,
    90: cls.borderRtl90,
    100: cls.borderRtl100,
    110: cls.borderRtl110,
    120: cls.borderRtl120,
};

const borderRtrClasses: Record<CardNumbers, string> = {
    4: cls.borderRtr4,
    8: cls.borderRtr8,
    16: cls.borderRtr16,
    32: cls.borderRtr32,
    64: cls.borderRtr64,
    128: cls.borderRtr128,
    10: cls.borderRtr10,
    20: cls.borderRtr20,
    30: cls.borderRtr30,
    40: cls.borderRtr40,
    50: cls.borderRtr50,
    60: cls.borderRtr60,
    70: cls.borderRtr70,
    80: cls.borderRtr80,
    90: cls.borderRtr90,
    100: cls.borderRtr100,
    110: cls.borderRtr110,
    120: cls.borderRtr120,
};

const borderRblClasses: Record<CardNumbers, string> = {
    4: cls.borderRbl4,
    8: cls.borderRbl8,
    16: cls.borderRbl16,
    32: cls.borderRbl32,
    64: cls.borderRbl64,
    128: cls.borderRbl128,
    10: cls.borderRbl10,
    20: cls.borderRbl20,
    30: cls.borderRbl30,
    40: cls.borderRbl40,
    50: cls.borderRbl50,
    60: cls.borderRbl60,
    70: cls.borderRbl70,
    80: cls.borderRbl80,
    90: cls.borderRbl90,
    100: cls.borderRbl100,
    110: cls.borderRbl110,
    120: cls.borderRbl120,
};

const borderRbrClasses: Record<CardNumbers, string> = {
    4: cls.borderRbr4,
    8: cls.borderRbr8,
    16: cls.borderRbr16,
    32: cls.borderRbr32,
    64: cls.borderRbr64,
    128: cls.borderRbr128,
    10: cls.borderRbr10,
    20: cls.borderRbr20,
    30: cls.borderRbr30,
    40: cls.borderRbr40,
    50: cls.borderRbr50,
    60: cls.borderRbr60,
    70: cls.borderRbr70,
    80: cls.borderRbr80,
    90: cls.borderRbr90,
    100: cls.borderRbr100,
    110: cls.borderRbr110,
    120: cls.borderRbr120,
};

// paddings
const paddingClasses: Record<CardNumbers, string> = {
    4: cls.padding4,
    8: cls.padding8,
    16: cls.padding16,
    32: cls.padding32,
    64: cls.padding64,
    128: cls.padding128,
    10: cls.padding10,
    20: cls.padding20,
    30: cls.padding30,
    40: cls.padding40,
    50: cls.padding50,
    60: cls.padding60,
    70: cls.padding70,
    80: cls.padding80,
    90: cls.padding90,
    100: cls.padding100,
    110: cls.padding110,
    120: cls.padding120,
};

const paddingTClasses: Record<CardNumbers, string> = {
    4: cls.paddingT4,
    8: cls.paddingT8,
    16: cls.paddingT16,
    32: cls.paddingtl32,
    64: cls.paddingT64,
    128: cls.paddingT128,
    10: cls.paddingT10,
    20: cls.paddingT20,
    30: cls.paddingT30,
    40: cls.paddingT40,
    50: cls.paddingT50,
    60: cls.paddingT60,
    70: cls.paddingT70,
    80: cls.paddingT80,
    90: cls.paddingT90,
    100: cls.paddingT100,
    110: cls.paddingT110,
    120: cls.paddingT120,
};

const paddingRClasses: Record<CardNumbers, string> = {
    4: cls.paddingR4,
    8: cls.paddingR8,
    16: cls.paddingR16,
    32: cls.paddingR32,
    64: cls.paddingR64,
    128: cls.paddingR128,
    10: cls.paddingR10,
    20: cls.paddingR20,
    30: cls.paddingR30,
    40: cls.paddingR40,
    50: cls.paddingR50,
    60: cls.paddingR60,
    70: cls.paddingR70,
    80: cls.paddingR80,
    90: cls.paddingR90,
    100: cls.paddingR100,
    110: cls.paddingR110,
    120: cls.paddingR120,
};

const paddingBClasses: Record<CardNumbers, string> = {
    4: cls.paddingB4,
    8: cls.paddingB8,
    16: cls.paddingB16,
    32: cls.paddingB32,
    64: cls.paddingB64,
    128: cls.paddingB128,
    10: cls.paddingB10,
    20: cls.paddingB20,
    30: cls.paddingB30,
    40: cls.paddingB40,
    50: cls.paddingB50,
    60: cls.paddingB60,
    70: cls.paddingB70,
    80: cls.paddingB80,
    90: cls.paddingB90,
    100: cls.paddingB100,
    110: cls.paddingB110,
    120: cls.paddingB120,
};

const paddingLClasses: Record<CardNumbers, string> = {
    4: cls.paddingL4,
    8: cls.paddingL8,
    16: cls.paddingL16,
    32: cls.paddingL32,
    64: cls.paddingL64,
    128: cls.paddingL128,
    10: cls.paddingL10,
    20: cls.paddingL20,
    30: cls.paddingL30,
    40: cls.paddingL40,
    50: cls.paddingL50,
    60: cls.paddingL60,
    70: cls.paddingL70,
    80: cls.paddingL80,
    90: cls.paddingL90,
    100: cls.paddingL100,
    110: cls.paddingL110,
    120: cls.paddingL120,
};

export enum CardTheme {
    CLEAN = 'clean',
    BLUE_LIGHT = 'blue_light',
}

interface CardProps extends HTMLAttributes<HTMLDivElement>{
    borderR?: CardNumbers;
    borderRtl?: CardNumbers;
    borderRbl?: CardNumbers;
    borderRtr?: CardNumbers;
    borderRbr?: CardNumbers;
    padding?: CardNumbers;
    paddingT?: CardNumbers;
    paddingR?: CardNumbers;
    paddingB?: CardNumbers;
    paddingL?: CardNumbers;
    maxW?: boolean;
    theme?: CardTheme;
}

export const Card: FC<CardProps> = memo((props) => {
    const {
        className,
        borderR,
        borderRtl,
        borderRbl,
        borderRtr,
        borderRbr,
        padding,
        paddingT,
        paddingR,
        paddingB,
        paddingL,
        children,
        maxW,
        theme = CardTheme.CLEAN,
        ...otherProps
    } = props;

    const classes: (string | undefined)[] = [
        className,
        // border
        borderR && borderRClasses[borderR],
        borderRtl && borderRtlClasses[borderRtl],
        borderRtr && borderRtrClasses[borderRtr],
        borderRbl && borderRblClasses[borderRbl],
        borderRbr && borderRbrClasses[borderRbr],
        // padding
        padding && paddingClasses[padding],
        paddingT && paddingTClasses[paddingT],
        paddingR && paddingRClasses[paddingR],
        paddingB && paddingBClasses[paddingB],
        paddingL && paddingLClasses[paddingL],
        maxW ? cls.maxW : undefined,
        cls[theme],
    ];

    return (
        <div
            className={classNames(cls.Card, {}, classes)}
            {...otherProps}
        >
            {children}
        </div>
    );
});
