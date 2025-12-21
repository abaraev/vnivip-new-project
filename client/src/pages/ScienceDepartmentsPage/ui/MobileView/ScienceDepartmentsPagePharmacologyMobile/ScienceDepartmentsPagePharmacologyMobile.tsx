import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { VStack } from 'shared/ui/Stack';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { MemberSmallMobile } from 'entities/Member';
import { getScienceDepartmentsPageMembersPharmacology } from '../../../model/selectors/getScienceDepartmentsPage';
import cls from './ScienceDepartmentsPagePharmacologyMobile.module.scss';

interface ScienceDepartmentsPagePharmacologyMobileProps {
    className?: string;
}

export const ScienceDepartmentsPagePharmacologyMobile = memo((props: ScienceDepartmentsPagePharmacologyMobileProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('scienceDepartmentsPage');
    const members = useSelector(getScienceDepartmentsPageMembersPharmacology);

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
                {t('Отдел фармакологии и токсикологии')}
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
