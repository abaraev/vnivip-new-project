import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useEffect } from 'react';
import { Page } from 'widgets/Page';
import { VStack } from 'shared/ui/Stack';
import { CoverDesktop, CoverDesktopSize } from 'shared/ui/Cover/DesktopView/CoverDesktop';
import books1Img from 'shared/assets/images/books1.webp';
import books2Img from 'shared/assets/images/books2.webp';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { VacancyDesktop } from 'entities/Vacancy';
import { getVacanciesPageInited, getVacanciesPageVacancies } from '../../../model/selectors/getVacanciesPage';
import { fetchVacancies } from '../../../model/services/fetchVacancies';
import cls from './VacanciesPageDesktop.module.scss';
import { VacanciesPageTitleDesktop } from '../VacanciesPageTitleDesktop/VacanciesPageTitleDesktop';
import { VacanciesPageActions, VacanciesPageReducer } from '../../../model/slices/VacanciesPageSlice';

interface VacanciesPageDesktopProps {
    className?: string;
}

const reducers: ReducersList = {
    vacanciesPage: VacanciesPageReducer,
};

const VacanciesPageDesktop = memo((props: VacanciesPageDesktopProps) => {
    const {
        className,
    } = props;
    const dispatch = useAppDispatch();
    const inited = useSelector(getVacanciesPageInited);
    const vacancies = useSelector(getVacanciesPageVacancies);

    useEffect(() => {
        if (!inited) {
            dispatch(fetchVacancies());
            dispatch(VacanciesPageActions.init());
        }
    }, [dispatch, inited]);

    return (
        <DynamicModuleLoader
            reducers={reducers}
            removeAfterUnmount={false}
        >
            <Page className={classNames(cls.VacanciesPageDesktop, {}, [className])}>
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
                        <VacanciesPageTitleDesktop />
                        {!!vacancies?.length && (
                            <VStack
                                maxW
                                gap={50}
                                align="center"
                            >
                                {vacancies.map((item, index) => (
                                    <VacancyDesktop
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

export default VacanciesPageDesktop;
