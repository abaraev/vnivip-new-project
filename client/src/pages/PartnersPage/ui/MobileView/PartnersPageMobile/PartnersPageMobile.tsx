import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { VStack } from 'shared/ui/Stack';
import { CoverMobile, CoverMobileSize } from 'shared/ui/Cover/MobileView/CoverMobile';
import { Page } from 'widgets/Page';
import partners1Img from 'shared/assets/images/partners1.webp';
import partners2Img from 'shared/assets/images/partners2.webp';
import partner1Icon from 'shared/assets/icons/partner1-100-100.svg';
import partner2Icon from 'shared/assets/icons/partner2-100-100.svg';
import partner4Icon from 'shared/assets/icons/partner4-120-120.svg';
import partner5Icon from 'shared/assets/icons/partner5-230-100.svg';
import { useTranslation } from 'react-i18next';
import {
    PartnersPageTitleMobile,
} from '../PartnersPageTitleMobile/PartnersPageTitleMobile';
import { PartnersPageCardMobile } from '../PartnersPageCardMobile/PartnersPageCardMobile';
import cls from './PartnersPageMobile.module.scss';

interface PartnersPageMobileProps {
    className?: string;
}

const PartnersPageMobile = memo((props: PartnersPageMobileProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('partnersPage');

    return (
        <Page
            className={classNames(cls.PartnersPageMobile, {}, [className])}
        >
            <VStack
                maxW
                maxH
                gap={30}
                paddingB={70}
            >
                <CoverMobile
                    size={CoverMobileSize.SMALL}
                    images={[
                        partners1Img,
                        partners2Img,
                    ]}
                />
                <VStack
                    paddingL={10}
                    paddingR={10}
                    maxW
                    gap={50}
                >
                    <PartnersPageTitleMobile />
                    <VStack
                        gap={30}
                        maxW
                        align="center"
                    >
                        <PartnersPageCardMobile
                            Svg={partner1Icon}
                            name={t('Российский научный фонд')}
                            description={t('описание сотрудничества с российским научным фондом')}
                            link="https://rscf.ru/"
                        />
                        <PartnersPageCardMobile
                            Svg={partner2Icon}
                            name={t('Российский птицеводческий союз')}
                            description={t('описание сотрудничества с российским птицеводческим союзом')}
                            link="http://rps.ru/"
                        />
                        <PartnersPageCardMobile
                            Svg={partner4Icon}
                            name={t('Министерство сельского хозяйства Российской Федерации')}
                            description={t('описание сотрудничества с министерством сельского хозяйства Российской Федерации')}
                            link="https://mcx.gov.ru/"
                        />
                        <PartnersPageCardMobile
                            Svg={partner5Icon}
                            name={t('Российская академия наук')}
                            description={t('описание сотрудничества с российской академией наук')}
                            link="https://www.ras.ru/"
                        />
                    </VStack>
                </VStack>
            </VStack>
        </Page>
    );
});

export default PartnersPageMobile;
