import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getAdminNewsDetailsPageAddingParagraphData } from '../selectors/getAdminNewsDetailsPage';

export const fetchDeleteStaticMedia = createAsyncThunk<
    void,
    void,
    ThunkConfig<any>
>(
    'pages/AdminNewsDetailsPage/fetchDeleteStaticMedia',
    async (_, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;
        const data = getAdminNewsDetailsPageAddingParagraphData(getState());

        if (data?.video) {
            try {
                const response = await extra.api.delete(
                    '/files/delete-video',
                    {
                        params: {
                            videoFileName: data.video,
                            posterFileName: data.videoPoster,
                        },
                    },
                );

                if (!response.data) {
                    throw new Error();
                }

                return response.data;
            } catch (error) {
                return rejectWithValue(error);
            }
        } else if (data?.img) {
            try {
                const response = await extra.api.delete(
                    '/files/delete-image',
                    {
                        params: {
                            fileName: data.img,
                        },
                    },
                );

                if (!response.data) {
                    throw new Error();
                }

                return response.data;
            } catch (error) {
                return rejectWithValue(error);
            }
        }
    },
);
