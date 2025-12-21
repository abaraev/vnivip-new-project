import { classNames } from 'shared/lib/classNames/classNames';
import { HTMLAttributes, memo } from 'react';
import { Link } from 'react-router-dom';
import { AppPaths } from 'shared/config/routeConfig/routeConfig';
import ArrowDownIcon from 'shared/assets/icons/arrow-down-small-24-24-white.svg';
import ArrowUpIcon from 'shared/assets/icons/arrow-up-small-24-24-white.svg';
import { useHover } from 'shared/lib/hooks/useHover/useHover';
import cls from './Dropdown.module.scss';

export interface DropdownData {
    path: AppPaths;
    text: string;
}

interface DropdownProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    sectionName: string;
    data: DropdownData[];
    sectionPath: AppPaths;
}

export const Dropdown = memo((props: DropdownProps) => {
    const {
        className,
        children,
        sectionName,
        sectionPath,
        data,
        ...otherProps
    } = props;
    const [isHovered, bindUseHover] = useHover();

    return (
        <div
            className={classNames(cls.Dropdown, {}, [className])}
            {...bindUseHover}
            {...otherProps}
        >
            <Link
                to={sectionPath}
                key={sectionPath}
                className={cls.section}
            >
                {sectionName}
                {isHovered
                    ? <ArrowUpIcon />
                    : <ArrowDownIcon />}
                <div
                    className={cls.sectionUnderline}
                />
            </Link>
            <div
                className={cls.menuBg}
            >
                <div
                    className={cls.list}
                >
                    {data.map(({ path, text }) => (
                        <Link
                            className={cls.itemMenu}
                            key={path}
                            to={path}
                        >
                            <div
                                className={cls.itemMenuText}
                            >
                                {text}
                                <div
                                    className={cls.underline}
                                />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
});
