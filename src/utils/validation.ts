import * as yup from 'yup';

export interface ReelUploadFormValues {
    tags: string;
    description: string;
    username: string;
    video: File | null;
    profileImage: File | null;
}

export const reelUploadInitialValues: ReelUploadFormValues = {
    tags: '',
    description: '',
    username: '',
    video: null,
    profileImage: null,
};

export const reelUploadSchema = yup.object().shape({
    tags: yup.string().required('Tags are required'),
    description: yup.string().required('Description is required'),
    username: yup.string().required('Username is required'),
    video: yup.mixed().required('Video file is required'),
    profileImage: yup.mixed().nullable(),
});