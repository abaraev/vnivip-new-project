import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { HStack, VStack } from 'shared/ui/Stack';
import {
    Text, TextAlign, TextSize, TextTheme,
} from 'shared/ui/Text/Text';
import { Member } from 'entities/Member';
import { useTranslation } from 'react-i18next';
import { ButtonDesktop, ButtonDesktopTheme } from 'shared/ui/Button/DesktopView/ButtonDesktop';
import { useNavigate } from 'react-router-dom';
import cls from './MemberSmallBottomDesktop.module.scss';

interface MemberSmallBottomDesktopProps {
    className?: string;
    data: Member;
}

export const MemberSmallBottomDesktop = memo((props: MemberSmallBottomDesktopProps) => {
    const {
        className,
        data,
    } = props;
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <VStack
            className={classNames(cls.MemberSmallBottomDesktop, {}, [className])}
            gap={10}
            maxW
        >
            {data.phone && (
                <VStack
                    gap={4}
                >
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
                        {data.phone}
                    </Text>
                </VStack>
            )}
            {data.email && (
                <VStack
                    gap={4}
                >
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
                        {data.email}
                    </Text>
                </VStack>
            )}
            <HStack
                justify="end"
                maxW
                paddingT={10}
            >
                <ButtonDesktop
                    theme={ButtonDesktopTheme.PRIMARY}
                    onClick={() => navigate(`/member_details/${data.id}`)}
                >
                    {t('О сотруднике')}
                </ButtonDesktop>
            </HStack>
        </VStack>
    );
});
