import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Card, CardTheme } from 'shared/ui/Card/Card';
import { HStack } from 'shared/ui/Stack';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { Icon, IconTheme } from 'shared/ui/Icon/Icon';
import linkIcon from 'shared/assets/icons/link-24-24-black.svg';
import { News } from 'entities/News';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { useNavigate } from 'react-router-dom';
import cls from './SmallNewsMobile.module.scss';

interface SmallNewsMobileProps {
    className?: string;
    data: News;
}

export const SmallNewsMobile = memo((props: SmallNewsMobileProps) => {
    const {
        className,
        data,
    } = props;
    const navigate = useNavigate();

    return (
        <Card
            className={classNames(cls.SmallNewsMobile, {}, [className])}
            role="link"
            paddingL={10}
            paddingR={10}
            paddingT={8}
            paddingB={20}
            borderR={10}
            onClick={() => navigate(`${RoutePath.news}/${data.id}`)}
            theme={CardTheme.BLUE_LIGHT}
        >
            <HStack
                maxW
                justify="between"
                align="center"
            >
                <Text
                    theme={TextTheme.GREY3}
                    size={TextSize.BODY_MOBILE}
                >
                    {new Date(Number(data?.timestamp) || data.createdAt).toLocaleDateString().replace(/\./g, '/')}
                </Text>
                <Icon
                    theme={IconTheme.CLEAN}
                    Svg={linkIcon}
                />
            </HStack>
            <Text
                theme={TextTheme.DARK}
                size={TextSize.BODY_L_MEDIUM_MOBILE}
                className={cls.title}
            >
                {data.title}
            </Text>
        </Card>
    );
});
