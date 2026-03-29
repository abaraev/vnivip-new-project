import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { HStack, VStack } from 'shared/ui/Stack';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { MemberSmallDesktop } from 'entities/Member';
import { Icon, IconTheme } from 'shared/ui/Icon/Icon';
import arrowDownIcon from 'shared/assets/icons/arrow-keyboard-down-64-64-black.svg';
import arrowRightIcon from 'shared/assets/icons/arrow-keyboard-right-64-64-black.svg';
import cls from './ScienceDepartmentsPageMolecularDesktop.module.scss';
import { getScienceDepartmentsPageMembersMolecular } from '../../../model/selectors/getScienceDepartmentsPage';

interface ScienceDepartmentsPageMolecularDesktopProps {
    className?: string;
}

export const ScienceDepartmentsPageMolecularDesktop = memo((props: ScienceDepartmentsPageMolecularDesktopProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('scienceDepartmentsPage');
    const members = useSelector(getScienceDepartmentsPageMembersMolecular);
    const [isOpenSection, setIsOpenSection] = useState<boolean>(false);

    const onToggleSection = useCallback(() => {
        setIsOpenSection((prevState) => !prevState);
    }, []);

    return (
        <VStack
            maxW
            className={classNames(cls.ScienceDepartmentsPageMolecularDesktop, {}, [className])}
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
                    {t('Отдел молекулярно-генетических исследований')}
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
