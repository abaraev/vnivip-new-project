import { classNames } from 'shared/lib/classNames/classNames';
import { CSSProperties, memo, ReactNode } from 'react';
import cls from './Skeleton.module.scss';

interface SkeletonProps {
    className?: string;
    height?: string | number;
    width?: string | number;
    borderR?: string;
    style?: CSSProperties;
    children?: ReactNode;
}

export const Skeleton = memo((props: SkeletonProps) => {
    const {
        className,
        height,
        width,
        borderR,
        children,
        style,
    } = props;

    const styles: CSSProperties = {
        width,
        height,
        borderRadius: borderR,
        ...style,
    };

    return (
        <div
            className={classNames(cls.Skeleton, {}, [className])}
            style={styles}
        >
            {children}
        </div>
    );
});
