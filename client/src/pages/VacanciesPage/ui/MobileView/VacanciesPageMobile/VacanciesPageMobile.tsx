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
import { VacancyMobile } from 'entities/Vacancy';
import { getVacanciesPageInited, getVacanciesPageVacancies } from '../../../model/selectors/getVacanciesPage';
import { fetchVacancies } from '../../../model/services/fetchVacancies';
import { VacanciesPageActions, VacanciesPageReducer } from '../../../model/slices/VacanciesPageSlice';
import cls from './VacanciesPageMobile.module.scss';
import { VacanciesPageTitleMobile } from '../VacanciesPageTitleMobile/VacanciesPageTitleMobile';

interface VacanciesPageMobileProps {
    className?: string;
}

const reducers: ReducersList = {
    vacanciesPage: VacanciesPageReducer,
};

const VacanciesPageMobile = memo((props: VacanciesPageMobileProps) => {
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
            <Page
                className={classNames(cls.VacanciesPageMobile, {}, [className])}
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
                        <VacanciesPageTitleMobile />
                        {!!vacancies?.length && (
                            <VStack
                                maxW
                                gap={30}
                                align="center"
                            >
                                {vacancies.map((item, index) => (
                                    <VacancyMobile
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

export default VacanciesPageMobile;
