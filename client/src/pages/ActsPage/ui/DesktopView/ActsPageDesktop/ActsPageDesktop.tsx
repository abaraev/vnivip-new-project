import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useEffect } from 'react';
import { Page } from 'widgets/Page';
import { HStack, VStack } from 'shared/ui/Stack';
import { CoverDesktop, CoverDesktopSize } from 'shared/ui/Cover/DesktopView/CoverDesktop';
import books1Img from 'shared/assets/images/books1.webp';
import books2Img from 'shared/assets/images/books2.webp';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { DocumentDesktop } from 'entities/Document';
import MediaQuery from 'react-responsive';
import { getActsPageDocuments, getActsPageInited } from '../../../model/selectors/getActsPage';
import cls from './ActsPageDesktop.module.scss';
import { ActsPageTitleDesktop } from '../ActsPageTitleDesktop/ActsPageTitleDesktop';
import { ActsPageActions, ActsPageReducer } from '../../../model/slices/ActsPageSlice';
import { fetchDocuments } from '../../../model/services/fetchDocuments';

interface ActsPageDesktopProps {
    className?: string;
}

const reducers: ReducersList = {
    actsPage: ActsPageReducer,
};

const ActsPageDesktop = memo((props: ActsPageDesktopProps) => {
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
            <Page className={classNames(cls.ActsPageDesktop, {}, [className])}>
                <VStack
                    maxW
                    maxH
                    gap={50}
                    paddingB={100}
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
                        paddingL={50}
                        paddingR={50}
                        align="center"
                        gap={100}
                    >
                        <ActsPageTitleDesktop />
                        <MediaQuery
                            minWidth={1300}
                        >
                            {!!documents?.length && (
                                <HStack
                                    maxW
                                    gap={30}
                                    wrap="wrap"
                                >
                                    {documents.map((item, index) => (
                                        <DocumentDesktop
                                            data={item}
                                            key={index}
                                            className={cls.document}
                                        />
                                    ))}
                                </HStack>
                            )}
                        </MediaQuery>
                        <MediaQuery
                            maxWidth={1300}
                        >
                            {!!documents?.length && (
                                <VStack
                                    maxW
                                    gap={30}
                                >
                                    {documents.map((item, index) => (
                                        <DocumentDesktop
                                            data={item}
                                            key={index}
                                        />
                                    ))}
                                </VStack>
                            )}
                        </MediaQuery>
                    </VStack>
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
});

export default ActsPageDesktop;
