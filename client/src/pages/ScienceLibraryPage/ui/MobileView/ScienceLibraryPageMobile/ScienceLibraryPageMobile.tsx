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
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import { ScienceLibraryPageTitleMobile } from '../ScienceLibraryPageTitleMobile/ScienceLibraryPageTitleMobile';
import {
    getScienceLibraryPageDocuments,
    getScienceLibraryPageInited,
} from '../../../model/selectors/getScienceLibraryPage';
import { fetchDocuments } from '../../../model/services/fetchDocuments';
import { ScienceLibraryPageActions, ScienceLibraryPageReducer } from '../../../model/slices/ScienceLibraryPageSlice';
import cls from './ScienceLibraryPageMobile.module.scss';

interface ScienceLibraryPageMobileProps {
    className?: string;
}

const reducers: ReducersList = {
    scienceLibraryPage: ScienceLibraryPageReducer,
};

const ScienceLibraryPageMobile = memo((props: ScienceLibraryPageMobileProps) => {
    const {
        className,
    } = props;
    const dispatch = useAppDispatch();
    const inited = useSelector(getScienceLibraryPageInited);
    const documents = useSelector(getScienceLibraryPageDocuments);
    const { t } = useTranslation('scienceLibraryPage');

    useEffect(() => {
        if (!inited) {
            dispatch(fetchDocuments());
            dispatch(ScienceLibraryPageActions.init());
        }
    }, [dispatch, inited]);

    return (
        <DynamicModuleLoader
            reducers={reducers}
            removeAfterUnmount={false}
        >
            <Page
                className={classNames(cls.ScienceLibraryPageMobile, {}, [className])}
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
                        <ScienceLibraryPageTitleMobile />
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

export default ScienceLibraryPageMobile;
