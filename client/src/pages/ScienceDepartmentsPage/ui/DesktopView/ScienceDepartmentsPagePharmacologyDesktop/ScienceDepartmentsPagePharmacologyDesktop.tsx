import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useState } from 'react';
import { HStack, VStack } from 'shared/ui/Stack';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { TextSize, TextTheme, Text } from 'shared/ui/Text/Text';
import { MemberSmallDesktop } from 'entities/Member';
import { Icon, IconTheme } from 'shared/ui/Icon/Icon';
import arrowDownIcon from 'shared/assets/icons/arrow-keyboard-down-64-64-black.svg';
import arrowRightIcon from 'shared/assets/icons/arrow-keyboard-right-64-64-black.svg';
import cls from './ScienceDepartmentsPagePharmacologyDesktop.module.scss';
import {
    getScienceDepartmentsPageMembersPharmacology,
} from '../../../model/selectors/getScienceDepartmentsPage';

interface ScienceDepartmentsPagePharmacologyDesktopProps {
    className?: string;
}

export const ScienceDepartmentsPagePharmacologyDesktop = memo((props: ScienceDepartmentsPagePharmacologyDesktopProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('scienceDepartmentsPage');
    const members = useSelector(getScienceDepartmentsPageMembersPharmacology);
    const [isOpenSection, setIsOpenSection] = useState<boolean>(false);

    const onToggleSection = useCallback(() => {
        setIsOpenSection((prevState) => !prevState);
    }, []);

    return (
        <VStack
            maxW
            className={classNames(cls.ScienceDepartmentsPagePharmacologyDesktop, {}, [className])}
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
                    {t('Отдел фармакологии и токсикологии')}
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
