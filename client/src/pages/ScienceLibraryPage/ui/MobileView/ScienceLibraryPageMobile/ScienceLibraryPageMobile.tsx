import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Page } from 'widgets/Page';
import { CoverMobile, CoverMobileSize } from 'shared/ui/Cover/MobileView/CoverMobile';
import { VStack } from 'shared/ui/Stack';
import books1Img from 'shared/assets/images/books1.webp';
import books2Img from 'shared/assets/images/books2.webp';
import {
    ScienceLibraryPageTitleMobile,
} from '../ScienceLibraryPageTitleMobile/ScienceLibraryPageTitleMobile';
import cls from './ScienceLibraryPageMobile.module.scss';

interface ScienceLibraryPageMobileProps {
    className?: string;
}

const ScienceLibraryPageMobile = memo((props: ScienceLibraryPageMobileProps) => {
    const {
        className,
    } = props;

    return (
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
                >
                    <ScienceLibraryPageTitleMobile />
                </VStack>
            </VStack>
        </Page>
    );
});

export default ScienceLibraryPageMobile;
