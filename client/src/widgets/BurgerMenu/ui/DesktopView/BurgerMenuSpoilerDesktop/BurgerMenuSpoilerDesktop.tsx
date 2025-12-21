import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useState } from 'react';
import { HStack, VStack } from 'shared/ui/Stack';
import { AppLinkDesktop, AppLinkDesktopTheme } from 'shared/ui/AppLink/DesktopView/AppLinkDesktop';
import arrowDownIcon from 'shared/assets/icons/arrow-down-34-34-white.svg';
import { Icon, IconTheme } from 'shared/ui/Icon/Icon';
import { Transition } from 'react-transition-group';
import { BurgerMenuDataSection } from '../../../model/types/BurgerMenuData';
import cls from './BurgerMenuSpoilerDesktop.module.scss';

interface BurgerMenuSpoilerDesktopProps {
    className?: string;
    section: BurgerMenuDataSection;
    onClose?: () => void;
}

export const BurgerMenuSpoilerDesktop = memo((props: BurgerMenuSpoilerDesktopProps) => {
    const {
        className,
        section,
        onClose,
    } = props;
    const [isOpen, setIsOpen] = useState<boolean>(true);

    const onToggle = useCallback(() => {
        setIsOpen((prevState) => !prevState);
    }, []);

    const closeHandler = useCallback(() => {
        onClose?.();
    }, [onClose]);

    return (
        <VStack
            className={classNames(cls.BurgerMenuSpoilerDesktop, {}, [className])}
            maxW
            paddingT={10}
            paddingB={10}
        >
            <HStack
                maxW
                align="center"
                justify="between"
            >
                <AppLinkDesktop
                    theme={AppLinkDesktopTheme.WHITE}
                    to={section.path}
                    onClick={closeHandler}
                >
                    {section.text}
                </AppLinkDesktop>
                <Icon
                    Svg={arrowDownIcon}
                    theme={IconTheme.CLEAN}
                    className={classNames(cls.arrowIcon, { [cls.arrowIsOpen]: isOpen }, [])}
                    onClick={onToggle}
                />
            </HStack>
            <Transition
                in={isOpen}
                timeout={200}
                unmountOnExit
                mountOnEnter
            >
                {(state) => {
                    const transitionStates = {
                        entering: cls.spoilerContentEntering,
                        entered: cls.spoilerContentEntered,
                        exiting: cls.spoilerContentExiting,
                        exited: cls.spoilerContentExited,
                        unmounted: cls.spoilerContentUnmounted,
                    };

                    return (
                        <div
                            className={`${cls.spoilerContent} ${transitionStates[state]}`}
                        >
                            <VStack
                                maxW
                                gap={16}
                                style={{
                                    minHeight: 0,
                                }}
                            >
                                {section.subSections.map((item, index) => (
                                    <AppLinkDesktop
                                        theme={AppLinkDesktopTheme.GREY_SMALL}
                                        to={item.path}
                                        key={index}
                                        onClick={closeHandler}
                                    >
                                        {item.text}
                                    </AppLinkDesktop>
                                ))}
                            </VStack>
                        </div>
                    );
                }}
            </Transition>

        </VStack>
    );
});
