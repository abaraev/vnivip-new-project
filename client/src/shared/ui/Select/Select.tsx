import { classNames } from 'shared/lib/classNames/classNames';
import { ChangeEvent, memo, useMemo } from 'react';
import cls from './Select.module.scss';

export interface SelectOption {
    value: string;
    content: string;
}

interface SelectProps {
    className?: string;
    options?: SelectOption[];
    value?: string;
    defaultContent?: string;
    onChange?: (value: string) => void;
    size?: number;
}

export const Select = memo((props: SelectProps) => {
    const {
        className,
        options,
        onChange,
        value,
        defaultContent,
        size,
    } = props;

    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange?.(e.target?.value);
    };

    const optionsList = useMemo(() => options?.map((opt) => (
        <option
            className={cls.option}
            value={opt.value}
            key={opt.value}
        >
            {opt.content}
        </option>
    )), [options]);

    return (
        <div className={classNames(cls.Wrapper, { [cls.haveSize]: !!size }, [className])}>
            <select
                className={cls.select}
                value={value}
                onChange={onChangeHandler}
                size={size}
            >
                <option>{defaultContent}</option>
                {optionsList}
            </select>
        </div>
    );
});
