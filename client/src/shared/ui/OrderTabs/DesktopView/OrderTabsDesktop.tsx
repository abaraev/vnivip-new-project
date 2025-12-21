import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import cls from './OrderTabsDesktop.module.scss';

export interface TabItem {
    value: string;
    text: string;
}

interface OrderTabsDesktopProps {
    className?: string;
    tabs: TabItem[];
    value: string;
    onTabClick: (value: any) => void;
}

export const OrderTabsDesktop = memo((props: OrderTabsDesktopProps) => {
    const {
        className,
        tabs,
        onTabClick,
        value,
    } = props;

    const clickHandle = useCallback((value: string) => () => {
        onTabClick(value);
    }, [onTabClick]);

    const classesTabSelected: Record<number, string> = {
        1: cls.tabSelected1,
        2: cls.tabSelected2,
        3: cls.tabSelected3,
    };

    const classesTab: Record<number, string> = {
        1: cls.tab1,
        2: cls.tab2,
        3: cls.tab3,
    };

    return (
        <div className={classNames(cls.OrderTabsDesktop, {}, [className])}>
            {tabs.map((tab, index) => (
                <div
                    className={value === tab.value ? classesTabSelected[index + 1] : classesTab[index + 1]}
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
