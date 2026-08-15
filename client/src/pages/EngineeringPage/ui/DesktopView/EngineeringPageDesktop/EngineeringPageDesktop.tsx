import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useEffect } from 'react';
import { Page } from 'widgets/Page';
import { VStack } from 'shared/ui/Stack';
import { CoverDesktop, CoverDesktopSize } from 'shared/ui/Cover/DesktopView/CoverDesktop';
import books1Img from 'shared/assets/images/books1.webp';
import books2Img from 'shared/assets/images/books2.webp';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ContentCardDesktop } from 'entities/ContentCard';
import { getEngineeringPageContentCards } from '../../../model/selectors/getEngineeringPage';
import { EngineeringPageReducer } from '../../../model/slices/EngineeringPageSlice';
import { fetchContentCards } from '../../../model/services/fetchContentCards';
import cls from './EngineeringPageDesktop.module.scss';
import { EngineeringPageTitleDesktop } from '../EngineeringPageTitleDesktop/EngineeringPageTitleDesktop';

interface EngineeringPageDesktopProps {
    className?: string;
}

const reducers: ReducersList = {
    engineeringPage: EngineeringPageReducer,
};

const EngineeringPageDesktop = memo((props: EngineeringPageDesktopProps) => {
    const {
        className,
    } = props;
    const dispatch = useAppDispatch();
    const contentCards = useSelector(getEngineeringPageContentCards);

    useEffect(() => {
        dispatch(fetchContentCards());
    }, [dispatch]);

    return (
        <DynamicModuleLoader
            reducers={reducers}
        >
            <Page className={classNames(cls.EngineeringPageDesktop, {}, [className])}>
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
                        gap={80}
                    >
                        <EngineeringPageTitleDesktop />
                        <VStack
                            maxW
                            gap={50}
                            className={cls.contentWrapper}
                        >
                            {contentCards?.map((item) => (
                                <ContentCardDesktop
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

export default EngineeringPageDesktop;
