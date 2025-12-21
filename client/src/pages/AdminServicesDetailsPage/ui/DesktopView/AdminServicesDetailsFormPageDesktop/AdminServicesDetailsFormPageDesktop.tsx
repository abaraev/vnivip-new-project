import { classNames } from 'shared/lib/classNames/classNames';
import { CSSProperties, memo, useCallback } from 'react';
import { HStack, VStack } from 'shared/ui/Stack';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Icon, IconTheme } from 'shared/ui/Icon/Icon';
import close2 from 'shared/assets/icons/close-24-24-red.svg';
import { FileInput } from 'shared/ui/FileInput/FileInput';
import { Input } from 'shared/ui/Input/Input';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { useDebounce } from 'shared/lib/hooks/useDebounce/useDebounce';
import { fetchChangeCover } from '../../../model/services/fetchChangeCover';
import { fetchDeleteCover } from '../../../model/services/fetchDeleteCover';
import { fetchChangeName } from '../../../model/services/fetchChangeName';
import {
    AdminServicesDetailsPageActions,
} from '../../../model/slices/AdminServicesDetailsPageSlice';
import { fetchChangePrice } from '../../../model/services/fetchChangePrice';
import {
    getAdminServicesDetailsPageCoverImg,
    getAdminServicesDetailsPageName,
    getAdminServicesDetailsPagePrice,
    getAdminServicesDetailsPageService,
} from '../../../model/selectors/getAdminServicesDetailsPage';
import cls from './AdminServicesDetailsFormPageDesktop.module.scss';

interface AdminServicesDetailsFormPageDesktopProps {
    className?: string;
}

export const AdminServicesDetailsFormPageDesktop = memo((props: AdminServicesDetailsFormPageDesktopProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('admin');
    const dispatch = useAppDispatch();
    const service = useSelector(getAdminServicesDetailsPageService);
    const name = useSelector(getAdminServicesDetailsPageName);
    const price = useSelector(getAdminServicesDetailsPagePrice);
    const coverImg = useSelector(getAdminServicesDetailsPageCoverImg);

    const fetchChangeNameFunc = useCallback((name: string) => {
        dispatch(fetchChangeName({ name }));
    }, [dispatch]);

    const debouncedFetchChangeName = useDebounce(fetchChangeNameFunc, 300);

    const onChangeName = useCallback((value: string) => {
        if (value.length < 128) {
            dispatch(AdminServicesDetailsPageActions.setName(value));
            debouncedFetchChangeName(value);
        }
    }, [debouncedFetchChangeName, dispatch]);

    const fetchChangePriceFunc = useCallback((price: string) => {
        dispatch(fetchChangePrice({ price }));
    }, [dispatch]);

    const debouncedFetchChangePrice = useDebounce(fetchChangePriceFunc, 300);

    const onChangePrice = useCallback((value: string) => {
        const isValidValue = /^(\d+(\.\d{0,2})?)?$/.test(value);
        if (value.length < 12 && isValidValue) {
            dispatch(AdminServicesDetailsPageActions.setPrice(value));
            if (!value.endsWith('.')) {
                debouncedFetchChangePrice(value || '0');
            }
        }
    }, [debouncedFetchChangePrice, dispatch]);

    const onDeleteCover = useCallback(() => {
        dispatch(fetchDeleteCover());
    }, [dispatch]);

    const onChangeCover = useCallback((file: File) => {
        dispatch(fetchChangeCover({ file }));
    }, [dispatch]);

    const style: CSSProperties | undefined = coverImg
        ? {
            backgroundImage: `url(${__API__}/static/images/${coverImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }
        : undefined;

    return (
        <VStack
            className={classNames(cls.AdminServicesDetailsFormPageDesktop, {}, [className])}
            maxW
            gap={50}
        >
            <HStack
                maxW
                justify="center"
            >
                <div
                    className={cls.cover}
                    style={style}
                >
                    {coverImg && (
                        <Icon
                            theme={IconTheme.CLICKABLE_BG}
                            Svg={close2}
                            className={cls.deleteCoverBtn}
                            onClick={onDeleteCover}
                        />
                    )}
                    <FileInput
                        accept=".jpg, .jpeg, .png"
                        className={cls.coverInput}
                        onChange={onChangeCover}
                    >
                        {t('Изменить изображение')}
                    </FileInput>
                </div>
            </HStack>
            <HStack
                maxW
                align="center"
                gap={20}
            >
                <Text
                    theme={TextTheme.DARK2}
                    size={TextSize.BODY_L_DESKTOP}
                >
                    {`${t('Название услуги')}:`}
                </Text>
                <Input
                    value={name}
                    className={cls.input}
                    onChange={onChangeName}
                />
            </HStack>
            <HStack
                maxW
                align="center"
                gap={20}
            >
                <Text
                    theme={TextTheme.DARK2}
                    size={TextSize.BODY_L_DESKTOP}
                >
                    {`${t('Цена')}:`}
                </Text>
                <Input
                    value={price}
                    className={cls.input}
                    onChange={onChangePrice}
                />
            </HStack>
        </VStack>
    );
});
