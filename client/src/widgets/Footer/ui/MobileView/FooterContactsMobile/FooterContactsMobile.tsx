import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { HStack, VStack } from 'shared/ui/Stack';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { AnchorDesktop, AnchorDesktopTheme } from 'shared/ui/Anchor/DesktopView/AnchorDesktop';
import telegramIcon from 'shared/assets/icons/telegram-32-32-white.svg';
import vkIcon from 'shared/assets/icons/vk-32-32-white.svg';
import youtubeIcon from 'shared/assets/icons/youtube-32-32-white.svg';
import { AnchorMobile, AnchorMobileTheme } from 'shared/ui/Anchor/MobileView/AnchorMobile';
import cls from './FooterContactsMobile.module.scss';

interface FooterContactsMobileProps {
    className?: string;
}

export const FooterContactsMobile = memo((props: FooterContactsMobileProps) => {
    const { className } = props;
    const { t } = useTranslation();

    return (
        <VStack
            className={classNames(cls.FooterContactsMobile, {}, [className])}
            maxW
            gap={20}
        >
            <Text
                theme={TextTheme.GREY3}
                size={TextSize.BODY_MOBILE}
            >
                {`[ ${t('Контакты')} ]`}
            </Text>
            <VStack
                gap={16}
                maxW
            >
                <VStack
                    maxW
                >
                    <Text
                        theme={TextTheme.GREY}
                        size={TextSize.BODY_MINI_MOBILE}
                    >
                        {`${t('Номер телефона')}:`}
                    </Text>
                    <Text
                        theme={TextTheme.WHITE}
                        size={TextSize.BODY_MOBILE}
                        className={cls.contact}
                    >
                        +7 (812) 372-54-84
                    </Text>
                </VStack>
                <VStack
                    maxW
                >
                    <Text
                        theme={TextTheme.GREY}
                        size={TextSize.BODY_MINI_MOBILE}
                    >
                        {`${t('Общая почта')}:`}
                    </Text>
                    <Text
                        theme={TextTheme.WHITE}
                        size={TextSize.BODY_MOBILE}
                        className={cls.contact}
                    >
                        vnivip@yandex.ru
                    </Text>
                </VStack>
                <VStack
                    maxW
                >
                    <Text
                        theme={TextTheme.GREY}
                        size={TextSize.BODY_MINI_MOBILE}
                    >
                        {`${t('Адрес')}:`}
                    </Text>
                    <Text
                        theme={TextTheme.WHITE}
                        size={TextSize.BODY_MOBILE}
                        className={cls.contact}
                    >
                        г.Санкт-Петербург, Ломоносов, ул. Черникова 48а
                    </Text>
                </VStack>
                {/* <VStack */}
                {/*    maxW */}
                {/* > */}
                {/*    <Text */}
                {/*        theme={TextTheme.GREY} */}
                {/*        size={TextSize.BODY_MINI_MOBILE} */}
                {/*    > */}
                {/*        {`${t('Соцсети')}:`} */}
                {/*    </Text> */}
                {/*    <HStack */}
                {/*        align="center" */}
                {/*        gap={10} */}
                {/*    > */}
                {/*        <AnchorMobile */}
                {/*            Svg={telegramIcon} */}
                {/*            theme={AnchorMobileTheme.WHITE} */}
                {/*            href="#" */}
                {/*        /> */}
                {/*        <AnchorMobile */}
                {/*            Svg={vkIcon} */}
                {/*            theme={AnchorMobileTheme.WHITE} */}
                {/*            href="#" */}
                {/*        /> */}
                {/*        <AnchorMobile */}
                {/*            Svg={youtubeIcon} */}
                {/*            theme={AnchorMobileTheme.WHITE} */}
                {/*            href="#" */}
                {/*        /> */}
                {/*    </HStack> */}
                {/* </VStack> */}
            </VStack>
        </VStack>
    );
});
