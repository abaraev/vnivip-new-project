import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { HStack, VStack } from 'shared/ui/Stack';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { TextSize, TextTheme, Text } from 'shared/ui/Text/Text';
import { MemberSmallDesktop } from 'entities/Member';
import {
    getScienceDepartmentsPageMembersPharmacology,
} from '../../../model/selectors/getScienceDepartmentsPage';
import cls from './ScienceDepartmentsPagePharmacologyDesktop.module.scss';

interface ScienceDepartmentsPagePharmacologyDesktopProps {
    className?: string;
}

export const ScienceDepartmentsPagePharmacologyDesktop = memo((props: ScienceDepartmentsPagePharmacologyDesktopProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('scienceDepartmentsPage');
    const members = useSelector(getScienceDepartmentsPageMembersPharmacology);

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
                {t('Отдел фармакологии и токсикологии')}
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
