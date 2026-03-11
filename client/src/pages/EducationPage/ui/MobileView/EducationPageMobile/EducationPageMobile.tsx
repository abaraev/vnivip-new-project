import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useEffect } from 'react';
import { Page } from 'widgets/Page';
import { CoverMobile, CoverMobileSize } from 'shared/ui/Cover/MobileView/CoverMobile';
import { VStack } from 'shared/ui/Stack';
import books1Img from 'shared/assets/images/books1.webp';
import books2Img from 'shared/assets/images/books2.webp';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { DocumentMobile } from 'entities/Document';
import { EducationPageTitleMobile } from 'pages/EducationPage/ui/MobileView/EducationPageTitleMobile/EducationPageTitleMobile';
import {
    Text, TextAlign, TextSize, TextTheme,
} from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import { getEducationPageDocuments, getEducationPageInited } from '../../../model/selectors/getEducationPage';
import { fetchDocuments } from '../../../model/services/fetchDocuments';
import { EducationPageActions, EducationPageReducer } from '../../../model/slices/EducationPageSlice';
import cls from './EducationPageMobile.module.scss';

interface EducationPageMobileProps {
    className?: string;
}

const reducers: ReducersList = {
    educationPage: EducationPageReducer,
};

const EducationPageMobile = memo((props: EducationPageMobileProps) => {
    const {
        className,
    } = props;
    const dispatch = useAppDispatch();
    const inited = useSelector(getEducationPageInited);
    const documents = useSelector(getEducationPageDocuments);
    const { t } = useTranslation('educationPage');

    useEffect(() => {
        if (!inited) {
            dispatch(fetchDocuments());
            dispatch(EducationPageActions.init());
        }
    }, [dispatch, inited]);

    return (
        <DynamicModuleLoader
            reducers={reducers}
            removeAfterUnmount={false}
        >
            <Page
                className={classNames(cls.EducationPageMobile, {}, [className])}
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
                            books1Img,
                            books2Img,
                        ]}
                    />
                    <VStack
                        maxW
                        paddingL={10}
                        paddingR={10}
                        align="center"
                        gap={50}
                    >
                        <EducationPageTitleMobile />
                        <Text
                            theme={TextTheme.DARK2}
                            size={TextSize.BODY_L_MOBILE}
                            className={cls.titleFiles}
                        >
                            {`${t('Файлы')}:`}
                        </Text>
                        {!!documents?.length && (
                            <VStack
                                maxW
                                gap={20}
                            >
                                {documents.map((item, index) => (
                                    <DocumentMobile
                                        data={item}
                                        key={index}
                                    />
                                ))}
                            </VStack>
                        )}
                    </VStack>
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
});

export default EducationPageMobile;
