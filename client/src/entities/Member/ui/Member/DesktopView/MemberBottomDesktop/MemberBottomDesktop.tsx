import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { HStack, VStack } from 'shared/ui/Stack';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { Member } from 'entities/Member';
import { useTranslation } from 'react-i18next';
import { ButtonDesktop, ButtonDesktopTheme } from 'shared/ui/Button/DesktopView/ButtonDesktop';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { useNavigate } from 'react-router-dom';
import cls from './MemberBottomDesktop.module.scss';

interface MemberBottomDesktopProps {
    className?: string;
    data: Member;
}

export const MemberBottomDesktop = memo((props: MemberBottomDesktopProps) => {
    const {
        className,
        data,
    } = props;
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <VStack
            align="end"
            maxW
            className={classNames(cls.MemberBottomDesktop, {}, [className])}
            gap={20}
        >
            <VStack
                gap={10}
            >
                {data.email && (
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
                            {data.email}
                        </Text>
                    </HStack>
                )}
                {data.phone && (
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
                            {data.phone}
                        </Text>
                    </HStack>
                )}
            </VStack>
            <HStack
                justify="end"
                maxW
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
