import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import cls from './TabsDesktop.module.scss';

export interface TabItem {
    value: string;
    text: string;
}

interface TabsDesktopProps {
    className?: string;
    tabs: TabItem[];
    value: string;
    onTabClick: (value: string) => void;
}

export const TabsDesktop = memo((props: TabsDesktopProps) => {
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
        <div className={classNames(cls.TabsDesktop, {}, [className])}>
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
