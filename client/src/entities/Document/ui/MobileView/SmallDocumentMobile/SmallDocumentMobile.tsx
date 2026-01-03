import { classNames } from 'shared/lib/classNames/classNames';
import React, { memo } from 'react';
import { Icon, IconTheme } from 'shared/ui/Icon/Icon';
import documentIcon from 'shared/assets/icons/document-64-64-blue.svg';
import { HStack } from 'shared/ui/Stack';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import close from 'shared/assets/icons/close-24-24-red.svg';
import cls from './SmallDocumentMobile.module.scss';
import { Document } from '../../../model/types/Document';

interface SmallDocumentMobileProps {
    className?: string;
    data: Document;
    onDelete?: (documentId: number) => void;
    withDeleting?: boolean;
}

export const SmallDocumentMobile = memo((props: SmallDocumentMobileProps) => {
    const {
        className,
        data,
        onDelete,
        withDeleting = true,
    } = props;

    const onDeleteHandler = () => {
        if (withDeleting) {
            onDelete?.(data.id);
        }
    };

    return (
        <HStack
            className={classNames(cls.SmallDocumentMobile, {}, [className])}
        >
            {withDeleting && (
                <Icon
                    theme={IconTheme.CLICKABLE_BG}
                    Svg={close}
                    className={cls.deleteBtn}
                    onClick={onDeleteHandler}
                />
            )}
            <a
                className={cls.content}
                href={`${__API__}/static/documents/${data.staticFile}`}
                download={data.name}
                target="_blank"
                rel="noreferrer"
            >
                <Icon
                    theme={IconTheme.CLEAN}
                    Svg={documentIcon}
                />
                <Text
                    theme={TextTheme.DARK2}
                    size={TextSize.BODY_S_MOBILE}
                    className={cls.name}
                >
                    {data.name}
                </Text>
            </a>
        </HStack>
    );
});
