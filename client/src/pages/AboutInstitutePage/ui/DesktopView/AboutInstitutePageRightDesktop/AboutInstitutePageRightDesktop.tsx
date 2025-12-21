import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { HStack, VStack } from 'shared/ui/Stack';
import {
    Text, TextAlign, TextSize, TextTheme,
} from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import { ImageDesktop } from 'shared/ui/Image';
import directorImage from 'shared/assets/images/director1.jpg';
import buildImage from 'shared/assets/images/build1.jpg';
import scientistImage from 'shared/assets/images/scientist1.jpg';
import meetingImage from 'shared/assets/images/meeting1.jpg';
import scienceImage from 'shared/assets/images/science1.jpg';
import { useMediaQuery } from 'react-responsive';
import cls from './AboutInstitutePageRightDesktop.module.scss';

interface AboutInstitutePageRightDesktopProps {
    className?: string;
}

export const AboutInstitutePageRightDesktop = memo((props: AboutInstitutePageRightDesktopProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('aboutInstitutePage');
    const isSmallScreen = useMediaQuery({ maxWidth: 1000 });

    return (
        <VStack
            className={classNames(cls.AboutInstitutePageRightDesktop, {}, [className])}
            padding={20}
            paddingB={120}
            justify="between"
        >
            <VStack
                maxW
                justify="between"
                className={cls.topImages}
                gap={10}
            >
                <HStack
                    maxW
                    gap={10}
                    justify="between"
                >
                    <VStack
                        gap={30}
                    >
                        <Text
                            theme={TextTheme.BLUE}
                            size={isSmallScreen ? TextSize.BODY_MINI_MEDIUM_DESKTOP : TextSize.BODY_S_MEDIUM_DESKTOP}
                            align={TextAlign.RIGHT}
                        >
                            {t('Наука во благо птицеводства, для здоровья всей страны')}
                        </Text>
                        <Text
                            theme={TextTheme.DARK2}
                            size={isSmallScreen ? TextSize.BODY_S_LIGHT_ITALIC_DESKTOP : TextSize.BODY_LIGHT_ITALIC_DESKTOP}
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
                                size={isSmallScreen ? TextSize.BODY_MINI_DESKTOP : TextSize.BODY_S_DESKTOP}
                                align={TextAlign.RIGHT}
                            >
                                {t('Директор ВНИВИП')}
                            </Text>
                            <Text
                                theme={TextTheme.GREY}
                                size={isSmallScreen ? TextSize.BODY_MINI_DESKTOP : TextSize.BODY_S_DESKTOP}
                                align={TextAlign.RIGHT}
                            >
                                {t('Веретенников Владислав Валерьевич')}
                            </Text>
                        </VStack>
                    </VStack>
                </HStack>
                <VStack
                    maxW
                    align="center"
                >
                    <VStack
                        gap={8}
                        align="end"
                    >
                        <ImageDesktop
                            src={buildImage}
                            borderR={10}
                            className={cls.img}
                        />
                        <Text
                            theme={TextTheme.GREY}
                            size={isSmallScreen ? TextSize.BODY_MINI_DESKTOP : TextSize.BODY_S_DESKTOP}
                            align={TextAlign.RIGHT}
                        >
                            {t('Здание ВНИВИП')}
                        </Text>
                    </VStack>
                </VStack>
                <VStack
                    maxW
                    align="center"
                >
                    <VStack
                        gap={8}
                        align="end"
                    >
                        <ImageDesktop
                            src={scientistImage}
                            borderR={10}
                            className={cls.img}
                        />
                        <Text
                            theme={TextTheme.GREY}
                            size={isSmallScreen ? TextSize.BODY_MINI_DESKTOP : TextSize.BODY_S_DESKTOP}
                            align={TextAlign.RIGHT}
                        >
                            {t('Научный процесс')}
                        </Text>
                    </VStack>
                </VStack>
            </VStack>
            <VStack
                maxW
                gap={250}
            >
                <VStack
                    maxW
                    align="center"
                >
                    <VStack
                        gap={8}
                        align="end"
                    >
                        <ImageDesktop
                            src={meetingImage}
                            borderR={10}
                            className={cls.img}
                        />
                        <Text
                            theme={TextTheme.GREY}
                            size={isSmallScreen ? TextSize.BODY_MINI_DESKTOP : TextSize.BODY_S_DESKTOP}
                            align={TextAlign.RIGHT}
                        >
                            {t('Сотрудничество')}
                        </Text>
                    </VStack>
                </VStack>
                <VStack
                    maxW
                    align="center"
                >
                    <VStack
                        gap={8}
                        align="end"
                    >
                        <ImageDesktop
                            src={scienceImage}
                            borderR={10}
                            className={cls.img}
                        />
                        <Text
                            theme={TextTheme.GREY}
                            size={isSmallScreen ? TextSize.BODY_MINI_DESKTOP : TextSize.BODY_S_DESKTOP}
                            align={TextAlign.RIGHT}
                        >
                            {t('Исследования')}
                        </Text>
                    </VStack>
                </VStack>
            </VStack>
        </VStack>
    );
});
