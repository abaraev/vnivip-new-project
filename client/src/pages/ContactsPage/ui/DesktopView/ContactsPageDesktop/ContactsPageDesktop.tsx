import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Page } from 'widgets/Page';
import { VStack } from 'shared/ui/Stack';
import { CoverDesktop, CoverDesktopSize } from 'shared/ui/Cover/DesktopView/CoverDesktop';
import contacts1Img from 'shared/assets/images/contacts1.webp';
import contacts2Img from 'shared/assets/images/contacts2.webp';
import {
    ContactsPageTitleDesktop,
} from '../ContactsPageTitleDesktop/ContactsPageTitleDesktop';
import cls from './ContactsPageDesktop.module.scss';

interface ContactsPageDesktopProps {
    className?: string;
}

const ContactsPageDesktop = memo((props: ContactsPageDesktopProps) => {
    const {
        className,
    } = props;

    return (
        <Page className={classNames(cls.ContactsPageDesktop, {}, [className])}>
            <VStack
                maxW
                maxH
                gap={50}
                paddingB={100}
            >
                <CoverDesktop
                    size={CoverDesktopSize.SMALL}
                    images={[
                        contacts1Img,
                        contacts2Img,
                    ]}
                />
                <VStack
                    maxW
                    paddingL={50}
                    paddingR={50}
                    gap={100}
                    align="center"
                >
                    <ContactsPageTitleDesktop />
                    <iframe
                        src={'https://yandex.ru/map-widget/v1/?um=constructor%3A8ec308a39e66fa8e0c4ad387b3af27426896371fb357eef4e3c95e79f910ca18&amp;source=constructor'}
                        title="yandexMap"
                        className={cls.map}
                    />
                </VStack>
            </VStack>
        </Page>
    );
});

export default ContactsPageDesktop;
