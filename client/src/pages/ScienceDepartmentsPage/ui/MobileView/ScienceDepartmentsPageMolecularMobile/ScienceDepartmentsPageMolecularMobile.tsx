import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { VStack } from 'shared/ui/Stack';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { MemberSmallMobile } from 'entities/Member';
import { getScienceDepartmentsPageMembersMolecular } from '../../../model/selectors/getScienceDepartmentsPage';
import cls from './ScienceDepartmentsPageMolecularMobile.module.scss';

interface ScienceDepartmentsPageMolecularMobileProps {
    className?: string;
}

export const ScienceDepartmentsPageMolecularMobile = memo((props: ScienceDepartmentsPageMolecularMobileProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('scienceDepartmentsPage');
    const members = useSelector(getScienceDepartmentsPageMembersMolecular);

    return (
        <VStack
            maxW
            className={classNames(cls.ScienceDepartmentsPageProductionMobile, {}, [className])}
            gap={10}
        >
            <Text
                theme={TextTheme.DARK2}
                size={TextSize.BODY_L_MEDIUM_MOBILE}
            >
                {t('Отдел молекулярно-генетических исследований')}
            </Text>
            {!!members?.length && (
                <VStack
                    maxW
                    gap={32}
                >
                    {members.map((item, index) => (
                        <MemberSmallMobile
                            data={item}
                            key={index}
                        />
                    ))}
                </VStack>
            )}
        </VStack>
    );
});
