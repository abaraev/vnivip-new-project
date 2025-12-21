import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import cls from './TabsMobile.module.scss';

export interface TabItem {
    value: string;
    text: string;
}

interface TabsMobileProps {
    className?: string;
    tabs: TabItem[];
    value: string;
    onTabClick: (value: string) => void;
}

export const TabsMobile = memo((props: TabsMobileProps) => {
    const {
        className,
        tabs,
        onTabClick,
        value,
    } = props;

    const clickHandle = useCallback((value: string) => () => {
        onTabClick(value);
    }, [onTabClick]);

    return (
        <div className={classNames(cls.TabsMobile, {}, [className])}>
            {tabs.map((tab) => (
                <div
                    className={value === tab.value ? cls.tabSelected : cls.tab}
                    key={tab.value}
                    onClick={value === tab.value ? undefined : clickHandle(tab.value)}
                >
                    <span>
                        {tab.text}
                    </span>
                </div>
            ))}
        </div>
    );
});
