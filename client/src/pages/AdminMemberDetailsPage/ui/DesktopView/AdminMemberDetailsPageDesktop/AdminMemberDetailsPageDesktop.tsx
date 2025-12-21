import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { VStack } from 'shared/ui/Stack';
import {
    AdminMemberDetailsFormPageDesktop,
} from '../AdminMemberDetailsFormPageDesktop/AdminMemberDetailsFormPageDesktop';
import { AdminMemberDetailsPageReducer } from '../../../model/slices/AdminMemberDetailsPageSlice';
import { fetchMember } from '../../../model/services/fetchMember';
import cls from './AdminMemberDetailsPageDesktop.module.scss';

interface AdminMemberDetailsPageDesktopProps {
    className?: string;
}

const reducers: ReducersList = {
    adminMemberDetailsPage: AdminMemberDetailsPageReducer,
};

const AdminMemberDetailsPageDesktop = memo((props: AdminMemberDetailsPageDesktopProps) => {
    const {
        className,
    } = props;
    const { id } = useParams();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchMember({ memberId: Number(id) }));
    }, [dispatch, id]);

    return (
        <DynamicModuleLoader
            reducers={reducers}
        >
            <VStack
                className={classNames(cls.AdminMemberDetailsPageDesktop, {}, [className])}
                maxH
                maxW
                padding={30}
            >
                <AdminMemberDetailsFormPageDesktop />
            </VStack>
        </DynamicModuleLoader>
    );
});

export default AdminMemberDetailsPageDesktop;
