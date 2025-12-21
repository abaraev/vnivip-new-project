import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useState } from 'react';
import { HStack, VStack } from 'shared/ui/Stack';
import {
    Text, TextAlign, TextSize, TextTheme,
} from 'shared/ui/Text/Text';
import { Icon, IconTheme } from 'shared/ui/Icon/Icon';
import arrowDownIcon from 'shared/assets/icons/arrow-down-34-34-black.svg';
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

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const onToggle = useCallback(() => {
        setIsOpen((prevState) => !prevState);
    }, []);

    return (
        <VStack
            className={classNames(cls.CompetitionMobile, { [cls.descriptionVisible]: isOpen }, [className])}
            onClick={onToggle}
        >
            <HStack
                maxW
                justify="between"
                align="center"
            >
                <Text
                    theme={TextTheme.DARK2}
                    size={TextSize.H3_MEDIUM_MOBILE}
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
                size={TextSize.BODY_MOBILE}
                className={cls.description}
                align={TextAlign.JUSTIFY}
            >
                {data.description}
            </Text>
        </VStack>
    );
});
