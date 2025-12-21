import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import cls from './AddNewNews.module.scss';

interface AddNewNewsProps {
    className?: string;
}

export const AddNewNews = memo((props: AddNewNewsProps) => {
    const {
        className,
    } = props;

    return (
        <div className={classNames(cls.AddNewNews, {}, [className])}>
            asd
        </div>
    );
});
