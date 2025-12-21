import { classNames } from 'shared/lib/classNames/classNames';
import {
    DetailedHTMLProps, HTMLAttributes, memo, ReactNode,
} from 'react';
import cls from './Flex.module.scss';

type FlexJustify = 'start' | 'center' | 'end' | 'between';
type FlexAlign = 'start' | 'center' | 'end';
type FlexDirection = 'row' | 'column';
type FlexWrap = 'nowrap' | 'wrap' | 'reverse';
type FlexNumbers =
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
    | 120
    | 130
    | 140
    | 150
    | 160
    | 170
    | 180
    | 190
    | 200
    | 210
    | 220
    | 230
    | 240
    | 250;

const justifyClasses: Record<FlexJustify, string> = {
    start: cls.justifyStart,
    center: cls.justifyCenter,
    end: cls.justifyEnd,
    between: cls.justifyBetween,
};

const alingClasses: Record<FlexAlign, string> = {
    start: cls.alignStart,
    center: cls.alignCenter,
    end: cls.alignEnd,
};

const directionClasses: Record<FlexDirection, string> = {
    row: cls.directionRow,
    column: cls.directionColumn,
};

const gapClasses: Record<FlexNumbers, string> = {
    4: cls.gap4,
    8: cls.gap8,
    16: cls.gap16,
    32: cls.gap32,
    64: cls.gap64,
    128: cls.gap128,
    10: cls.gap10,
    20: cls.gap20,
    30: cls.gap30,
    40: cls.gap40,
    50: cls.gap50,
    60: cls.gap60,
    70: cls.gap70,
    80: cls.gap80,
    90: cls.gap90,
    100: cls.gap100,
    110: cls.gap110,
    120: cls.gap120,
    130: cls.gap130,
    140: cls.gap140,
    150: cls.gap150,
    160: cls.gap160,
    170: cls.gap170,
    180: cls.gap180,
    190: cls.gap190,
    200: cls.gap200,
    210: cls.gap210,
    220: cls.gap220,
    230: cls.gap230,
    240: cls.gap240,
    250: cls.gap250,
};

const wrapClasses: Record<FlexWrap, string> = {
    nowrap: cls.flexNoWrap,
    wrap: cls.flexWrap,
    reverse: cls.flexReverse,
};

// paddings
const paddingClasses: Record<FlexNumbers, string> = {
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
    130: cls.padding130,
    140: cls.paddingL140,
    150: cls.paddingL150,
    160: cls.paddingL160,
    170: cls.paddingL170,
    180: cls.paddingL180,
    190: cls.paddingL190,
    200: cls.paddingL200,
    210: cls.paddingL210,
    220: cls.paddingL220,
    230: cls.paddingL230,
    240: cls.paddingL240,
    250: cls.paddingL250,
};

const paddingTClasses: Record<FlexNumbers, string> = {
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
    130: cls.paddingT130,
    140: cls.paddingL140,
    150: cls.paddingL150,
    160: cls.paddingL160,
    170: cls.paddingL170,
    180: cls.paddingL180,
    190: cls.paddingL190,
    200: cls.paddingL200,
    210: cls.paddingL210,
    220: cls.paddingL220,
    230: cls.paddingL230,
    240: cls.paddingL240,
    250: cls.paddingL250,
};

const paddingRClasses: Record<FlexNumbers, string> = {
    4: cls.paddingR4,
    8: cls.paddingR8,
    16: cls.paddingR16,
    32: cls.paddingtr32,
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
    130: cls.paddingR130,
    140: cls.paddingL140,
    150: cls.paddingL150,
    160: cls.paddingL160,
    170: cls.paddingL170,
    180: cls.paddingL180,
    190: cls.paddingL190,
    200: cls.paddingL200,
    210: cls.paddingL210,
    220: cls.paddingL220,
    230: cls.paddingL230,
    240: cls.paddingL240,
    250: cls.paddingL250,
};

const paddingBClasses: Record<FlexNumbers, string> = {
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
    130: cls.paddingB130,
    140: cls.paddingL140,
    150: cls.paddingL150,
    160: cls.paddingL160,
    170: cls.paddingL170,
    180: cls.paddingL180,
    190: cls.paddingL190,
    200: cls.paddingL200,
    210: cls.paddingL210,
    220: cls.paddingL220,
    230: cls.paddingL230,
    240: cls.paddingL240,
    250: cls.paddingL250,
};

const paddingLClasses: Record<FlexNumbers, string> = {
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
    130: cls.paddingL130,
    140: cls.paddingL140,
    150: cls.paddingL150,
    160: cls.paddingL160,
    170: cls.paddingL170,
    180: cls.paddingL180,
    190: cls.paddingL190,
    200: cls.paddingL200,
    210: cls.paddingL210,
    220: cls.paddingL220,
    230: cls.paddingL230,
    240: cls.paddingL240,
    250: cls.paddingL250,
};

type DivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

type ContentTags = 'section' | 'article' | 'aside' | 'header' | 'footer';

export interface FlexProps extends DivProps {
    className?: string;
    children?: ReactNode;
    justify?: FlexJustify;
    align?: FlexAlign;
    direction?: FlexDirection;
    gap?: FlexNumbers;
    grow?: boolean;
    maxW?: boolean;
    maxH?: boolean;
    wrap?: FlexWrap;
    padding?: FlexNumbers;
    paddingT?: FlexNumbers;
    paddingR?: FlexNumbers;
    paddingB?: FlexNumbers;
    paddingL?: FlexNumbers;
    ContentTag?: ContentTags;
}

export const Flex = memo((props: FlexProps) => {
    const {
        className,
        children = null,
        justify = 'start',
        direction = 'row',
        align = 'start',
        gap,
        grow,
        maxW,
        maxH,
        wrap = 'nowrap',
        padding,
        paddingR,
        paddingT,
        paddingL,
        paddingB,
        ContentTag = 'div',
        style,
        ...otherProps
    } = props;

    const classes = [
        className,
        justifyClasses[justify],
        alingClasses[align],
        directionClasses[direction],
        gap && gapClasses[gap],
        wrapClasses[wrap],
        grow ? cls.grow : undefined,
        maxW ? cls.maxW : undefined,
        maxH ? cls.maxH : undefined,

        // padding
        padding && paddingClasses[padding],
        paddingT && paddingTClasses[paddingT],
        paddingR && paddingRClasses[paddingR],
        paddingB && paddingBClasses[paddingB],
        paddingL && paddingLClasses[paddingL],
    ];

    return (
        <ContentTag
            className={classNames(cls.Flex, {}, classes)}
            {...otherProps}
            style={style}
        >
            {children}
        </ContentTag>
    );
});
