import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Page } from 'widgets/Page';
import { CoverMobile, CoverMobileSize } from 'shared/ui/Cover/MobileView/CoverMobile';
import { VStack } from 'shared/ui/Stack';
import contacts1Img from 'shared/assets/images/contacts1.webp';
import contacts2Img from 'shared/assets/images/contacts2.webp';
import {
    ContactsPageTitleMobile,
} from '../ContactsPageTitleMobile/ContactsPageTitleMobile';
import cls from './ContactsPageMobile.module.scss';

interface ContactsPageMobileProps {
    className?: string;
}

const ContactsPageMobile = memo((props: ContactsPageMobileProps) => {
    const {
        className,
    } = props;

    return (
        <Page
            className={classNames(cls.ContactsPageMobile, {}, [className])}
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
                        contacts1Img,
                        contacts2Img,
                    ]}
                />
                <VStack
                    maxW
                    paddingL={10}
                    paddingR={10}
                    gap={50}
                    align="center"
                >
                    <ContactsPageTitleMobile />
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

export default ContactsPageMobile;
