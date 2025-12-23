import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { HStack, VStack } from 'shared/ui/Stack';
import { MemberSmallMobile } from 'entities/Member';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import cls from './ScienceDepartmentsPageVirologyMobile.module.scss';
import { getScienceDepartmentsPageMembersVirology } from '../../../model/selectors/getScienceDepartmentsPage';

interface ScienceDepartmentsPageVirologyMobileProps {
    className?: string;
}

export const ScienceDepartmentsPageVirologyMobile = memo((props: ScienceDepartmentsPageVirologyMobileProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('scienceDepartmentsPage');
    const members = useSelector(getScienceDepartmentsPageMembersVirology);

    return (
        <VStack
            maxW
            className={classNames(cls.ScienceDepartmentsPageVirologyMobile, {}, [className])}
            gap={10}
        >
            <Text
                theme={TextTheme.DARK2}
                size={TextSize.BODY_L_MEDIUM_MOBILE}
            >
                {t('Отдел вирусологии')}
            </Text>
            {members?.length ? (
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
            )
                : (
                    <HStack
                        maxW
                        justify="center"
                        align="center"
                        paddingT={30}
                        paddingB={30}
                    >
                        <Text
                            theme={TextTheme.GREY}
                            size={TextSize.BODY_L_MEDIUM_MOBILE}
                        >
                            {t('Нет сотрудников')}
                        </Text>
                    </HStack>
                )}
        </VStack>
    );
});
