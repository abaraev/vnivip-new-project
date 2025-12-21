import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useState } from 'react';
import { HStack, VStack } from 'shared/ui/Stack';
import { ImageDesktop } from 'shared/ui/Image';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import { Icon, IconTheme } from 'shared/ui/Icon/Icon';
import cartIcon from 'shared/assets/icons/cart-20-20-white.svg';
import okIcon from 'shared/assets/icons/ok-20-20-white.svg';
import { ButtonDesktop, ButtonDesktopTheme } from 'shared/ui/Button/DesktopView/ButtonDesktop';
import { useSelector } from 'react-redux';
import { CartSliceActions, getServiceById } from 'entities/Cart';
import { StateSchema } from 'app/providers/StoreProvider';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useMediaQuery } from 'react-responsive';
import coverImgReserve from 'shared/assets/images/img.jpg';
import { Service } from '../../../model/types/Service';
import cls from './ServiceDesktop.module.scss';

interface ServiceDesktopProps {
    className?: string;
    data: Service;
}

export const ServiceDesktop = memo((props: ServiceDesktopProps) => {
    const {
        className,
        data,
    } = props;
    const { t } = useTranslation();
    const isSmallScreen = useMediaQuery({ maxWidth: 1100 });
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
            className={classNames(cls.ServiceDesktop, {}, [className])}
            padding={16}
            justify="between"
            gap={10}
        >
            <VStack
                gap={10}
                maxW
                maxH
            >
                <ImageDesktop
                    src={data.coverImg ? `${__API__}/static/images/${data.coverImg}` : coverImgReserve}
                    className={cls.img}
                />
                <Text
                    theme={TextTheme.DARK2}
                    size={isSmallScreen ? TextSize.BODY_S_DESKTOP : TextSize.BODY_DESKTOP}
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
                    size={TextSize.BODY_DESKTOP}
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
                            size={TextSize.BODY_MINI_DESKTOP}
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
                            <ButtonDesktop
                                theme={ButtonDesktopTheme.CLEAN}
                                className={amount > 1 ? cls.btnMinus : cls.btnMinusOpacity}
                                onClick={onRemoveClick}
                            >
                                -
                            </ButtonDesktop>
                            <Text
                                theme={TextTheme.DARK2}
                                size={TextSize.BODY_MINI_DESKTOP}
                                className={cls.textAdded}
                            >
                                {amount}
                            </Text>
                            <ButtonDesktop
                                theme={ButtonDesktopTheme.CLEAN}
                                className={cls.btnPlus}
                                onClick={onAddClick}
                            >
                                +
                            </ButtonDesktop>
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
