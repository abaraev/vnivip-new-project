import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { HStack, VStack } from 'shared/ui/Stack';
import { MemberSmallDesktop } from 'entities/Member';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import cls from './ScienceDepartmentsPageMicrobiologyDesktop.module.scss';
import { getScienceDepartmentsPageMembersMicrobiology } from '../../../model/selectors/getScienceDepartmentsPage';

interface ScienceDepartmentsPageMicrobiologyDesktopProps {
    className?: string;
}

export const ScienceDepartmentsPageMicrobiologyDesktop = memo((props: ScienceDepartmentsPageMicrobiologyDesktopProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('scienceDepartmentsPage');
    const members = useSelector(getScienceDepartmentsPageMembersMicrobiology);

    return (
        <VStack
            maxW
            className={classNames(cls.ScienceDepartmentsPageMicrobiologyDesktop, {}, [className])}
            gap={20}
        >
            <Text
                theme={TextTheme.DARK2}
                size={TextSize.H4_MEDIUM_DESKTOP}
            >
                {t('Отдел микробиологии')}
            </Text>
            {members?.length
                ? (
                    <HStack
                        maxW
                        gap={50}
                        wrap="wrap"
                    >
                        {members.map((item, index) => (
                            <MemberSmallDesktop
                                data={item}
                                key={index}
                                className={cls.member}
                            />
                        ))}
                    </HStack>
                )
                : (
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
