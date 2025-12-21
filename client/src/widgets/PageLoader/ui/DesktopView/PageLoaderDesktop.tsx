import { classNames } from 'shared/lib/classNames/classNames';
import { Icon, IconTheme } from 'shared/ui/Icon/Icon';
import { HStack } from 'shared/ui/Stack';
import mainLogo from 'shared/assets/icons/main-logo.svg';
import { Portal } from 'shared/ui/Portal/Portal';
import { useSelector } from 'react-redux';
import { getIsLoadingPage } from 'features/UI';
import cls from './PageLoaderDesktop.module.scss';

interface PageLoaderDesktopProps {
    className?: string;
}

export const PageLoaderDesktop = ({ className }: PageLoaderDesktopProps) => {
    const isLoading = useSelector(getIsLoadingPage);

    return (
        <Portal>
            <HStack
                className={classNames(cls.PageLoaderDesktop, { [cls.loadingDone]: !isLoading }, [className])}
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
