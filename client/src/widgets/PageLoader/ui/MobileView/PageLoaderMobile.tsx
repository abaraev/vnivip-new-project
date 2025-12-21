import { classNames } from 'shared/lib/classNames/classNames';
import { Icon, IconTheme } from 'shared/ui/Icon/Icon';
import { HStack } from 'shared/ui/Stack';
import mainLogo from 'shared/assets/icons/main-logo.svg';
import { Portal } from 'shared/ui/Portal/Portal';
import { useSelector } from 'react-redux';
import { getIsLoadingPage } from 'features/UI';
import cls from './PageLoaderMobile.module.scss';

interface PageLoaderMobileProps {
    className?: string;
}

export const PageLoaderMobile = ({ className }: PageLoaderMobileProps) => {
    const isLoading = useSelector(getIsLoadingPage);

    return (
        <Portal>
            <HStack
                className={classNames(cls.PageLoaderMobile, { [cls.loadingDone]: !isLoading }, [className])}
                justify="center"
                align="center"
            >
                <Icon
                    Svg={mainLogo}
                    theme={IconTheme.CLEAN}
                    className={cls.icon}
                />
            </HStack>
        </Portal>
    );
};
