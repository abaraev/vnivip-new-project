import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { HStack, VStack } from 'shared/ui/Stack';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ImageMobile } from 'shared/ui/Image';
import defaultAvatar from 'shared/assets/images/avatar.png';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { getMemberDetailsPageMember } from '../../../model/selectors/getMemberDetailsPage';
import cls from './MemberDetailsPageInfoMobile.module.scss';

interface MemberDetailsPageInfoMobileProps {
    className?: string;
}

const MemberDetailsPageInfoMobile = memo((props: MemberDetailsPageInfoMobileProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('memberDetailsPage');
    const member = useSelector(getMemberDetailsPageMember);

    if (!member) {
        return null;
    }

    return (
        <VStack
            maxW
            gap={20}
            className={classNames(cls.MemberDetailsPageInfoMobile, {}, [className])}
            align="center"
        >
            <ImageMobile
                src={member.avatar
                    ? `${__API__}/static/images/${member.avatar}`
                    : defaultAvatar}
                className={cls.avatar}
                borderR={10}
            />
            <VStack
                gap={40}
                maxW
            >
                <VStack
                    maxW
                    gap={10}
                >
                    <Text
                        theme={TextTheme.DARK2}
                        size={TextSize.BODY_L_MEDIUM_MOBILE}
                    >
                        {member.fullName}
                    </Text>
                    <Text
                        theme={TextTheme.DARK}
                        size={TextSize.BODY_MOBILE}
                        className={cls.jobName}
                    >
                        {member.jobName}
                    </Text>
                </VStack>
                {member.status && (
                    <Text
                        theme={TextTheme.BLUE}
                        size={TextSize.BODY_MEDIUM_MOBILE}
                        className={cls.status}
                    >
                        {member.status}
                    </Text>
                )}
                <VStack
                    gap={10}
                    maxW
                >
                    {member.email && (
                        <VStack
                            maxW
                        >
                            <Text
                                theme={TextTheme.GREY3}
                                size={TextSize.BODY_S_MOBILE}
                            >
                                {`${t('Электронная почта')}: `}
                            </Text>
                            <Text
                                theme={TextTheme.DARK2}
                                size={TextSize.BODY_S_MOBILE}
                            >
                                {member.email}
                            </Text>
                        </VStack>
                    )}
                    {member.phone && (
                        <VStack
                            maxW
                        >
                            <Text
                                theme={TextTheme.GREY3}
                                size={TextSize.BODY_S_MOBILE}
                            >
                                {`${t('Номер телефона')}: `}
                            </Text>
                            <Text
                                theme={TextTheme.DARK2}
                                size={TextSize.BODY_S_MOBILE}
                            >
                                {member.phone}
                            </Text>
                        </VStack>
                    )}
                </VStack>
            </VStack>
        </VStack>
    );
});

export default MemberDetailsPageInfoMobile;
