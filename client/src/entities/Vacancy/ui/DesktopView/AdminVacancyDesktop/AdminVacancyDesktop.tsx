import { classNames } from 'shared/lib/classNames/classNames';
import React, { memo, useCallback, useState } from 'react';
import { HStack, VStack } from 'shared/ui/Stack';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { Icon, IconTheme } from 'shared/ui/Icon/Icon';
import arrowDownIcon from 'shared/assets/icons/arrow-down-64-64-black.svg';
import close from 'shared/assets/icons/close-32-32-red.svg';
import cls from './AdminVacancyDesktop.module.scss';
import { Vacancy } from '../../../model/types/Vacancy';

interface AdminVacancyDesktopProps {
    className?: string;
    data: Vacancy;
    onDelete?: (vacancyIndex: number, vacancyId: number) => void;
    vacancyIndex: number;
}

export const AdminVacancyDesktop = memo((props: AdminVacancyDesktopProps) => {
    const {
        className,
        data,
        onDelete,
        vacancyIndex,
    } = props;
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const onToggle = useCallback(() => {
        setIsOpen((prevState) => !prevState);
    }, []);

    const onDeleteHandler = () => {
        onDelete?.(vacancyIndex, data.id);
    };

    return (
        <VStack
            className={classNames(cls.AdminVacancyDesktop, { [cls.descriptionVisible]: isOpen }, [className])}
        >
            <Icon
                theme={IconTheme.CLICKABLE_BG}
                Svg={close}
                className={cls.deleteBtn}
                onClick={onDeleteHandler}
            />
            <HStack
                maxW
                justify="between"
                align="center"
                onClick={onToggle}
                padding={20}
                className={cls.contentWrapper}
            >
                <Text
                    theme={TextTheme.DARK2}
                    size={TextSize.H4_MEDIUM_DESKTOP}
                >
                    {data.jobName}
                </Text>
                <Icon
                    Svg={arrowDownIcon}
                    theme={IconTheme.CLEAN}
                    className={classNames(cls.arrowIcon, { [cls.arrowIsOpen]: isOpen }, [])}
                />
            </HStack>
            <Text
                theme={TextTheme.DARK}
                size={TextSize.BODY_DESKTOP}
                className={cls.description}
            >
                {data.description}
            </Text>
        </VStack>
    );
});
