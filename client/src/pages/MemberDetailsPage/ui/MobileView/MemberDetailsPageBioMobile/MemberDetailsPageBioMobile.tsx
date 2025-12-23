import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { VStack } from 'shared/ui/Stack';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { getMemberDetailsPageMember } from '../../../model/selectors/getMemberDetailsPage';
import cls from './MemberDetailsPageBioMobile.module.scss';

interface MemberDetailsPageBioMobileProps {
    className?: string;
}

const MemberDetailsPageBioMobile = memo((props: MemberDetailsPageBioMobileProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('memberDetailsPage');
    const member = useSelector(getMemberDetailsPageMember);

    if (!member?.bio) {
        return null;
    }

    return (
        <VStack
            maxW
            gap={20}
            className={classNames(cls.MemberDetailsPageBioMobile, {}, [className])}
        >
            <Text
                theme={TextTheme.GREY}
                size={TextSize.BODY_S_MOBILE}
            >
                {`[ ${t('Биография')} ]`}
            </Text>
            <Text
                theme={TextTheme.DARK}
                size={TextSize.BODY_MOBILE}
                className={cls.bio}
            >
                {member.bio}
            </Text>
        </VStack>
    );
});

export default MemberDetailsPageBioMobile;
