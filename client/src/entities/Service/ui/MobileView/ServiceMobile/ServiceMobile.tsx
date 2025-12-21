import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useState } from 'react';
import { HStack, VStack } from 'shared/ui/Stack';
import { ImageDesktop } from 'shared/ui/Image';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import { Icon, IconTheme } from 'shared/ui/Icon/Icon';
import cartIcon from 'shared/assets/icons/cart-16-16-white.svg';
import okIcon from 'shared/assets/icons/ok-16-16-white.svg';
import { ButtonMobile, ButtonMobileTheme } from 'shared/ui/Button/MobileView/ButtonMobile';
import { useSelector } from 'react-redux';
import { CartSliceActions, getServiceById } from 'entities/Cart';
import { StateSchema } from 'app/providers/StoreProvider';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import coverImgReserve from 'shared/assets/images/img.jpg';
import { Service } from '../../../model/types/Service';
import cls from './ServiceMobile.module.scss';

interface ServiceMobileProps {
    className?: string;
    data: Service;
}

export const ServiceMobile = memo((props: ServiceMobileProps) => {
    const {
        className,
        data,
    } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const currentService = useSelector(
        (state: StateSchema) => getServiceById(state, data.id),
    );
    const [amount, setAmount] = useState(currentService?.amount || 0);

    const onAddClick = useCallback(() => {
        setAmount((prevState) => prevState + 1);
        dispatch(CartSliceActions.addService(data.id));
    }, [data.id, dispatch]);

    const onRemoveClick = useCallback(() => {
        setAmount((prevState) => prevState - 1);
        dispatch(CartSliceActions.removeService(data.id));
    }, [data.id, dispatch]);

    const onDeleteClick = useCallback(() => {
        setAmount(0);
        dispatch(CartSliceActions.deleteService(data.id));
    }, [data.id, dispatch]);

    return (
        <VStack
            className={classNames(cls.ServiceMobile, {}, [className])}
            padding={16}
            justify="between"
        >
            <VStack
                gap={10}
                maxW
            >
                <ImageDesktop
                    src={data.coverImg ? `${__API__}/static/images/${data.coverImg}` : coverImgReserve}
                    className={cls.img}
                />
                <Text
                    theme={TextTheme.DARK2}
                    size={TextSize.BODY_MOBILE}
                    className={cls.name}
                >
                    {data.name}
                </Text>
            </VStack>
            <HStack
                maxW
                paddingL={10}
                paddingB={10}
                justify="between"
                align="center"
            >
                <Text
                    theme={TextTheme.BLUE2}
                    size={TextSize.BODY_MOBILE}
                    className={cls.price}
                >
                    {`${data.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$& ')}`}
                </Text>
                {amount === 0 && (
                    <div
                        className={cls.cartBtn}
                        onClick={onAddClick}
                    >
                        <Text
                            theme={TextTheme.WHITE}
                            size={TextSize.BODY_MINI_MOBILE}
                            className={cls.cartText}
                        >
                            {t('В корзину')}
                        </Text>
                        <Icon
                            theme={IconTheme.CLEAN}
                            Svg={cartIcon}
                        />
                    </div>
                )}
                {amount > 0 && (
                    <div
                        className={cls.cartAddedWrapper}
                    >
                        <div
                            className={cls.cartAddedCounter}
                        >
                            <ButtonMobile
                                theme={ButtonMobileTheme.CLEAN}
                                className={amount > 1 ? cls.btnMinus : cls.btnMinusOpacity}
                                onClick={onRemoveClick}
                            >
                                -
                            </ButtonMobile>
                            <Text
                                theme={TextTheme.DARK2}
                                size={TextSize.BODY_S_MOBILE}
                                className={cls.textAdded}
                            >
                                {amount}
                            </Text>
                            <ButtonMobile
                                theme={ButtonMobileTheme.CLEAN}
                                className={cls.btnPlus}
                                onClick={onAddClick}
                            >
                                +
                            </ButtonMobile>
                        </div>
                        <div
                            className={cls.cartBtnAdded}
                            onClick={onDeleteClick}
                        >
                            <Icon
                                theme={IconTheme.CLEAN}
                                Svg={okIcon}
                            />
                            <Icon
                                theme={IconTheme.CLEAN}
                                Svg={cartIcon}
                            />
                        </div>
                    </div>
                )}
            </HStack>
        </VStack>
    );
});
