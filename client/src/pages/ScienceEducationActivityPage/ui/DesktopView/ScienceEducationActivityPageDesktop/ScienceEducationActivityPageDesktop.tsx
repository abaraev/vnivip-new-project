import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Page } from 'widgets/Page';
import { VStack } from 'shared/ui/Stack';
import { CoverDesktop, CoverDesktopSize } from 'shared/ui/Cover/DesktopView/CoverDesktop';
import books1Img from 'shared/assets/images/books1.webp';
import books2Img from 'shared/assets/images/books2.webp';
import {
    ScienceEducationActivityPageTitleDesktop,
} from '../ScienceEducationActivityPageTitleDesktop/ScienceEducationActivityPageTitleDesktop';
import cls from './ScienceEducationActivityPageDesktop.module.scss';

interface ScienceEducationActivityPageDesktopProps {
    className?: string;
}

const ScienceEducationActivityPageDesktop = memo((props: ScienceEducationActivityPageDesktopProps) => {
    const {
        className,
    } = props;

    return (
        <Page className={classNames(cls.ScienceEducationActivityPageDesktop, {}, [className])}>
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
                >
                    <ScienceEducationActivityPageTitleDesktop />
                </VStack>
            </VStack>
        </Page>
    );
});

export default ScienceEducationActivityPageDesktop;
