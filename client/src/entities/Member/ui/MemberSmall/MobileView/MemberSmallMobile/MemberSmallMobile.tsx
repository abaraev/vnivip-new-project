import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Member } from 'entities/Member';
import { VStack } from 'shared/ui/Stack';
import {
    MemberSmallTopMobile,
} from '../MemberSmallTopMobile/MemberSmallTopMobile';
import { MemberSmallBottomMobile } from '../MemberSmallBottomMobile/MemberSmallBottomMobile';
import cls from './MemberSmallMobile.module.scss';

interface MemberSmallMobileProps {
    className?: string;
    data: Member;
}

export const MemberSmallMobile = memo((props: MemberSmallMobileProps) => {
    const {
        className,
        data,
    } = props;

    return (
        <VStack
            className={classNames(cls.MemberSmallMobile, {}, [className])}
            justify="between"
            gap={10}
            padding={10}
        >
            <MemberSmallTopMobile data={data} />
            <MemberSmallBottomMobile data={data} />
        </VStack>
    );
});
