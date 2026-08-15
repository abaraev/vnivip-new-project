import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useEffect } from 'react';
import { Page } from 'widgets/Page';
import { CoverMobile, CoverMobileSize } from 'shared/ui/Cover/MobileView/CoverMobile';
import { VStack } from 'shared/ui/Stack';
import books1Img from 'shared/assets/images/books1.webp';
import books2Img from 'shared/assets/images/books2.webp';
import { ContentCardMobile } from 'entities/ContentCard';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { getEngineeringPageContentCards } from '../../../model/selectors/getEngineeringPage';
import { fetchContentCards } from '../../../model/services/fetchContentCards';
import { EngineeringPageReducer } from '../../../model/slices/EngineeringPageSlice';
import cls from './EngineeringPageMobile.module.scss';
import { EngineeringPageTitleMobile } from '../EngineeringPageTitleMobile/EngineeringPageTitleMobile';

interface EngineeringPageMobileProps {
    className?: string;
}

const reducers: ReducersList = {
    engineeringPage: EngineeringPageReducer,
};

const EngineeringPageMobile = memo((props: EngineeringPageMobileProps) => {
    const {
        className,
    } = props;
    const dispatch = useAppDispatch();
    const contentCards = useSelector(getEngineeringPageContentCards);

    useEffect(() => {
        dispatch(fetchContentCards());
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page
                className={classNames(cls.EngineeringPageMobile, {}, [className])}
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
                        <EngineeringPageTitleMobile />
                        <VStack
                            maxW
                            gap={30}
                            className={cls.contentWrapper}
                        >
                            {contentCards?.map((item) => (
                                <ContentCardMobile
                                    data={item}
                                    key={item.id}
                                />
                            ))}
                        </VStack>
                    </VStack>
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
});

export default EngineeringPageMobile;
