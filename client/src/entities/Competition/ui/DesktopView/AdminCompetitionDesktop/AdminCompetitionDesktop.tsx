import { classNames } from 'shared/lib/classNames/classNames';
import React, {
    memo, useCallback, useMemo, useState,
} from 'react';
import { HStack, VStack } from 'shared/ui/Stack';
import {
    Text, TextAlign, TextSize, TextTheme,
} from 'shared/ui/Text/Text';
import { Icon, IconTheme } from 'shared/ui/Icon/Icon';
import arrowDownIcon from 'shared/assets/icons/arrow-down-64-64-black.svg';
import close from 'shared/assets/icons/close-32-32-red.svg';
import pack from 'shared/assets/icons/pack-32-32-black.svg';
import undo from 'shared/assets/icons/undo-32-32-black.svg';
import { SmallDocumentDesktop, Document } from 'entities/Document';
import cls from './AdminCompetitionDesktop.module.scss';
import { Competition } from '../../../model/types/Competition';

interface AdminCompetitionDesktopProps {
    className?: string;
    data: Competition;
    onDelete?: (competitionIndex: number, competitionId: number) => void;
    onClose?: (competitionIndex: number, competitionId: number) => void;
    onOpen?: (competitionIndex: number, competitionId: number) => void;
    competitionIndex: number;
}

export const AdminCompetitionDesktop = memo((props: AdminCompetitionDesktopProps) => {
    const {
        className,
        data,
        onDelete,
        onClose,
        onOpen,
        competitionIndex,
    } = props;
    const documents = data.documents ? JSON.parse(data.documents) as Document[] : [] as Document[];

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const onToggle = useCallback(() => {
        setIsOpen((prevState) => !prevState);
    }, []);

    const onDeleteHandler = () => {
        onDelete?.(competitionIndex, data.id);
    };

    const onCloseHandler = () => {
        onClose?.(competitionIndex, data.id);
    };

    const onOpenHandler = () => {
        onOpen?.(competitionIndex, data.id);
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
            {data.closed
                ? (
                    <Icon
                        theme={IconTheme.CLICKABLE_BG}
                        Svg={undo}
                        className={cls.closedToggleBtn}
                        onClick={onOpenHandler}
                    />
                )
                : (
                    <Icon
                        theme={IconTheme.CLICKABLE_BG}
                        Svg={pack}
                        className={cls.closedToggleBtn}
                        onClick={onCloseHandler}
                    />
                )}
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
            <VStack
                className={cls.descriptionWrapper}
                maxW
            >
                <Text
                    theme={TextTheme.DARK}
                    size={TextSize.BODY_DESKTOP}
                    align={TextAlign.JUSTIFY}
                    className={cls.description}
                >
                    {data.description || ''}
                </Text>
                {!!documents.length && (
                    <HStack
                        maxW
                        className={cls.documentsWrapper}
                        wrap="wrap"
                        gap={20}
                    >
                        {documents.map((item) => (
                            <SmallDocumentDesktop
                                data={item}
                                key={item.id}
                                className={cls.document}
                                withDeleting={false}
                            />
                        ))}
                    </HStack>
                )}
            </VStack>
        </VStack>
    );
});
