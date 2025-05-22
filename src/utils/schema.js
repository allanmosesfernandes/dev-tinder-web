import * as yup from 'yup';

// 1. Define your validation schema with Yup
const loginSchema = yup.object({
email: yup
    .string()
    .required('Email is required')
    .email('Must be a valid email'),
    password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
}).required()

export { loginSchema }