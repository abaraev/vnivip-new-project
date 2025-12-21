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
import cls from './MainNewsMobile.module.scss';

interface MainNewsMobileProps extends HTMLAttributes<HTMLDivElement>{
    className?: string;
    data: News;
}

export const MainNewsMobile: FC<MainNewsMobileProps> = memo((props: MainNewsMobileProps) => {
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
            className={classNames(cls.MainNewsMobile, {}, [className])}
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
                paddingL={20}
                paddingR={20}
                paddingT={10}
                paddingB={20}
                justify="between"
            >
                <HStack
                    maxW
                    justify="between"
                    align="center"
                >
                    <Text
                        theme={TextTheme.WHITE}
                        size={TextSize.BODY_MOBILE}
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
                        size={TextSize.H3_MEDIUM_MOBILE}
                    >
                        {data.title}
                    </Text>
                    <Text
                        theme={TextTheme.WHITE}
                        size={TextSize.BODY_MOBILE}
                        className={cls.description}
                    >
                        {data.description}
                    </Text>
                </VStack>
            </VStack>
        </div>
    );
});
