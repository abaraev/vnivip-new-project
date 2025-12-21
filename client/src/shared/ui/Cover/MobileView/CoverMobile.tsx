import { classNames } from 'shared/lib/classNames/classNames';
import {
    FC, HTMLAttributes, memo, MutableRefObject, useEffect, useRef, useState,
} from 'react';
import cls from './CoverMobile.module.scss';

export enum CoverMobileSize {
    SMALL = 'small',
    LARGE = 'large'
}

interface CoverMobileProps extends HTMLAttributes<HTMLDivElement>{
    className?: string;
    size?: CoverMobileSize;
    images: string[];
}

export const CoverMobile: FC<CoverMobileProps> = memo((props) => {
    const {
        className,
        children,
        size = CoverMobileSize.SMALL,
        images = [],
        ...otherProps
    } = props;
    const [currentSrc, setCurrentSrc] = useState<number>(0);
    const ref = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;

    useEffect(() => {
        ref.current = setTimeout(() => {
            if (currentSrc === images.length - 1) {
                setCurrentSrc(0);
            } else {
                setCurrentSrc((prevState) => prevState + 1);
            }
        }, 20 * 1000);

        return () => {
            clearTimeout(ref.current);
        };
    }, [currentSrc, images.length]);

    return (
        <div
            className={classNames(cls.CoverMobile, {}, [className, cls[size]])}
            {...otherProps}
        >
            <div
                className={cls.content}
            >
                {children}
            </div>
            {images.map((src, index) => (
                <div
                    className={classNames(cls.slide, { [cls.firstSlide]: index === 0, [cls.activeSlide]: currentSrc === index }, [])}
                    aria-hidden={currentSrc !== index}
                >
                    <div
                        className={cls.slideBg}
                    >
                        <img
                            src={src}
                            alt=""
                        />
                    </div>
                    <div
                        className={cls.skewShadow}
                    />
                    <div
                        className={cls.skew}
                    >
                        <div
                            className={cls.skewOver}
                        >
                            <div
                                className={cls.imgWrapper}
                            >
                                <img
                                    src={src}
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
});
