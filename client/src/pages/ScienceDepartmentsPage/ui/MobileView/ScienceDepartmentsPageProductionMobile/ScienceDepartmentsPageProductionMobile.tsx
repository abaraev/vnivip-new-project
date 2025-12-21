import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { VStack } from 'shared/ui/Stack';
import { MemberSmallMobile } from 'entities/Member';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import cls from './ScienceDepartmentsPageProductionMobile.module.scss';
import { getScienceDepartmentsPageMembersProduction } from '../../../model/selectors/getScienceDepartmentsPage';

interface ScienceDepartmentsPageProductionMobileProps {
    className?: string;
}

export const ScienceDepartmentsPageProductionMobile = memo((props: ScienceDepartmentsPageProductionMobileProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('scienceDepartmentsPage');
    const members = useSelector(getScienceDepartmentsPageMembersProduction);

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
                {t('Производственный отдел')}
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
