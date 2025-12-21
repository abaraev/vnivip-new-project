import { classNames } from 'shared/lib/classNames/classNames';
import React, { memo } from 'react';
import { HStack, VStack } from 'shared/ui/Stack';
import { Icon, IconTheme } from 'shared/ui/Icon/Icon';
import documentIcon from 'shared/assets/icons/document-64-64-blue.svg';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import close from 'shared/assets/icons/close-32-32-red.svg';
import cls from './AdminDocumentDesktop.module.scss';
import { Document } from '../../../model/types/Document';

interface AdminDocumentDesktopProps {
    className?: string;
    data: Document;
    onDelete?: (documentId: number) => void;
}

export const AdminDocumentDesktop = memo((props: AdminDocumentDesktopProps) => {
    const {
        className,
        data,
        onDelete,
    } = props;
    const nameSplit = data.name.split('.');
    const format = nameSplit.pop();
    const nameWithoutFormat = nameSplit;

    const onDeleteHandler = () => {
        onDelete?.(data.id);
    };

    return (
        <div
            className={classNames(cls.AdminDocumentDesktop, {}, [className])}
        >
            <a
                className={cls.anchor}
                href={`${__API__}/static/documents/${data.staticFile}`}
                download={data.name}
                target="_blank"
                rel="noreferrer"
            >
                <VStack
                    maxW
                    maxH
                    padding={16}
                >
                    <HStack
                        maxW
                        justify="between"
                        align="center"
                    >
                        <HStack
                            gap={16}
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
                                    size={TextSize.BODY_L_DESKTOP}
                                    className={cls.name}
                                >
                                    {nameWithoutFormat}
                                </Text>
                                <Text
                                    theme={TextTheme.DARK2}
                                    size={TextSize.BODY_L_DESKTOP}
                                >
                                    {`.${format}`}
                                </Text>
                            </HStack>
                        </HStack>
                        <Text
                            theme={TextTheme.GREY3}
                            size={TextSize.BODY_S_DESKTOP}
                            className={cls.size}
                        >
                            {`${(data.size / 1024 / 1024).toFixed(3)} MB`}
                        </Text>
                    </HStack>
                </VStack>
            </a>
            <Icon
                theme={IconTheme.CLICKABLE_BG}
                Svg={close}
                className={cls.deleteBtn}
                onClick={onDeleteHandler}
            />
        </div>
    );
});
