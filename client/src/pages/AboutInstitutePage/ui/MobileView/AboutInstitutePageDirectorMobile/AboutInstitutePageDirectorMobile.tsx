import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { HStack, VStack } from 'shared/ui/Stack';
import { useTranslation } from 'react-i18next';
import {
    Text, TextAlign, TextSize, TextTheme,
} from 'shared/ui/Text/Text';
import { ImageDesktop } from 'shared/ui/Image';
import directorImage from 'shared/assets/images/director1.jpg';
import cls from './AboutInstitutePageDirectorMobile.module.scss';

interface AboutInstitutePageDirectorMobileProps {
    className?: string;
}

export const AboutInstitutePageDirectorMobile = memo((props: AboutInstitutePageDirectorMobileProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('aboutInstitutePage');

    return (
        <HStack
            maxW
            className={classNames(cls.AboutInstitutePageDirectorMobile, {}, [className])}
            gap={10}
        >
            <VStack
                gap={20}
            >
                <Text
                    theme={TextTheme.BLUE}
                    size={TextSize.BODY_S_MEDIUM_MOBILE}
                    align={TextAlign.RIGHT}
                >
                    {t('Наука во благо птицеводства, для здоровья всей страны')}
                </Text>
                <Text
                    theme={TextTheme.DARK2}
                    size={TextSize.BODY_LIGHT_ITALIC_MOBILE}
                    align={TextAlign.LEFT}
                >
                    {t('Наши исследования – залог здорового и продуктивного будущего отечественного птицеводства')}
                </Text>
            </VStack>
            <VStack
                gap={10}
            >
                <ImageDesktop
                    src={directorImage}
                    className={cls.directorImage}
                    borderR={10}
                />
                <VStack
                    gap={8}
                    align="end"
                    maxW
                >
                    <Text
                        theme={TextTheme.DARK2}
                        size={TextSize.BODY_S_MOBILE}
                        align={TextAlign.RIGHT}
                    >
                        {t('Директор ВНИВИП')}
                    </Text>
                    <Text
                        theme={TextTheme.GREY}
                        size={TextSize.BODY_S_MOBILE}
                        align={TextAlign.RIGHT}
                    >
                        {t('Веретенников Владислав Валерьевич')}
                    </Text>
                </VStack>
            </VStack>
        </HStack>
    );
});
