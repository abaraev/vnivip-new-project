import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { HStack, VStack } from 'shared/ui/Stack';
import { ImageDesktop } from 'shared/ui/Image';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import coverImgReserve from 'shared/assets/images/img.jpg';
import { Service } from '../../../model/types/Service';
import cls from './AdminServiceDesktop.module.scss';

interface AdminServiceDesktopProps {
    className?: string;
    data: Service;
}

export const AdminServiceDesktop = memo((props: AdminServiceDesktopProps) => {
    const {
        className,
        data,
    } = props;
    const { t } = useTranslation();

    return (
        <VStack
            className={classNames(cls.AdminServiceDesktop, {}, [className])}
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
                    size={TextSize.BODY_DESKTOP}
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
                <Text
                    theme={TextTheme.BLUE2}
                    size={TextSize.BODY_L_DESKTOP}
                >
                    {`${data.amount}шт`}
                </Text>
            </HStack>
        </VStack>
    );
});
