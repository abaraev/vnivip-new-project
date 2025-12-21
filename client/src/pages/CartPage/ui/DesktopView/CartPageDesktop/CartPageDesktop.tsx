import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useEffect } from 'react';
import { Page } from 'widgets/Page';
import { HStack, VStack } from 'shared/ui/Stack';
import { CoverDesktop, CoverDesktopSize } from 'shared/ui/Cover/DesktopView/CoverDesktop';
import shop1Img from 'shared/assets/images/shop1.webp';
import shop2Img from 'shared/assets/images/shop2.webp';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { getCart } from 'entities/Cart';
import { CartPageFormDesktop } from '../CartPageFormDesktop/CartPageFormDesktop';
import { CartPageServicesDesktop } from '../CartPageServicesDesktop/CartPageServicesDesktop';
import { CartPageTitleDesktop } from '../CartPageTitleDesktop/CartPageTitleDesktop';
import { getCartPageInited } from '../../../model/selectors/getCartPage';
import { fetchServicesByIds } from '../../../model/services/fetchServicesByIds';
import cls from './CartPageDesktop.module.scss';
import { CartPageActions, CartPageReducer } from '../../../model/slices/CartPageSlice';

interface CartPageDesktopProps {
    className?: string;
}

const reducers: ReducersList = {
    cartPage: CartPageReducer,
};

const CartPageDesktop = memo((props: CartPageDesktopProps) => {
    const {
        className,
    } = props;
    const dispatch = useAppDispatch();
    const inited = useSelector(getCartPageInited);
    const cart = useSelector(getCart);

    useEffect(() => {
        if (!inited) {
            dispatch(CartPageActions.init());
        }
    }, [dispatch, inited]);

    useEffect(() => {
        if (inited) {
            dispatch(fetchServicesByIds());
        }
    }, [cart.length, dispatch, inited]);

    return (
        <DynamicModuleLoader
            reducers={reducers}
        >
            <Page className={classNames(cls.CartPageDesktop, {}, [className])}>
                <VStack
                    maxW
                    maxH
                    gap={50}
                    paddingB={100}
                >
                    <CoverDesktop
                        size={CoverDesktopSize.SMALL}
                        images={[
                            shop1Img,
                            shop2Img,
                        ]}
                    />
                    <VStack
                        maxW
                        paddingL={50}
                        paddingR={50}
                        align="center"
                        gap={100}
                    >
                        <CartPageTitleDesktop />
                        <HStack
                            maxW
                            justify="between"
                            align="center"
                        >
                            <CartPageFormDesktop />
                            <CartPageServicesDesktop />
                        </HStack>
                    </VStack>
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
});

export default CartPageDesktop;
