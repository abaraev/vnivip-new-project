import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { HStack, VStack } from 'shared/ui/Stack';
import { useTranslation } from 'react-i18next';
import { ImageDesktop } from 'shared/ui/Image';
import defaultAvatar from 'shared/assets/images/avatar.png';
import { useMediaQuery } from 'react-responsive';
import { MemberTopDesktop } from '../MemberTopDesktop/MemberTopDesktop';
import { MemberBottomDesktop } from '../MemberBottomDesktop/MemberBottomDesktop';
import { Member } from '../../../../model/types/Member';
import cls from './MemberDesktop.module.scss';

interface MemberDesktopProps {
    className?: string;
    data: Member;
}

export const MemberDesktop = memo((props: MemberDesktopProps) => {
    const {
        className,
        data,
    } = props;
    const { t } = useTranslation();
    const isSmallScreen = useMediaQuery({ maxWidth: 1300 });

    return (
        <HStack
            className={classNames(cls.MemberDesktop, {}, [className])}
            gap={isSmallScreen ? 10 : 20}
        >
            <div
                className={cls.imageWrapper}
            >
                <ImageDesktop
                    src={data.avatar
                        ? `${__API__}/static/images/${data.avatar}`
                        : defaultAvatar}
                    className={cls.image}
                    borderR={10}
                />
            </div>
            <VStack
                maxH
                className={cls.infoWrapper}
                justify="between"
                paddingT={40}
                paddingB={10}
                paddingR={10}
            >
                <MemberTopDesktop data={data} />
                <MemberBottomDesktop data={data} />
            </VStack>
        </HStack>
    );
});
