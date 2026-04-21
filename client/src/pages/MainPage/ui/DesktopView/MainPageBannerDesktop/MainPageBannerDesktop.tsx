import { memo } from 'react';
import { CoverDesktop, CoverDesktopSize } from 'shared/ui/Cover/DesktopView/CoverDesktop';
import birds2Img from 'shared/assets/images/birds2.webp';
import birds3Img from 'shared/assets/images/birds3.webp';
import birds1Img from 'shared/assets/images/birds1.webp';
import { HStack, VStack } from 'shared/ui/Stack';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import arrowDownIcon from 'shared/assets/icons/arrow-down-24-24-white.svg';
import { useTranslation } from 'react-i18next';
import { AnchorDesktop, AnchorDesktopTheme } from 'shared/ui/Anchor/DesktopView/AnchorDesktop';
import { useMediaQuery } from 'react-responsive';
import telegramIcon from 'shared/assets/icons/telegram-32-32-white.svg';
import vkIcon from 'shared/assets/icons/vk-32-32-white.svg';
import cls from './MainPageBannerDesktop.module.scss';

export const MainPageBannerDesktop = memo(() => {
    const { t } = useTranslation('mainPage');
    const isSmallScreen = useMediaQuery({ maxWidth: 1300 });

    return (
        <CoverDesktop
            size={CoverDesktopSize.LARGE}
            images={[
                birds2Img,
                birds1Img,
                birds3Img,
            ]}
        >
            <VStack
                gap={isSmallScreen ? 50 : 100}
            >
                <VStack
                    paddingL={isSmallScreen ? 100 : 130}
                >
                    <Text
                        theme={TextTheme.WHITE}
                        size={isSmallScreen ? TextSize.H2_MEDIUM_DESKTOP : TextSize.H1_DESKTOP}
                        className={cls.instituteName}
                    >
                        {t('Всероссийский научно-исследовательский ветеринарный институт птицеводства')}
                    </Text>
                    <Text
                        theme={TextTheme.WHITE}
                        size={isSmallScreen ? TextSize.H3_LIGHT_DESKTOP : TextSize.H2_LIGHT_DESKTOP}
                        className={cls.instituteNameLower}
                    >
                        {t('филиал ФНЦ ВНИТИП')}
                    </Text>
                </VStack>
                <HStack
                    maxW
                    justify="between"
                >
                    <AnchorDesktop
                        href="#news"
                        target="_self"
                        theme={AnchorDesktopTheme.WHITE}
                        Svg={arrowDownIcon}
                    >
                        {t('К новостям')}
                    </AnchorDesktop>
                    <HStack
                        gap={16}
                    >
                        <AnchorDesktop
                            href="https://t.me/vnivip_official"
                            theme={AnchorDesktopTheme.WHITE}
                            Svg={telegramIcon}
                        />
                        <AnchorDesktop
                            href="https://vk.com/vniivip_official"
                            theme={AnchorDesktopTheme.WHITE}
                            Svg={vkIcon}
                        />
                        {/* <AnchorDesktop */}
                        {/*    className={cls.youtubeIcon} */}
                        {/*    href="#" */}
                        {/*    theme={AnchorDesktopTheme.WHITE} */}
                        {/*    Svg={youtubeIcon} */}
                        {/* /> */}
                    </HStack>
                </HStack>
            </VStack>
        </CoverDesktop>
    );
});
