import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { HStack, VStack } from 'shared/ui/Stack';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { MemberSmallDesktop } from 'entities/Member';
import { getScienceDepartmentsPageMembersProtozoology } from '../../../model/selectors/getScienceDepartmentsPage';
import cls from './ScienceDepartmentsPageProtozoologyDesktop.module.scss';

interface ScienceDepartmentsPageProtozoologyDesktopProps {
    className?: string;
}

export const ScienceDepartmentsPageProtozoologyDesktop = memo((props: ScienceDepartmentsPageProtozoologyDesktopProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('scienceDepartmentsPage');
    const members = useSelector(getScienceDepartmentsPageMembersProtozoology);

    return (
        <VStack
            maxW
            className={classNames(cls.ScienceDepartmentsPageProductionDesktop, {}, [className])}
            gap={20}
        >
            <Text
                theme={TextTheme.DARK2}
                size={TextSize.H4_MEDIUM_DESKTOP}
            >
                {t('Отдел протозоологии')}
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
