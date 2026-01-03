import { classNames } from 'shared/lib/classNames/classNames';
import React, { memo, useCallback, useState } from 'react';
import { HStack, VStack } from 'shared/ui/Stack';
import {
    Text, TextAlign, TextSize, TextTheme,
} from 'shared/ui/Text/Text';
import { Icon, IconTheme } from 'shared/ui/Icon/Icon';
import arrowDownIcon from 'shared/assets/icons/arrow-down-64-64-black.svg';
import { Document, SmallDocumentDesktop } from 'entities/Document';
import cls from './CompetitionDesktop.module.scss';
import { Competition } from '../../../model/types/Competition';

interface CompetitionDesktopProps {
    className?: string;
    data: Competition;
}

export const CompetitionDesktop = memo((props: CompetitionDesktopProps) => {
    const {
        className,
        data,
    } = props;
    const documents = data.documents ? JSON.parse(data.documents) as Document[] : [] as Document[];

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const onToggle = useCallback(() => {
        setIsOpen((prevState) => !prevState);
    }, []);

    return (
        <VStack
            className={classNames(cls.CompetitionDesktop, { [cls.descriptionVisible]: isOpen }, [className])}
        >
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
