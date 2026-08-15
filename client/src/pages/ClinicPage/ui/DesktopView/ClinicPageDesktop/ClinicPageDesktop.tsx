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
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import { getClinicPageDocuments, getClinicPageInited } from '../../../model/selectors/getClinicPage';
import cls from './ClinicPageDesktop.module.scss';
import { ClinicPageTitleDesktop } from '../ClinicPageTitleDesktop/ClinicPageTitleDesktop';
import { ClinicPageActions, ClinicPageReducer } from '../../../model/slices/ClinicPageSlice';
import { fetchDocuments } from '../../../model/services/fetchDocuments';

interface ClinicPageDesktopProps {
    className?: string;
}

const reducers: ReducersList = {
    сlinicPage: ClinicPageReducer,
};

const ClinicPageDesktop = memo((props: ClinicPageDesktopProps) => {
    const {
        className,
    } = props;
    const dispatch = useAppDispatch();
    const inited = useSelector(getClinicPageInited);
    const documents = useSelector(getClinicPageDocuments);
    const { t } = useTranslation('clinicPage');

    useEffect(() => {
        if (!inited) {
            dispatch(fetchDocuments());
            dispatch(ClinicPageActions.init());
        }
    }, [dispatch, inited]);

    return (
        <DynamicModuleLoader
            reducers={reducers}
            removeAfterUnmount={false}
        >
            <Page className={classNames(cls.ClinicPageDesktop, {}, [className])}>
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
                        <ClinicPageTitleDesktop />
                        <Text
                            theme={TextTheme.DARK2}
                            size={TextSize.BODY_L_DESKTOP}
                            className={cls.titleFiles}
                        >
                            {`${t('Файлы')}:`}
                        </Text>
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

export default ClinicPageDesktop;
