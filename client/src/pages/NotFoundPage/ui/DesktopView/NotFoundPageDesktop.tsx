import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Page } from 'widgets/Page';
import { useNavigate } from 'react-router-dom';
import { CoverDesktop, CoverDesktopSize } from 'shared/ui/Cover/DesktopView/CoverDesktop';
import books1Img from 'shared/assets/images/books1.webp';
import books2Img from 'shared/assets/images/books2.webp';
import { VStack } from 'shared/ui/Stack';
import { ButtonDesktop, ButtonDesktopTheme } from 'shared/ui/Button/DesktopView/ButtonDesktop';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import cls from './NotFoundPageDesktop.module.scss';

interface NotFoundPageDesktopProps {
    className?: string;
}

const NotFoundPageDesktop = ({ className }: NotFoundPageDesktopProps) => {
    const { t } = useTranslation('notFoundPage');
    const navigate = useNavigate();

    return (
        <Page
            className={classNames(cls.NotFoundPageDesktop, {}, [className])}
        >
            <VStack
                maxW
                maxH
            >
                <CoverDesktop
                    size={CoverDesktopSize.SMALL}
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
                    gap={50}
                >
                    <Text
                        theme={TextTheme.DARK2}
                        size={TextSize.H2_DESKTOP}
                    >
                        {t('Страница не найдена')}
                    </Text>
                    <ButtonDesktop
                        onClick={() => navigate('/')}
                        theme={ButtonDesktopTheme.PRIMARY}
                    >
                        {t('Вернуться на главную')}
                    </ButtonDesktop>
                </VStack>
            </VStack>
        </Page>
    );
};

export default NotFoundPageDesktop;
