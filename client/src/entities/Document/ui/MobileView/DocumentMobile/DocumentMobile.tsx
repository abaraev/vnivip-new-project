import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { HStack, VStack } from 'shared/ui/Stack';
import { Icon, IconTheme } from 'shared/ui/Icon/Icon';
import documentIcon from 'shared/assets/icons/document-48-48-blue.svg';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import cls from './DocumentMobile.module.scss';
import { Document } from '../../../model/types/Document';

interface DocumentMobileProps {
    className?: string;
    data: Document;
}

export const DocumentMobile = memo((props: DocumentMobileProps) => {
    const {
        className,
        data,
    } = props;
    const nameSplit = data.name.split('.');
    const format = nameSplit.pop();
    const nameWithoutFormat = nameSplit;

    return (
        <a
            className={classNames(cls.DocumentMobile, {}, [className])}
            href={`${__API__}/static/documents/${data.staticFile}`}
            download={data.name}
            target="_blank"
            rel="noreferrer"
        >
            <VStack
                maxW
                maxH
                padding={8}
            >
                <HStack
                    maxW
                    justify="between"
                    align="center"
                >
                    <HStack
                        gap={8}
                        align="center"
                        className={cls.contentWrapper}
                    >
                        <Icon
                            theme={IconTheme.CLEAN}
                            Svg={documentIcon}
                        />
                        <HStack
                            className={cls.nameWrapper}
                        >
                            <Text
                                theme={TextTheme.DARK2}
                                size={TextSize.BODY_S_MOBILE}
                                className={cls.name}
                            >
                                {nameWithoutFormat}
                            </Text>
                            <Text
                                theme={TextTheme.DARK2}
                                size={TextSize.BODY_S_MOBILE}
                            >
                                {`.${format}`}
                            </Text>
                        </HStack>
                    </HStack>
                    <Text
                        theme={TextTheme.GREY3}
                        size={TextSize.BODY_S_MOBILE}
                        className={cls.size}
                    >
                        {`${(data.size / 1024 / 1024).toFixed(3)} MB`}
                    </Text>
                </HStack>
            </VStack>
        </a>
    );
});
