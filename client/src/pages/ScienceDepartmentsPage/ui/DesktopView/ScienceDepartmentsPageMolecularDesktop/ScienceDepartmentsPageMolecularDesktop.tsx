import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { HStack, VStack } from 'shared/ui/Stack';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { MemberSmallDesktop } from 'entities/Member';
import {
    getScienceDepartmentsPageMembersMolecular,
} from '../../../model/selectors/getScienceDepartmentsPage';
import cls from './ScienceDepartmentsPageMolecularDesktop.module.scss';

interface ScienceDepartmentsPageMolecularDesktopProps {
    className?: string;
}

export const ScienceDepartmentsPageMolecularDesktop = memo((props: ScienceDepartmentsPageMolecularDesktopProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('scienceDepartmentsPage');
    const members = useSelector(getScienceDepartmentsPageMembersMolecular);

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
                {t('Отдел молекулярно-генетических исследований')}
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
