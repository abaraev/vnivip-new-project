import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { VStack } from 'shared/ui/Stack';
import { useTranslation } from 'react-i18next';
import { ImageMobile } from 'shared/ui/Image';
import defaultAvatar from 'shared/assets/images/avatar.png';
import { MemberTopMobile } from '../MemberTopMobile/MemberTopMobile';
import { MemberBottomMobile } from '../MemberBottomMobile/MemberBottomMobile';
import { Member } from '../../../../model/types/Member';
import cls from './MemberMobile.module.scss';

interface MemberMobileProps {
    className?: string;
    data: Member;
}

export const MemberMobile = memo((props: MemberMobileProps) => {
    const {
        className,
        data,
    } = props;
    const { t } = useTranslation();

    return (
        <VStack
            className={classNames(cls.MemberMobile, {}, [className])}
            maxW
            gap={10}
            align="center"
            padding={20}
        >
            <div
                className={cls.imageWrapper}
            >
                <ImageMobile
                    src={data.avatar
                        ? `${__API__}/static/images/${data.avatar}`
                        : defaultAvatar}
                    className={cls.image}
                    borderR={10}
                />
            </div>
            <VStack
                className={cls.infoWrapper}
                gap={30}
            >
                <MemberTopMobile data={data} />
                <MemberBottomMobile data={data} />
            </VStack>
        </VStack>
    );
});
