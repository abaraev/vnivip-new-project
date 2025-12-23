import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { HStack, VStack } from 'shared/ui/Stack';
import {
    Text, TextAlign, TextSize, TextTheme,
} from 'shared/ui/Text/Text';
import { Member } from 'entities/Member';
import { useTranslation } from 'react-i18next';
import { ButtonMobile, ButtonMobileTheme } from 'shared/ui/Button/MobileView/ButtonMobile';
import { useNavigate } from 'react-router-dom';
import cls from './MemberBottomMobile.module.scss';

interface MemberBottomMobileProps {
    className?: string;
    data: Member;
}

export const MemberBottomMobile = memo((props: MemberBottomMobileProps) => {
    const {
        className,
        data,
    } = props;
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <VStack
            maxW
            className={classNames(cls.MemberBottomMobile, {}, [className])}
            gap={20}
        >
            <VStack
                gap={10}
                maxW
            >
                {data.email && (
                    <VStack
                        align="center"
                        maxW
                    >
                        <Text
                            theme={TextTheme.GREY3}
                            size={TextSize.BODY_S_MOBILE}
                            align={TextAlign.CENTER}
                            className={cls.contacts}
                        >
                            {`${t('Электронная почта')}: `}
                        </Text>
                        <Text
                            theme={TextTheme.DARK2}
                            size={TextSize.BODY_S_MOBILE}
                            align={TextAlign.CENTER}
                            className={cls.contacts}
                        >
                            {data.email}
                        </Text>
                    </VStack>
                )}
                {data.phone && (
                    <VStack
                        align="center"
                        maxW
                    >
                        <Text
                            theme={TextTheme.GREY3}
                            size={TextSize.BODY_S_MOBILE}
                            align={TextAlign.CENTER}
                            className={cls.contacts}
                        >
                            {`${t('Номер телефона')}: `}
                        </Text>
                        <Text
                            theme={TextTheme.DARK2}
                            size={TextSize.BODY_S_MOBILE}
                            align={TextAlign.CENTER}
                            className={cls.contacts}
                        >
                            {data.phone}
                        </Text>
                    </VStack>
                )}
            </VStack>
            <HStack
                maxW
                justify="end"
            >
                <ButtonMobile
                    theme={ButtonMobileTheme.PRIMARY}
                    onClick={() => navigate(`/member_details/${data.id}`)}
                >
                    {t('О сотруднике')}
                </ButtonMobile>
            </HStack>
        </VStack>
    );
});
