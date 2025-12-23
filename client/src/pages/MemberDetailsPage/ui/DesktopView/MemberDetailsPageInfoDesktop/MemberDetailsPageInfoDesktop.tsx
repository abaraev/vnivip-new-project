import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { HStack, VStack } from 'shared/ui/Stack';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ImageDesktop } from 'shared/ui/Image';
import defaultAvatar from 'shared/assets/images/avatar.png';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { getMemberDetailsPageMember } from '../../../model/selectors/getMemberDetailsPage';
import cls from './MemberDetailsPageInfoDesktop.module.scss';

interface MemberDetailsPageInfoDesktopProps {
    className?: string;
}

const MemberDetailsPageInfoDesktop = memo((props: MemberDetailsPageInfoDesktopProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('memberDetailsPage');
    const member = useSelector(getMemberDetailsPageMember);

    if (!member) {
        return null;
    }

    return (
        <HStack
            maxW
            gap={20}
            className={classNames(cls.MemberDetailsPageInfoDesktop, {}, [className])}
        >
            <ImageDesktop
                src={member.avatar
                    ? `${__API__}/static/images/${member.avatar}`
                    : defaultAvatar}
                className={cls.avatar}
                borderR={10}
            />
            <VStack
                className={cls.rightWrapper}
                gap={60}
            >
                <VStack
                    maxW
                    gap={10}
                >
                    <Text
                        theme={TextTheme.DARK2}
                        size={TextSize.H4_MEDIUM_DESKTOP}
                        className={cls.fullName}
                    >
                        {member.fullName}
                    </Text>
                    <Text
                        theme={TextTheme.DARK}
                        size={TextSize.BODY_DESKTOP}
                        className={cls.jobName}
                    >
                        {member.jobName}
                    </Text>
                </VStack>
                {member.status && (
                    <Text
                        theme={TextTheme.BLUE}
                        size={TextSize.BODY_MEDIUM_DESKTOP}
                        className={cls.status}
                    >
                        {member.status}
                    </Text>
                )}
                <VStack
                    gap={10}
                >
                    {member.email && (
                        <HStack>
                            <Text
                                theme={TextTheme.GREY3}
                                size={TextSize.BODY_S_DESKTOP}
                            >
                                {`${t('Электронная почта')}: `}
                            </Text>
                            <Text
                                theme={TextTheme.DARK2}
                                size={TextSize.BODY_S_DESKTOP}
                            >
                                {member.email}
                            </Text>
                        </HStack>
                    )}
                    {member.phone && (
                        <HStack>
                            <Text
                                theme={TextTheme.GREY3}
                                size={TextSize.BODY_S_DESKTOP}
                            >
                                {`${t('Номер телефона')}: `}
                            </Text>
                            <Text
                                theme={TextTheme.DARK2}
                                size={TextSize.BODY_S_DESKTOP}
                            >
                                {member.phone}
                            </Text>
                        </HStack>
                    )}
                </VStack>
            </VStack>
        </HStack>
    );
});

export default MemberDetailsPageInfoDesktop;
