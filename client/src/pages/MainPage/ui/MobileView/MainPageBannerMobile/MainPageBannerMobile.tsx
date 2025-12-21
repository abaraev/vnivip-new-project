import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { CoverMobile, CoverMobileSize } from 'shared/ui/Cover/MobileView/CoverMobile';
import birds2Img from 'shared/assets/images/birds2.webp';
import birds1Img from 'shared/assets/images/birds1.webp';
import birds3Img from 'shared/assets/images/birds3.webp';
import { HStack, VStack } from 'shared/ui/Stack';
import {
    Text, TextAlign, TextSize, TextTheme,
} from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import { AnchorMobile, AnchorMobileTheme } from 'shared/ui/Anchor/MobileView/AnchorMobile';
import telegramIcon from 'shared/assets/icons/telegram-32-32-white.svg';
import vkIcon from 'shared/assets/icons/vk-32-32-white.svg';
import youtubeIcon from 'shared/assets/icons/youtube-32-32-white.svg';
import arrowDownIcon from 'shared/assets/icons/arrow-down-24-24-white.svg';
import cls from './MainPageBannerMobile.module.scss';

interface MainPageBannerMobileProps {
    className?: string;
}

export const MainPageBannerMobile = memo((props: MainPageBannerMobileProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('mainPage');

    return (
        <CoverMobile
            className={classNames(cls.MainPageBannerMobile, {}, [className])}
            size={CoverMobileSize.LARGE}
            images={[
                birds2Img,
                birds1Img,
                birds3Img,
            ]}
        >
            <VStack
                maxW
                maxH
                className={cls.content}
                justify="between"
            >
                <VStack
                    gap={10}
                    maxW
                    align="center"
                >
                    <Text
                        theme={TextTheme.WHITE}
                        size={TextSize.H1_MINI_MOBILE}
                        align={TextAlign.CENTER}
                        className={cls.instituteName}
                    >
                        {t('Всероссийский научно-исследовательский ветеринарный институт птицеводства')}
                    </Text>
                    <Text
                        theme={TextTheme.WHITE}
                        size={TextSize.H1_MINI_ITALIC_MOBILE}
                        align={TextAlign.CENTER}
                        className={cls.instituteNameLower}
                    >
                        {t('филиал ФНЦ ВНИТИП')}
                    </Text>
                </VStack>
                <VStack
                    maxW
                    align="center"
                    gap={30}
                >
                    {/* <HStack */}
                    {/*    gap={10} */}
                    {/*    align="center" */}
                    {/* > */}
                    {/*    <AnchorMobile */}
                    {/*        href="#" */}
                    {/*        theme={AnchorMobileTheme.WHITE} */}
                    {/*        Svg={telegramIcon} */}
                    {/*    /> */}
                    {/*    <AnchorMobile */}
                    {/*        href="#" */}
                    {/*        theme={AnchorMobileTheme.WHITE} */}
                    {/*        Svg={vkIcon} */}
                    {/*    /> */}
                    {/*    <AnchorMobile */}
                    {/*        className={cls.youtubeIcon} */}
                    {/*        href="#" */}
                    {/*        theme={AnchorMobileTheme.WHITE} */}
                    {/*        Svg={youtubeIcon} */}
                    {/*    /> */}
                    {/* </HStack> */}
                    <AnchorMobile
                        href="#news"
                        target="_self"
                        theme={AnchorMobileTheme.WHITE}
                        Svg={arrowDownIcon}
                    >
                        {t('К новостям')}
                    </AnchorMobile>
                </VStack>
            </VStack>
        </CoverMobile>
    );
});
