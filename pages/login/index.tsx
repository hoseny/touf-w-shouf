import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import AuthLayout from '@/components/AuthLayout';
import { NextPage } from 'next';
import { useLazyLoginUserQuery } from '@/store/Register/LoginApi';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { Login } from '@/type/type';
import Head from 'next/head';
import Loading from '@/components/Loading/Loading';
import { useTranslation } from 'react-i18next';
import LoginFields from './_components/LoginFields';
import { setUser } from '@/store/Register/userSlice';

const Index: NextPage = () => {
    const [values, setValues] = useState<Login>({
        Email: '',
        Pword: '',
        rememberMe: false,
        showPassword: false,
        errors: {},
        isLoading: false,
    });
    const { t } = useTranslation();
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loginUser] = useLazyLoginUserQuery();
    const dispatch = useDispatch();
    const router = useRouter();

    const handleChange = (prop: keyof Login) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setValues(prevValues => ({ ...prevValues, [prop]: newValue }));
    };

    const handleClickShowPassword = () => {
        setValues(prevValues => ({ ...prevValues, showPassword: !prevValues.showPassword }));
    };

    const onSubmit = async () => {
        setIsLoading(true);
        try {
            await handleLogin(
                values,
                setValues,
                setSubmitError,
                setIsAuthenticated,
                loginUser,
                dispatch,
                router,
                setIsLoading
            );
        } catch (error) {
            console.error('Login failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthLayout>
            <>
                <ToastContainer />
                <Head>
                    <title>{t('Sign In Page')}</title>
                    <meta name="description" content="Sign In Page" />
                </Head>

                {isLoading && <Loading />}
                <LoginFields
                    values={values}
                    handleChange={handleChange}
                    handleClickShowPassword={handleClickShowPassword}
                    handleSubmit={onSubmit}
                    setRememberMe={checked =>
                        setValues(prevValues => ({ ...prevValues, rememberMe: checked }))
                    }
                    setIsLoading={setIsLoading}
                    isLoading={isLoading}
                />
            </>
        </AuthLayout>
    );

    // دالة تسجيل الدخول
    async function handleLogin(
        values: Login,
        setValues: React.Dispatch<React.SetStateAction<Login>> | undefined,
        setSubmitError: React.Dispatch<React.SetStateAction<string | null>>,
        setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>,
        loginUser: any,
        dispatch: any,
        router: any,
        setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
    ) {
        const errors: { Email?: string; Pword?: string } = {};

        if (!values.Email || !values.Email.trim()) {
            errors.Email = 'Email is required';
        }

        if (!values.Pword || !values.Pword.trim()) {
            errors.Pword = 'Password is required';
        }

        if (Object.keys(errors).length > 0) {
            setValues?.(prevValues => ({
                ...prevValues,
                errors,
            }));
            console.error('Values are undefined or incomplete');
            return;
        }

        setValues?.(prevValues => ({
            ...prevValues,
            errors: {},
        }));

        setIsLoading(true);

        try {
            const result = await loginUser({ Email: values.Email, Pword: values.Pword }).unwrap();

            if (result?.Status) {
                if (result.Status === 'please insert Your Regestered Email') {
                    handleLoginError('Login failed. This email is not registered.');
                } else if (result.Status === 'Invalid Password') {
                    handleLoginError('Login failed. Invalid Password.');
                }
            }

            if (result?.item?.length > 0) {
                const user = result.item[0];
                const token = user['Token ']?.trim();
                const { CustCode, NAME, TELEPHONE, EMAIL } = user;

                if (CustCode && token) {
                    localStorage.setItem('token', token);
                    localStorage.setItem('custcode', CustCode);
                    localStorage.setItem('NAME', NAME);
                    localStorage.setItem('EMAIL', EMAIL);
                    localStorage.setItem('TELEPHONE', TELEPHONE);
                    localStorage.setItem('isAuthenticated', 'true');

                    setIsAuthenticated(true);
                    dispatch(setUser({ CustCode, Email: EMAIL, Token: token }));
                    toast.success('Login successful!', {
                        autoClose: 2000,
                        className: 'toast-orange',
                    });
                    router.push('/home');
                } else {
                    handleLoginError('Invalid login response. Please try again.');
                }
            } else {
                handleLoginError('Login failed. Invalid credentials.');
            }
        } catch (err) {
            handleApiError(err);
        } finally {
            setIsLoading(false);
        }

        function handleLoginError(message: string) {
            setSubmitError(message);
            toast.error(message);
        }

        function handleApiError(err: unknown) {
            if (isErrorWithStatus(err)) {
                const errorMessage = err.data?.Status || 'An unexpected error occurred.';
                setSubmitError(errorMessage);
                toast.error(errorMessage);
            } else {
                console.error('Error:', err);
                setSubmitError('An unexpected error occurred.');
                toast.error('An unexpected error occurred. Please try again.');
            }
        }
    }

    function isErrorWithStatus(err: unknown): err is { status: number; data: { Status: string } } {
        return (
            typeof err === 'object' &&
            err !== null &&
            'status' in err &&
            'data' in err &&
            typeof (err as any).status === 'number' &&
            typeof (err as any).data === 'object' &&
            (err as any).data !== null &&
            'Status' in (err as any).data
        );
    }
};

export default Index;
