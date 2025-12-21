import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useEffect } from 'react';
import { Page } from 'widgets/Page';
import { CoverMobile, CoverMobileSize } from 'shared/ui/Cover/MobileView/CoverMobile';
import { VStack } from 'shared/ui/Stack';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { getCart } from 'entities/Cart';
import shop1Img from 'shared/assets/images/shop1.webp';
import shop2Img from 'shared/assets/images/shop2.webp';
import { CartPageFormMobile } from '../CartPageFormMobile/CartPageFormMobile';
import { CartPageServicesMobile } from '../CartPageServicesMobile/CartPageServicesMobile';
import { CartPageTitleMobile } from '../CartPageTitleMobile/CartPageTitleMobile';
import { getCartPageInited } from '../../../model/selectors/getCartPage';
import { fetchServicesByIds } from '../../../model/services/fetchServicesByIds';
import { CartPageActions, CartPageReducer } from '../../../model/slices/CartPageSlice';
import cls from './CartPageMobile.module.scss';

interface CartPageMobileProps {
    className?: string;
}

const reducers: ReducersList = {
    cartPage: CartPageReducer,
};

const CartPageMobile = memo((props: CartPageMobileProps) => {
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
            <Page
                className={classNames(cls.CartPageMobile, {}, [className])}
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
                            shop1Img,
                            shop2Img,
                        ]}
                    />
                    <VStack
                        maxW
                        paddingL={10}
                        paddingR={10}
                        align="center"
                        gap={50}
                    >
                        <CartPageTitleMobile />
                        <VStack
                            maxW
                            gap={40}
                        >
                            <CartPageServicesMobile />
                            <CartPageFormMobile />
                        </VStack>
                    </VStack>
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
});

export default CartPageMobile;
