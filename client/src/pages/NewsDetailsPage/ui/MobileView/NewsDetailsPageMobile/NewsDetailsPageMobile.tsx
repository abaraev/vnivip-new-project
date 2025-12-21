import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useEffect } from 'react';
import { HStack, VStack } from 'shared/ui/Stack';
import { useParams } from 'react-router-dom';
import news1Img from 'shared/assets/images/news1.webp';
import news2Img from 'shared/assets/images/news2.webp';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ParagraphMobile } from 'entities/Paragraph';
import { Page } from 'widgets/Page';
import {
    Text, TextAlign, TextSize, TextTheme,
} from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import { CoverMobile, CoverMobileSize } from 'shared/ui/Cover/MobileView/CoverMobile';
import { getNewsDetailsPageInited, getNewsDetailsPageNews } from '../../../model/selectors/getNewsDetailsPage';
import { NewsDetailsPageReducer } from '../../../model/slices/NewsDetailsPageSlice';
import { fetchNewFullNews } from '../../../model/services/fetchNewFullNews';
import cls from './NewsDetailsPageMobile.module.scss';

interface NewsDetailsPageMobileProps {
    className?: string;
}

const reducers: ReducersList = {
    newsDetailsPage: NewsDetailsPageReducer,
};

const NewsDetailsPageMobile = memo((props: NewsDetailsPageMobileProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('newsDetailsPage');
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const inited = useSelector(getNewsDetailsPageInited);
    const news = useSelector(getNewsDetailsPageNews);

    useEffect(() => {
        dispatch(fetchNewFullNews({ newsId: Number(id) }));
    }, [dispatch, id]);

    return (
        <DynamicModuleLoader
            reducers={reducers}
            removeAfterUnmount={false}
        >
            <Page
                className={classNames(cls.NewsDetailsPageMobile, {}, [className])}
            >
                <VStack
                    align="center"
                    maxW
                >
                    <CoverMobile
                        size={CoverMobileSize.SMALL}
                        images={[
                            news2Img,
                            news1Img,
                        ]}
                    />
                    {news && (
                        <VStack
                            className={cls.contentWrapper}
                            paddingT={30}
                            paddingL={10}
                            paddingR={10}
                            paddingB={50}
                            gap={50}
                        >
                            <VStack
                                gap={20}
                                maxW
                                align="center"
                            >
                                <HStack
                                    maxW
                                    paddingB={20}
                                >
                                    <Text
                                        theme={TextTheme.GREY}
                                        size={TextSize.BODY_S_MOBILE}
                                    >
                                        {`${t('Дата создания')}: ${new Date(Number(news?.timestamp) || news.createdAt)
                                            .toLocaleDateString().replace(/\./g, '/')}`}
                                    </Text>
                                </HStack>
                                <Text
                                    theme={TextTheme.DARK2}
                                    size={TextSize.H2_MOBILE}
                                    align={TextAlign.CENTER}
                                    className={cls.newsTitle}
                                >
                                    {news?.title}
                                </Text>
                                <Text
                                    theme={TextTheme.DARK2}
                                    size={TextSize.BODY_L_MOBILE}
                                    align={TextAlign.CENTER}
                                    className={cls.newsDescription}
                                >
                                    {news?.description}
                                </Text>
                            </VStack>
                            <VStack
                                gap={30}
                                maxW
                            >
                                {news?.paragraphs.map((item) => (
                                    <ParagraphMobile
                                        data={item}
                                    />
                                ))}
                            </VStack>
                        </VStack>
                    )}
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
});

export default NewsDetailsPageMobile;
