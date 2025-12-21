import { classNames } from 'shared/lib/classNames/classNames';
import React, {
    FC, HTMLAttributes, memo, useCallback, useState,
} from 'react';
import CornerUpperIcon from 'shared/assets/icons/corner-upper-50-50-black.svg';
import CornerLowerIcon from 'shared/assets/icons/corner-lower-50-50-black.svg';
import ArrowRightIcon from 'shared/assets/icons/arrow-right-50-39-black.svg';
import ArrowLeftIcon from 'shared/assets/icons/arrow-left-50-39-black.svg';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { useMediaQuery } from 'react-responsive';
import cls from './SliderDesktop.module.scss';

interface SliderImage {
    src: string;
    alt: string;
}

interface SliderDesktopProps extends HTMLAttributes<HTMLDivElement>{
    images?: SliderImage[]
}

export const SliderDesktop: FC<SliderDesktopProps> = memo((props) => {
    const {
        className,
        images,
    } = props;
    const isSmallScreen = useMediaQuery({ maxWidth: 1300 });
    const [currentSlide, setCurrentSlide] = useState<number>(0);

    const OnLeftClick = useCallback(() => {
        setCurrentSlide((prevState) => prevState - 1);
    }, []);

    const OnRightClick = useCallback(() => {
        setCurrentSlide((prevState) => prevState + 1);
    }, []);

    return (
        <div className={classNames(cls.SliderDesktop, {}, [className])}>
            <div
                className={cls.sliderWrapper}
            >
                <div
                    className={cls.imgWrapper1}
                >
                    <CornerUpperIcon
                        className={cls.cornerUpper}
                    />
                    <div
                        className={cls.imgWrapper2}
                    >
                        <div
                            className={cls.imagesWrapper}
                            style={{
                                left: `-${currentSlide * 100}%`,
                            }}
                        >
                            {images?.map(({ src, alt }, index) => (
                                <img
                                    alt={alt}
                                    src={src}
                                    className={cls.img}
                                    key={index}
                                />
                            ))}
                        </div>

                    </div>
                    <CornerLowerIcon
                        className={cls.cornerLower}
                    />
                </div>
                <div
                    className={cls.sliderRight}
                >
                    <Text
                        theme={TextTheme.DARK2}
                        size={isSmallScreen ? TextSize.H1_DESKTOP : TextSize.LARGE_DESKTOP}
                    >
                        {`${currentSlide + 1}/${images?.length}`}
                    </Text>
                    <div
                        className={cls.arrowsWrapper}
                    >
                        <ArrowLeftIcon
                            style={currentSlide === 0
                                ? {
                                    pointerEvents: 'none',
                                    opacity: '0.5',
                                    cursor: 'auto',
                                }
                                : undefined}
                            onClick={OnLeftClick}
                            className={cls.arrow}
                        />
                        <ArrowRightIcon
                            style={currentSlide + 1 === images?.length
                                ? {
                                    pointerEvents: 'none',
                                    opacity: '0.5',
                                    cursor: 'auto',
                                }
                                : undefined}
                            onClick={OnRightClick}
                            className={cls.arrow}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
});
