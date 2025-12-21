import { classNames } from 'shared/lib/classNames/classNames';
import {
    CSSProperties, FC, HTMLAttributes, memo,
} from 'react';
import { HStack, VStack } from 'shared/ui/Stack';
import { Icon, IconTheme } from 'shared/ui/Icon/Icon';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import linkIcon from 'shared/assets/icons/link-48-48-white.svg';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { News } from '../../../model/types/News';
import cls from './MainNewsDesktop.module.scss';

interface MainNewsDesktopProps extends HTMLAttributes<HTMLDivElement>{
    className?: string;
    data: News;
}

export const MainNewsDesktop: FC<MainNewsDesktopProps> = memo((props: MainNewsDesktopProps) => {
    const {
        className,
        data,
    } = props;
    const navigate = useNavigate();

    const style: CSSProperties = {
        backgroundImage: `url(${__API__}/static/images/${data.coverImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    return (
        <div
            className={classNames(cls.MainNewsDesktop, {}, [className])}
            role="link"
            onClick={() => navigate(`${RoutePath.news}/${data.id}`)}
        >
            <div
                className={cls.cover}
                style={style}
            />
            <VStack
                className={cls.content}
                maxW
                maxH
                paddingL={30}
                paddingR={30}
                paddingT={10}
                paddingB={30}
                justify="between"
            >
                <HStack
                    maxW
                    justify="between"
                    align="center"
                >
                    <Text
                        theme={TextTheme.WHITE}
                        size={TextSize.BODY_DESKTOP}
                    >
                        {new Date(Number(data?.timestamp) || data.createdAt).toLocaleDateString().replace(/\./g, '/')}
                    </Text>
                    <Icon
                        theme={IconTheme.CLEAN}
                        Svg={linkIcon}
                    />
                </HStack>
                <VStack
                    gap={20}
                    maxW
                >
                    <Text
                        theme={TextTheme.WHITE}
                        size={TextSize.H4_MEDIUM_DESKTOP}
                    >
                        {data.title}
                    </Text>
                    <Text
                        theme={TextTheme.WHITE}
                        size={TextSize.BODY_S_DESKTOP}
                        className={cls.description}
                    >
                        {data.description}
                    </Text>
                </VStack>
            </VStack>
        </div>
    );
});
