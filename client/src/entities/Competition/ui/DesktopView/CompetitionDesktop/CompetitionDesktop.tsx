import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useState } from 'react';
import { HStack, VStack } from 'shared/ui/Stack';
import {
    Text, TextAlign, TextSize, TextTheme,
} from 'shared/ui/Text/Text';
import { Icon, IconTheme } from 'shared/ui/Icon/Icon';
import arrowDownIcon from 'shared/assets/icons/arrow-down-64-64-black.svg';
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
