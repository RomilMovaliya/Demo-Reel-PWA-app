import * as yup from 'yup';
export const signupUserInitialValues = {
    email: '',
    password: '',
    first_name: '',
    last_name: '',
};

export const signinUserInitialValues = {
    email: '',
    password: '',
};

export const signinUserSchema = yup.object().shape({
    email: yup.string().email('Invalid email address').required('Email is required'),
    password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});

export const signupUserSchema = yup.object().shape({
    email: yup.string().email('Invalid email address').required('Email is required'),
    password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    first_name: yup.string().required('First name is required'),
    last_name: yup.string().required('Last name is required'),
});