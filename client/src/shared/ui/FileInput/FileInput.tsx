import { classNames } from 'shared/lib/classNames/classNames';
import React, {
    memo, MutableRefObject, useCallback, useRef,
} from 'react';
import cls from './FileInput.module.scss';

interface FileInputProps {
    className?: string;
    children?: string;
    onChange?: (file: File) => void;
    accept?: string;
    disabled?: boolean;
}

export const FileInput = memo((props: FileInputProps) => {
    const {
        className,
        children,
        onChange,
        accept = '',
        disabled,
    } = props;
    const ref = useRef() as MutableRefObject<HTMLInputElement>;

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length && !disabled) onChange?.(e.target.files[0]);
        e.target.value = '';
    };

    const onUploadClick = useCallback(() => {
        if (ref.current) {
            ref.current.click();
        }
    }, []);

    return (
        <div
            className={classNames(cls.FileInput, { [cls.disabled]: disabled }, [className])}
            onClick={onUploadClick}
        >
            {children}
            <input
                ref={ref}
                className={cls.input}
                type="file"
                onChange={onChangeHandler}
                accept={accept}
                disabled={disabled}
            />
        </div>
    );
});
