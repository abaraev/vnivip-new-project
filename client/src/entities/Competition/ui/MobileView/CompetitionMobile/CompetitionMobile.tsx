import { classNames } from 'shared/lib/classNames/classNames';
import React, { memo, useCallback, useState } from 'react';
import { HStack, VStack } from 'shared/ui/Stack';
import {
    Text, TextAlign, TextSize, TextTheme,
} from 'shared/ui/Text/Text';
import { Icon, IconTheme } from 'shared/ui/Icon/Icon';
import arrowDownIcon from 'shared/assets/icons/arrow-down-34-34-black.svg';
import { Document, SmallDocumentMobile } from 'entities/Document';
import cls from './CompetitionMobile.module.scss';
import { Competition } from '../../../model/types/Competition';

interface CompetitionMobileProps {
    className?: string;
    data: Competition;
}

export const CompetitionMobile = memo((props: CompetitionMobileProps) => {
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
            className={classNames(cls.CompetitionMobile, { [cls.descriptionVisible]: isOpen }, [className])}
        >
            <HStack
                maxW
                justify="between"
                align="center"
                padding={10}
                className={cls.contentWrapper}
                onClick={onToggle}
            >
                <Text
                    theme={TextTheme.DARK2}
                    size={TextSize.BODY_L_MEDIUM_MOBILE}
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
                    size={TextSize.BODY_MOBILE}
                    align={TextAlign.JUSTIFY}
                    className={cls.description}
                >
                    {data.description || ''}
                </Text>
                {!!documents.length && (
                    <VStack
                        maxW
                        className={cls.documentsWrapper}
                        gap={10}
                    >
                        {documents.map((item) => (
                            <SmallDocumentMobile
                                data={item}
                                key={item.id}
                                className={cls.document}
                                withDeleting={false}
                            />
                        ))}
                    </VStack>
                )}
            </VStack>
        </VStack>
    );
});
