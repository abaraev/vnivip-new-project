import { classNames } from 'shared/lib/classNames/classNames';
import React, { memo, useCallback, useState } from 'react';
import { HStack, VStack } from 'shared/ui/Stack';
import {
    Text, TextAlign, TextSize, TextTheme,
} from 'shared/ui/Text/Text';
import { Icon, IconTheme } from 'shared/ui/Icon/Icon';
import arrowDownIcon from 'shared/assets/icons/arrow-down-64-64-black.svg';
import close from 'shared/assets/icons/close-32-32-red.svg';
import cls from './AdminCompetitionDesktop.module.scss';
import { Competition } from '../../../model/types/Competition';

interface AdminCompetitionDesktopProps {
    className?: string;
    data: Competition;
    onDelete?: (competitionIndex: number, competitionId: number) => void;
    competitionIndex: number;
}

export const AdminCompetitionDesktop = memo((props: AdminCompetitionDesktopProps) => {
    const {
        className,
        data,
        onDelete,
        competitionIndex,
    } = props;

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const onToggle = useCallback(() => {
        setIsOpen((prevState) => !prevState);
    }, []);

    const onDeleteHandler = () => {
        onDelete?.(competitionIndex, data.id);
    };

    return (
        <VStack
            className={classNames(cls.AdminCompetitionDesktop, { [cls.descriptionVisible]: isOpen }, [className])}
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
                    {data.name}
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
                align={TextAlign.JUSTIFY}
            >
                {data.description || ''}
            </Text>
        </VStack>
    );
});
