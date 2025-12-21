import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from 'widgets/Page';
import { VStack } from 'shared/ui/Stack';
import { CoverDesktop, CoverDesktopSize } from 'shared/ui/Cover/DesktopView/CoverDesktop';
import partners1Img from 'shared/assets/images/partners1.webp';
import partners2Img from 'shared/assets/images/partners2.webp';
import partner1Icon from 'shared/assets/icons/partner1-100-100.svg';
import partner2Icon from 'shared/assets/icons/partner2-100-100.svg';
import partner4Icon from 'shared/assets/icons/partner4-120-120.svg';
import partner5Icon from 'shared/assets/icons/partner5-230-100.svg';
import { PartnersPageTitleDesktop } from '../PartnersPageTitleDesktop/PartnersPageTitleDesktop';
import cls from './PartnersPageDesktop.module.scss';
import { PartnersPageCardDesktop } from '../PartnersPageCardDesktop/PartnersPageCardDesktop';

interface PartnersPageDesktopProps {
    className?: string;
}

const PartnersPageDesktop = memo((props: PartnersPageDesktopProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('partnersPage');

    return (
        <Page className={classNames(cls.PartnersPageDesktop, {}, [className])}>
            <VStack
                maxW
                maxH
                gap={50}
                paddingB={100}
            >
                <CoverDesktop
                    size={CoverDesktopSize.SMALL}
                    images={[
                        partners1Img,
                        partners2Img,
                    ]}
                />
                <VStack
                    paddingL={50}
                    paddingR={50}
                    maxW
                    gap={100}
                >
                    <PartnersPageTitleDesktop />
                    <VStack
                        gap={50}
                        maxW
                        align="center"
                    >
                        <PartnersPageCardDesktop
                            Svg={partner1Icon}
                            name={t('Российский научный фонд')}
                            description={t('описание сотрудничества с российским научным фондом')}
                            link="https://rscf.ru/"
                        />
                        <PartnersPageCardDesktop
                            Svg={partner2Icon}
                            name={t('Российский птицеводческий союз')}
                            description={t('описание сотрудничества с российским птицеводческим союзом')}
                            link="http://rps.ru/"
                        />
                        <PartnersPageCardDesktop
                            Svg={partner4Icon}
                            name={t('Министерство сельского хозяйства Российской Федерации')}
                            description={t('описание сотрудничества с министерством сельского хозяйства Российской Федерации')}
                            link="https://mcx.gov.ru/"
                        />
                        <PartnersPageCardDesktop
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

export default PartnersPageDesktop;
