import { classNames } from 'shared/lib/classNames/classNames';
import {
    CSSProperties, FC, HTMLAttributes, memo,
} from 'react';
import { HStack, VStack } from 'shared/ui/Stack';
import { Icon, IconTheme } from 'shared/ui/Icon/Icon';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import linkIcon from 'shared/assets/icons/link-24-24-white.svg';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { ButtonDesktop, ButtonDesktopTheme } from 'shared/ui/Button/DesktopView/ButtonDesktop';
import { useTranslation } from 'react-i18next';
import { News } from '../../../model/types/News';
import cls from './AdminNewsDesktop.module.scss';

interface AdminNewsDesktopProps extends HTMLAttributes<HTMLDivElement>{
    className?: string;
    data: News;
}

export const AdminNewsDesktop: FC<AdminNewsDesktopProps> = memo((props) => {
    const {
        className,
        data,
    } = props;
    const { t } = useTranslation('admin');
    const navigate = useNavigate();

    const style: CSSProperties | undefined = data.coverImg
        ? {
            backgroundImage: `url(${__API__}/static/images/${data.coverImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }
        : undefined;

    return (
        <div
            className={classNames(cls.AdminNewsDesktop, {}, [className])}
        >
            <div
                className={cls.cover}
                style={style}
            />
            <VStack
                className={cls.content}
                maxW
                maxH
                paddingL={16}
                paddingR={16}
                paddingT={10}
                paddingB={16}
                justify="between"
            >
                <HStack
                    maxW
                    justify="between"
                    align="center"
                >
                    <Text
                        theme={TextTheme.WHITE}
                        size={TextSize.BODY_S_DESKTOP}
                    >
                        {new Date(Number(data?.timestamp) || data.createdAt).toLocaleDateString().replace(/\./g, '/')}
                    </Text>
                    <HStack
                        gap={20}
                        align="center"
                    >
                        {data.published
                            ? (
                                <Text
                                    theme={TextTheme.GREEN}
                                    size={TextSize.BODY_MINI_DESKTOP}
                                    className={cls.publishedText}
                                >
                                    {t('Опубликована')}
                                </Text>
                            )
                            : (
                                <Text
                                    theme={TextTheme.RED}
                                    size={TextSize.BODY_MINI_DESKTOP}
                                    className={cls.publishedText}
                                >
                                    {t('Не опубликована')}
                                </Text>
                            )}
                        <Icon
                            theme={IconTheme.CLEAN}
                            Svg={linkIcon}
                        />
                    </HStack>
                </HStack>
                <Text
                    theme={TextTheme.WHITE}
                    size={TextSize.BODY_MEDIUM_DESKTOP}
                    className={cls.title}
                >
                    {data.title}
                </Text>
                <HStack
                    maxW
                    justify="between"
                >
                    <ButtonDesktop
                        theme={ButtonDesktopTheme.PRIMARY}
                        onClick={() => navigate(`${RoutePath.news}/${data.id}`)}
                    >
                        {t('Просмотр')}
                    </ButtonDesktop>
                    <ButtonDesktop
                        theme={ButtonDesktopTheme.OUTLINE}
                        onClick={() => navigate(`${RoutePath.admin_news}/${data.id}`)}
                    >
                        {t('Редактировать')}
                    </ButtonDesktop>
                </HStack>
            </VStack>
        </div>
    );
});
