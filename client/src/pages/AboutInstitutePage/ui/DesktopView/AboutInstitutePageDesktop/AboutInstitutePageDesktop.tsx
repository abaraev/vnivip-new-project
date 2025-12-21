import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Page } from 'widgets/Page';
import { HStack, VStack } from 'shared/ui/Stack';
import { CoverDesktop, CoverDesktopSize } from 'shared/ui/Cover/DesktopView/CoverDesktop';
import history1Img from 'shared/assets/images/history1.webp';
import history2Img from 'shared/assets/images/history2.webp';
import cls from './AboutInstitutePageDesktop.module.scss';
import {
    AboutInstitutePageLeftDesktop,
} from '../AboutInstitutePageLeftDesktop/AboutInstitutePageLeftDesktop';
import {
    AboutInstitutePageRightDesktop,
} from '../AboutInstitutePageRightDesktop/AboutInstitutePageRightDesktop';

interface AboutInstitutePageDesktopProps {
    className?: string;
}

const AboutInstitutePageDesktop = memo((props: AboutInstitutePageDesktopProps) => {
    const {
        className,
    } = props;

    return (
        <Page className={classNames(cls.AboutInstitutePageDesktop, {}, [className])}>
            <VStack
                maxW
                maxH
            >
                <CoverDesktop
                    size={CoverDesktopSize.SMALL}
                    images={[
                        history1Img,
                        history2Img,
                    ]}
                />
                <HStack
                    maxW
                    className={cls.content}
                >
                    <AboutInstitutePageLeftDesktop />
                    <AboutInstitutePageRightDesktop />
                </HStack>
            </VStack>
        </Page>
    );
});

export default AboutInstitutePageDesktop;
