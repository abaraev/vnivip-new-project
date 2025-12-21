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
import { getActsPageDocuments, getActsPageInited } from '../../../model/selectors/getActsPage';
import { fetchDocuments } from '../../../model/services/fetchDocuments';
import { ActsPageActions, ActsPageReducer } from '../../../model/slices/ActsPageSlice';
import cls from './ActsPageMobile.module.scss';
import { ActsPageTitleMobile } from '../ActsPageTitleMobile/ActsPageTitleMobile';

interface ActsPageMobileProps {
    className?: string;
}

const reducers: ReducersList = {
    actsPage: ActsPageReducer,
};

const ActsPageMobile = memo((props: ActsPageMobileProps) => {
    const {
        className,
    } = props;
    const dispatch = useAppDispatch();
    const inited = useSelector(getActsPageInited);
    const documents = useSelector(getActsPageDocuments);

    useEffect(() => {
        if (!inited) {
            dispatch(fetchDocuments());
            dispatch(ActsPageActions.init());
        }
    }, [dispatch, inited]);

    return (
        <DynamicModuleLoader
            reducers={reducers}
            removeAfterUnmount={false}
        >
            <Page
                className={classNames(cls.ActsPageMobile, {}, [className])}
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
                        <ActsPageTitleMobile />
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

export default ActsPageMobile;
