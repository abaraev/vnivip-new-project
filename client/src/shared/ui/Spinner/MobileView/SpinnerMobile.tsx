import { classNames } from 'shared/lib/classNames/classNames';
import { FC, HTMLAttributes, memo } from 'react';
import cls from './SpinnerMobile.module.scss';

export const SpinnerMobile: FC<HTMLAttributes<HTMLDivElement>> = memo(({ className }) => {
    return (
        <div className={classNames(cls.SpinnerMobile, {}, [className])}>
            <div className={cls.circle1}>
                <div className={cls.ball11} />
                <div className={cls.ball12} />
                <div className={cls.ball13} />
            </div>
            <div className={cls.circle2}>
                <div className={cls.ball21} />
                <div className={cls.ball22} />
            </div>
            <div className={cls.circle3}>
                <div className={cls.ball31} />
            </div>
        </div>
    );
});
