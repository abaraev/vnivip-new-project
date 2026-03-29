import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useState } from 'react';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { HStack, VStack } from 'shared/ui/Stack';
import { MemberSmallDesktop } from 'entities/Member';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Icon, IconTheme } from 'shared/ui/Icon/Icon';
import arrowDownIcon from 'shared/assets/icons/arrow-keyboard-down-64-64-black.svg';
import arrowRightIcon from 'shared/assets/icons/arrow-keyboard-right-64-64-black.svg';
import { getScienceDepartmentsPageMembersMicrobiology } from '../../../model/selectors/getScienceDepartmentsPage';
import cls from './ScienceDepartmentsPageMicrobiologyDesktop.module.scss';

interface ScienceDepartmentsPageMicrobiologyDesktopProps {
    className?: string;
}

export const ScienceDepartmentsPageMicrobiologyDesktop = memo((props: ScienceDepartmentsPageMicrobiologyDesktopProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('scienceDepartmentsPage');
    const members = useSelector(getScienceDepartmentsPageMembersMicrobiology);
    const [isOpenSection, setIsOpenSection] = useState<boolean>(false);

    const onToggleSection = useCallback(() => {
        setIsOpenSection((prevState) => !prevState);
    }, []);

    return (
        <VStack
            maxW
            className={classNames(cls.ScienceDepartmentsPageMicrobiologyDesktop, {}, [className])}
            gap={20}
        >
            <HStack
                maxW
                className={cls.titleSpoiler}
                justify="between"
                align="center"
                padding={20}
                onClick={onToggleSection}
            >
                <Text
                    theme={TextTheme.DARK2}
                    size={TextSize.H4_MEDIUM_DESKTOP}
                >
                    {t('Отдел микробиологии')}
                </Text>
                {isOpenSection
                    ? (
                        <Icon
                            Svg={arrowDownIcon}
                            theme={IconTheme.CLEAN}
                        />
                    )
                    : (
                        <Icon
                            Svg={arrowRightIcon}
                            theme={IconTheme.CLEAN}
                        />
                    )}
            </HStack>
            {!!members?.length && isOpenSection && (
                <VStack
                    maxW
                    gap={50}
                >
                    {members.map((item, index) => (
                        <MemberSmallDesktop
                            data={item}
                            key={index}
                            className={cls.member}
                        />
                    ))}
                </VStack>
            )}
            {!members?.length && isOpenSection && (
                <HStack
                    maxW
                    justify="center"
                    align="center"
                    paddingT={50}
                    paddingB={50}
                >
                    <Text
                        theme={TextTheme.GREY}
                        size={TextSize.BODY_L_MEDIUM_DESKTOP}
                    >
                        {t('Нет сотрудников')}
                    </Text>
                </HStack>
            )}
        </VStack>
    );
});
