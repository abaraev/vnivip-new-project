import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Page } from 'widgets/Page';
import { useNavigate } from 'react-router-dom';
import books1Img from 'shared/assets/images/books1.webp';
import books2Img from 'shared/assets/images/books2.webp';
import { VStack } from 'shared/ui/Stack';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { CoverMobile, CoverMobileSize } from 'shared/ui/Cover/MobileView/CoverMobile';
import { ButtonMobile, ButtonMobileTheme } from 'shared/ui/Button/MobileView/ButtonMobile';
import cls from './NotFoundPageMobile.module.scss';

interface NotFoundPageMobileProps {
    className?: string;
}

const NotFoundPageMobile = ({ className }: NotFoundPageMobileProps) => {
    const { t } = useTranslation('notFoundPage');
    const navigate = useNavigate();

    return (
        <Page
            className={classNames(cls.NotFoundPageMobile, {}, [className])}
        >
            <VStack
                maxW
                maxH
            >
                <CoverMobile
                    size={CoverMobileSize.SMALL}
                    images={[
                        books1Img,
                        books2Img,
                    ]}
                />
                <VStack
                    maxW
                    align="center"
                    justify="center"
                    className={cls.contentWrapper}
                    gap={30}
                >
                    <Text
                        theme={TextTheme.DARK2}
                        size={TextSize.H2_MOBILE}
                    >
                        {t('Страница не найдена')}
                    </Text>
                    <ButtonMobile
                        onClick={() => navigate('/')}
                        theme={ButtonMobileTheme.PRIMARY}
                    >
                        {t('Вернуться на главную')}
                    </ButtonMobile>
                </VStack>
            </VStack>
        </Page>
    );
};

export default NotFoundPageMobile;
