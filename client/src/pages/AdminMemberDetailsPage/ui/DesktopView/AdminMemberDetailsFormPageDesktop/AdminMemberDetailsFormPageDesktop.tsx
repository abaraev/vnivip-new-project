import { classNames } from 'shared/lib/classNames/classNames';
import { CSSProperties, memo, useCallback } from 'react';
import { HStack, VStack } from 'shared/ui/Stack';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Icon, IconTheme } from 'shared/ui/Icon/Icon';
import close2 from 'shared/assets/icons/close-24-24-red.svg';
import { FileInput } from 'shared/ui/FileInput/FileInput';
import { Input } from 'shared/ui/Input/Input';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { useDebounce } from 'shared/lib/hooks/useDebounce/useDebounce';
import { MemberSections } from 'entities/Member';
import { TextArea, TextAreaSize, TextAreaTheme } from 'shared/ui/TextArea/TextArea';
import { fetchChangeEmail } from '../../../model/services/fetchChangeEmail';
import { fetchChangePhone } from '../../../model/services/fetchChangePhone';
import { fetchChangeStatus } from '../../../model/services/fetchChangeStatus';
import { fetchChangeAvatar } from '../../../model/services/fetchChangeAvatar';
import { fetchDeleteAvatar } from '../../../model/services/fetchDeleteAvatar';
import { fetchChangeFullName } from '../../../model/services/fetchChangeFullName';
import { fetchChangeJobName } from '../../../model/services/fetchChangeJobName';
import { AdminMemberDetailsPageActions } from '../../../model/slices/AdminMemberDetailsPageSlice';
import { getAdminMemberDetailsPageMember } from '../../../model/selectors/getAdminMemberDetailsPage';
import cls from './AdminMemberDetailsFormPageDesktop.module.scss';
import { fetchChangeBio } from '../../../model/services/fetchChangeBio';

interface AdminMemberDetailsFormPageDesktopProps {
    className?: string;
}

export const AdminMemberDetailsFormPageDesktop = memo((props: AdminMemberDetailsFormPageDesktopProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('admin');
    const dispatch = useAppDispatch();
    const member = useSelector(getAdminMemberDetailsPageMember);

    //---------------------------------
    const fetchChangeFullNameFunc = useCallback((fullName: string) => {
        dispatch(fetchChangeFullName({ fullName }));
    }, [dispatch]);

    const fetchChangeBioFunc = useCallback((bio: string) => {
        dispatch(fetchChangeBio({ bio }));
    }, [dispatch]);

    const fetchChangeJobNameFunc = useCallback((jobName: string) => {
        dispatch(fetchChangeJobName({ jobName }));
    }, [dispatch]);

    const fetchChangeStatusFunc = useCallback((status: string) => {
        dispatch(fetchChangeStatus({ status }));
    }, [dispatch]);

    const fetchChangeEmailFunc = useCallback((email: string) => {
        dispatch(fetchChangeEmail({ email }));
    }, [dispatch]);

    const fetchChangePhoneFunc = useCallback((phone: string) => {
        dispatch(fetchChangePhone({ phone }));
    }, [dispatch]);

    //---------------------------------
    const debouncedFetchChangeFullName = useDebounce(fetchChangeFullNameFunc, 300);
    const debouncedFetchChangeBio = useDebounce(fetchChangeBioFunc, 300);
    const debouncedFetchChangeJobName = useDebounce(fetchChangeJobNameFunc, 300);
    const debouncedFetchChangeStatus = useDebounce(fetchChangeStatusFunc, 300);
    const debouncedFetchChangeEmail = useDebounce(fetchChangeEmailFunc, 300);
    const debouncedFetchChangePhone = useDebounce(fetchChangePhoneFunc, 300);

    //---------------------------------
    const onChangeFullName = useCallback((value: string) => {
        if (value.length < 128) {
            dispatch(AdminMemberDetailsPageActions.setFullName(value));
            debouncedFetchChangeFullName(value);
        }
    }, [debouncedFetchChangeFullName, dispatch]);

    const onChangeBio = useCallback((value: string) => {
        if (value.length < 1024) {
            dispatch(AdminMemberDetailsPageActions.setBio(value));
            debouncedFetchChangeBio(value);
        }
    }, [debouncedFetchChangeBio, dispatch]);

    const onChangeJobName = useCallback((value: string) => {
        if (value.length < 128) {
            dispatch(AdminMemberDetailsPageActions.setJobName(value));
            debouncedFetchChangeJobName(value);
        }
    }, [debouncedFetchChangeJobName, dispatch]);

    const onChangeStatus = useCallback((value: string) => {
        if (value.length < 128) {
            dispatch(AdminMemberDetailsPageActions.setStatus(value));
            debouncedFetchChangeStatus(value);
        }
    }, [debouncedFetchChangeStatus, dispatch]);

    const onChangeEmail = useCallback((value: string) => {
        if (value.length < 64) {
            dispatch(AdminMemberDetailsPageActions.setEmail(value));
            debouncedFetchChangeEmail(value);
        }
    }, [debouncedFetchChangeEmail, dispatch]);

    const onChangePhone = useCallback((value: string) => {
        if (value.length < 32) {
            dispatch(AdminMemberDetailsPageActions.setPhone(value));
            debouncedFetchChangePhone(value);
        }
    }, [debouncedFetchChangePhone, dispatch]);

    const onDeleteAvatar = useCallback(() => {
        dispatch(fetchDeleteAvatar());
    }, [dispatch]);

    const onChangeAvatar = useCallback((file: File) => {
        dispatch(fetchChangeAvatar({ file }));
    }, [dispatch]);

    if (!member) {
        return null;
    }

    const style: CSSProperties | undefined = member.avatar
        ? {
            backgroundImage: `url(${__API__}/static/images/${member.avatar})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }
        : undefined;

    return (
        <VStack
            className={classNames(cls.AdminMemberDetailsFormPageDesktop, {}, [className])}
            maxW
            gap={50}
        >
            <HStack
                maxW
                justify="center"
            >
                <div
                    className={cls.avatar}
                    style={style}
                >
                    {member.avatar && (
                        <Icon
                            theme={IconTheme.CLICKABLE_BG}
                            Svg={close2}
                            className={cls.deleteAvatarBtn}
                            onClick={onDeleteAvatar}
                        />
                    )}
                    <FileInput
                        accept=".jpg, .jpeg, .png"
                        className={cls.avatarInput}
                        onChange={onChangeAvatar}
                    >
                        {t('Изменить изображение')}
                    </FileInput>
                </div>
            </HStack>
            <HStack
                maxW
                align="center"
                gap={20}
            >
                <Text
                    theme={TextTheme.DARK2}
                    size={TextSize.BODY_L_DESKTOP}
                >
                    {`${t('ФИО')}:`}
                </Text>
                <Input
                    value={member.fullName}
                    className={cls.input}
                    onChange={onChangeFullName}
                />
            </HStack>
            <HStack
                maxW
                align="center"
                gap={20}
            >
                <Text
                    theme={TextTheme.DARK2}
                    size={TextSize.BODY_L_DESKTOP}
                >
                    {`${t('Должность')}:`}
                </Text>
                <Input
                    value={member.jobName}
                    className={cls.input}
                    onChange={onChangeJobName}
                />
            </HStack>
            <HStack
                maxW
                align="center"
                gap={20}
            >
                <Text
                    theme={TextTheme.DARK2}
                    size={TextSize.BODY_L_DESKTOP}
                >
                    {`${t('Статус')}:`}
                </Text>
                <Input
                    value={member.status}
                    className={cls.input}
                    onChange={onChangeStatus}
                />
            </HStack>
            <HStack
                maxW
                align="center"
                gap={20}
            >
                <Text
                    theme={TextTheme.DARK2}
                    size={TextSize.BODY_L_DESKTOP}
                >
                    {`${t('Почта')}:`}
                </Text>
                <Input
                    value={member.email}
                    className={cls.input}
                    onChange={onChangeEmail}
                />
            </HStack>
            <HStack
                maxW
                align="center"
                gap={20}
            >
                <Text
                    theme={TextTheme.DARK2}
                    size={TextSize.BODY_L_DESKTOP}
                >
                    {`${t('Номер телефона')}:`}
                </Text>
                <Input
                    value={member.phone}
                    className={cls.input}
                    onChange={onChangePhone}
                />
            </HStack>
            <VStack
                maxW
                gap={20}
            >
                <Text
                    theme={TextTheme.DARK2}
                    size={TextSize.BODY_L_DESKTOP}
                >
                    {`${t('Биография')}:`}
                </Text>
                <TextArea
                    value={member.bio || ''}
                    theme={TextAreaTheme.DARK}
                    size={TextAreaSize.BODY_DESKTOP}
                    className={cls.bio}
                    onChange={onChangeBio}
                />
            </VStack>
        </VStack>
    );
});
