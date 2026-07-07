import * as yup from 'yup';

export const authSchema = yup.object({
  email: yup
    .string()
    .email('invalid email format')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

export const signupSchema = yup.object({
  name: yup
    .string()
    .min(2, 'Name must be at least 2 characters')
    .required('Full name is required'),
  email: yup
    .string()
    .email('invalid email format')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});
