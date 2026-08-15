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
import { ClinicPageActions, ClinicPageReducer } from 'pages/ClinicPage/model/slices/ClinicPageSlice';
import { ClinicPageTitleMobile } from '../ClinicPageTitleMobile/ClinicPageTitleMobile';
import { getClinicPageDocuments, getClinicPageInited } from '../../../model/selectors/getClinicPage';
import { fetchDocuments } from '../../../model/services/fetchDocuments';
import cls from './ClinicPageMobile.module.scss';

interface ClinicPageMobileProps {
    className?: string;
}

const reducers: ReducersList = {
    сlinicPage: ClinicPageReducer,
};

const ClinicPageMobile = memo((props: ClinicPageMobileProps) => {
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
            <Page
                className={classNames(cls.ClinicPageMobile, {}, [className])}
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
                        <ClinicPageTitleMobile />
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

export default ClinicPageMobile;
