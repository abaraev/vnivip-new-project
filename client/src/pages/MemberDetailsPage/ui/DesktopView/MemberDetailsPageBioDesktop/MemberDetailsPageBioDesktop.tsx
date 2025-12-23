import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { HStack } from 'shared/ui/Stack';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { useMediaQuery } from 'react-responsive';
import { getMemberDetailsPageMember } from '../../../model/selectors/getMemberDetailsPage';
import cls from './MemberDetailsPageBioDesktop.module.scss';

interface MemberDetailsPageBioDesktopProps {
    className?: string;
}

const MemberDetailsPageBioDesktop = memo((props: MemberDetailsPageBioDesktopProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('memberDetailsPage');
    const member = useSelector(getMemberDetailsPageMember);
    const isSmallScreen = useMediaQuery({ maxWidth: 1200 });

    if (!member?.bio) {
        return null;
    }

    return (
        <HStack
            maxW
            gap={20}
            className={classNames(cls.MemberDetailsPageBioDesktop, {}, [className])}
        >
            <Text
                theme={TextTheme.GREY}
                size={TextSize.BODY_S_DESKTOP}
                className={cls.grayTitle}
            >
                {`[ ${t('Биография')} ]`}
            </Text>
            <Text
                theme={TextTheme.DARK}
                size={isSmallScreen ? TextSize.BODY_S_DESKTOP : TextSize.BODY_DESKTOP}
                className={cls.bio}
            >
                {member.bio}
            </Text>
        </HStack>
    );
});

export default MemberDetailsPageBioDesktop;
