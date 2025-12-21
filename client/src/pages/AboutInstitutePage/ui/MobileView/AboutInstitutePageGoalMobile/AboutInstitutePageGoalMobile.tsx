import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { HStack } from 'shared/ui/Stack';
import { useTranslation } from 'react-i18next';
import { Card, CardTheme } from 'shared/ui/Card/Card';
import { Icon, IconTheme } from 'shared/ui/Icon/Icon';
import goalIcon from 'shared/assets/icons/goal-72-72.svg';
import {
    Text, TextAlign, TextSize, TextTheme,
} from 'shared/ui/Text/Text';
import cls from './AboutInstitutePageGoalMobile.module.scss';

interface AboutInstitutePageGoalMobileProps {
    className?: string;
}

export const AboutInstitutePageGoalMobile = memo((props: AboutInstitutePageGoalMobileProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('aboutInstitutePage');

    return (
        <HStack
            className={classNames(cls.AboutInstitutePageGoalMobile, {}, [className])}
            maxW
            gap={10}
            align="center"
        >
            <Card
                theme={CardTheme.BLUE_LIGHT}
                padding={16}
                borderR={10}
            >
                <Text
                    theme={TextTheme.DARK2}
                    size={TextSize.BODY_MOBILE}
                    align={TextAlign.JUSTIFY}
                    className={cls.quoteText}
                >
                    {t('история цитата')}
                </Text>
            </Card>
            <Icon
                theme={IconTheme.CLEAN}
                Svg={goalIcon}
            />
        </HStack>
    );
});
