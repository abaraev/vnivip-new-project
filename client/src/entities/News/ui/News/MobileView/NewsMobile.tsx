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
import { News } from '../../../model/types/News';
import cls from './NewsMobile.module.scss';

interface NewsMobileProps extends HTMLAttributes<HTMLDivElement>{
    className?: string;
    data: News;
}

export const NewsMobile: FC<NewsMobileProps> = memo((props) => {
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
            className={classNames(cls.NewsMobile, {}, [className])}
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
                paddingL={10}
                paddingR={10}
                paddingT={8}
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
                        size={TextSize.BODY_S_MOBILE}
                    >
                        {new Date(Number(data?.timestamp) || data.createdAt).toLocaleDateString().replace(/\./g, '/')}
                    </Text>
                    <Icon
                        theme={IconTheme.CLEAN}
                        Svg={linkIcon}
                    />
                </HStack>
                <Text
                    theme={TextTheme.WHITE}
                    size={TextSize.BODY_MEDIUM_MOBILE}
                    className={cls.title}
                >
                    {data.title}
                </Text>
            </VStack>
        </div>
    );
});
