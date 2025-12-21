import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useState } from 'react';
import { HStack, VStack } from 'shared/ui/Stack';
import {
    Text, TextAlign, TextSize, TextTheme,
} from 'shared/ui/Text/Text';
import { Icon, IconTheme } from 'shared/ui/Icon/Icon';
import arrowDownIcon from 'shared/assets/icons/arrow-down-64-64-black.svg';
import cls from './VacancyDesktop.module.scss';
import { Vacancy } from '../../../model/types/Vacancy';

interface VacancyDesktopProps {
    className?: string;
    data: Vacancy;
}

export const VacancyDesktop = memo((props: VacancyDesktopProps) => {
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
            className={classNames(cls.VacancyDesktop, { [cls.descriptionVisible]: isOpen }, [className])}
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
