import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useMemo } from 'react';
import { HStack, VStack } from 'shared/ui/Stack';
import { Input } from 'shared/ui/Input/Input';
import { useTranslation } from 'react-i18next';
import {
    Text, TextAlign, TextSize, TextTheme,
} from 'shared/ui/Text/Text';
import { useSelector } from 'react-redux';
import { ButtonDesktop, ButtonDesktopTheme } from 'shared/ui/Button/DesktopView/ButtonDesktop';
import { CartSliceActions, getCart } from 'entities/Cart';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { TextArea, TextAreaSize, TextAreaTheme } from 'shared/ui/TextArea/TextArea';
import { FileInput } from 'shared/ui/FileInput/FileInput';
import { SmallDocumentDesktop } from 'entities/Document';
import { fetchDeleteDocument } from '../../../model/services/fetctDeleteDocument';
import { fetchAddDocument } from '../../../model/services/fetchAddDocument';
import { CartPageValidateErrorTypes } from '../../../model/types/CartPageValidateErrorTypes';
import { sendOrder } from '../../../model/services/sendOrder';
import { getTotalPrice } from '../../../helpers/getTotalPrice';
import {
    getCartPageComment,
    getCartPageDocuments,
    getCartPageEmail,
    getCartPageName,
    getCartPageOrderNumber,
    getCartPageOrderSent,
    getCartPagePhone,
    getCartPageSecondName,
    getCartPageServices,
    getCartPageValidationErrors,
} from '../../../model/selectors/getCartPage';
import { CartPageActions } from '../../../model/slices/CartPageSlice';
import cls from './CartPageFormDesktop.module.scss';

interface CartPageFormDesktopProps {
    className?: string;
}

export const CartPageFormDesktop = memo((props: CartPageFormDesktopProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('cartPage');
    const dispatch = useAppDispatch();
    const cart = useSelector(getCart);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const services = useSelector(getCartPageServices) || [];
    const totalPrice = useMemo(() => getTotalPrice(cart, services), [cart, services]);
    const name = useSelector(getCartPageName);
    const comment = useSelector(getCartPageComment);
    const secondName = useSelector(getCartPageSecondName);
    const phone = useSelector(getCartPagePhone);
    const email = useSelector(getCartPageEmail);
    const validationErrors = useSelector(getCartPageValidationErrors);
    const orderSent = useSelector(getCartPageOrderSent);
    const orderNumber = useSelector(getCartPageOrderNumber);
    const documents = useSelector(getCartPageDocuments);

    const validateErrorTranslates: Partial<Record<CartPageValidateErrorTypes, string>> = {
        [CartPageValidateErrorTypes.FORMAT_NAME_ERROR]: t('Недопустимое имя'),
        [CartPageValidateErrorTypes.FORMAT_SECOND_NAME_ERROR]: t('Недопустимая фамилия'),
        [CartPageValidateErrorTypes.FORMAT_PHONE_ERROR]: t('Недопустимый номер телефона'),
        [CartPageValidateErrorTypes.FORMAT_EMAIL_ERROR]: t('Недопустимый электронный адрес почты'),
        [CartPageValidateErrorTypes.EMPTY_CART_ERROR]: t('Корзина пуста'),
    };

    const onChangeName = useCallback((value: string) => {
        if (!value.startsWith(' ') && !value.endsWith('  ')) {
            const newName = value.replace(/\d/g, '');
            if (newName.length <= 128) {
                dispatch(CartPageActions.setName(newName));
            }
        }
    }, [dispatch]);

    const onChangeComment = useCallback((value: string) => {
        if (!value.startsWith(' ') && !value.endsWith('  ')) {
            if (value.length <= 250) {
                dispatch(CartPageActions.setComment(value));
            }
        }
    }, [dispatch]);

    const onChangeSecondName = useCallback((value: string) => {
        if (!value.startsWith(' ') && !value.endsWith('  ')) {
            const newSecondName = value.replace(/\d/g, '');
            if (newSecondName.length <= 128) {
                dispatch(CartPageActions.setSecondName(newSecondName));
            }
        }
    }, [dispatch]);

    const onChangePhone = useCallback((value: string) => {
        const newPhone = value.replace(/[^\d]/g, '').trim();
        if (newPhone.length <= 15) {
            dispatch(CartPageActions.setPhone(newPhone));
        }
    }, [dispatch]);

    const onChangeEmail = useCallback((value: string) => {
        const newEmail = value.replace(/[а-яА-ЯёЁ]/, '').trim();
        if (newEmail.length <= 128) {
            dispatch(CartPageActions.setEmail(newEmail));
        }
    }, [dispatch]);

    const onClickSendOrder = useCallback(async () => {
        const result = await dispatch(sendOrder());
        if (result.meta.requestStatus === 'fulfilled') {
            CartPageActions.orderSent();
            dispatch(CartPageActions.setName(''));
            dispatch(CartPageActions.setSecondName(''));
            dispatch(CartPageActions.setEmail(''));
            dispatch(CartPageActions.setPhone(''));
            dispatch(CartPageActions.setComment(''));
            dispatch(CartPageActions.clearDocuments());
            dispatch(CartSliceActions.clearCart());
        }
    }, [dispatch]);

    const onAddDocument = useCallback((file: File) => {
        if (file.type.includes('document') || file.type.includes('pdf') || file.type.includes('text')) {
            if (file.size < 50 * 1024 * 1024) {
                dispatch(fetchAddDocument({ file }));
            } else {
                alert('Максимальный размер документа 50 МБ.');
            }
        }
    }, [dispatch]);

    const onDeleteAct = useCallback((documentId: number) => {
        dispatch(fetchDeleteDocument({ documentId }));
    }, [dispatch]);

    return (
        <VStack
            className={classNames(cls.CartPageFormDesktop, {}, [className])}
            justify="between"
            maxH
            gap={20}
        >
            <VStack
                maxW
                gap={40}
            >
                <Text
                    theme={TextTheme.BLUE2}
                    size={TextSize.H4_DESKTOP}
                >
                    {t('Контактная информация')}
                </Text>
                <HStack
                    maxW
                    gap={20}
                    wrap="wrap"
                >
                    <Input
                        className={cls.input}
                        isRequired
                        placeholder={t('Имя')}
                        onChange={onChangeName}
                        value={name}
                        isEmptyError={validationErrors.includes(CartPageValidateErrorTypes.EMPTY_NAME_ERROR)}
                    />
                    <Input
                        className={cls.input}
                        placeholder={t('Фамилия')}
                        onChange={onChangeSecondName}
                        value={secondName}
                    />
                    <Input
                        className={cls.input}
                        isRequired
                        isNumber
                        placeholder={t('Номер телефона')}
                        onChange={onChangePhone}
                        value={phone}
                        isEmptyError={validationErrors.includes(CartPageValidateErrorTypes.EMPTY_PHONE_ERROR)}
                    />
                    <Input
                        className={cls.input}
                        isRequired
                        placeholder={t('Электронная почта')}
                        onChange={onChangeEmail}
                        value={email}
                        isEmptyError={validationErrors.includes(CartPageValidateErrorTypes.EMPTY_EMAIL_ERROR)}
                    />
                </HStack>
            </VStack>
            <TextArea
                className={cls.textArea}
                onChange={onChangeComment}
                value={comment}
                theme={TextAreaTheme.DARK2}
                size={TextAreaSize.BODY_DESKTOP}
                placeholder={`${t('Комментарий')}...`}
            />
            <VStack
                maxW
                gap={40}
            >
                <HStack
                    maxW
                    justify="center"
                >
                    <FileInput
                        accept=".xlsx, .xls, .doc, .docx, .txt, .pdf"
                        onChange={onAddDocument}
                        disabled={documents.length > 6}
                    >
                        {t('Прикрепить файл')}
                    </FileInput>
                </HStack>
                <HStack
                    maxW
                    wrap="wrap"
                    gap={20}
                >
                    {documents.map((item) => (
                        <SmallDocumentDesktop
                            data={item}
                            key={item.id}
                            className={cls.document}
                            onDelete={onDeleteAct}
                        />
                    ))}
                </HStack>
            </VStack>
            <VStack
                maxW
                gap={4}
            >
                {!!validationErrors.length && Object.entries(validateErrorTranslates)
                    .filter(([err, text]) => validationErrors.includes(err as CartPageValidateErrorTypes))
                    .map(([err, text]) => (
                        <Text
                            key={err}
                            theme={TextTheme.RED}
                            size={TextSize.BODY_S_DESKTOP}
                        >
                            {text}
                        </Text>
                    ))}
            </VStack>
            <VStack
                className={cls.totalCard}
                maxW
                justify="center"
                align="center"
                gap={20}
            >
                <VStack
                    className={cls.totalPriceWrapper}
                    padding={20}
                    justify="between"
                >
                    <HStack
                        maxW
                        justify="between"
                    >
                        <Text
                            theme={TextTheme.DARK}
                            size={TextSize.BODY_S_DESKTOP}
                        >
                            {`${t('Общая сумма')}:`}
                        </Text>
                        <Text
                            theme={TextTheme.DARK}
                            size={TextSize.BODY_S_DESKTOP}
                            className={cls.totalPrice}
                        >
                            {totalPrice}
                        </Text>
                    </HStack>
                    <HStack
                        maxW
                        justify="between"
                    >
                        <Text
                            theme={TextTheme.DARK2}
                            size={TextSize.BODY_DESKTOP}
                        >
                            {`${t('Итого к оплате')}:`}
                        </Text>
                        <Text
                            theme={TextTheme.DARK2}
                            size={TextSize.BODY_DESKTOP}
                            className={cls.totalPrice}
                        >
                            {totalPrice}
                        </Text>
                    </HStack>
                </VStack>
                {orderSent
                    ? (
                        <Text
                            theme={TextTheme.WHITE}
                            size={TextSize.BODY_S_DESKTOP}
                            align={TextAlign.CENTER}
                        >
                            {t('заказ принят', { orderNumber: orderNumber?.toString() })}
                        </Text>
                    )
                    : (
                        <ButtonDesktop
                            theme={ButtonDesktopTheme.OUTLINE}
                            onClick={onClickSendOrder}
                        >
                            {t('Отправить заказ')}
                        </ButtonDesktop>
                    )}
            </VStack>
        </VStack>
    );
});
