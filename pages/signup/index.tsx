import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import AuthLayout from '@/components/AuthLayout';
import { ToastContainer, toast } from 'react-toastify';
import { Register } from '@/type/type';
import { useAddUserMutation } from '@/store/Register/RegisterApi';
import Loading from '@/components/Loading/Loading';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import FormHelperText from '@mui/material/FormHelperText';
import Stack from '@mui/material/Stack';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { countries } from '@/constants/countries';
import Link from 'next/link';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import axios from 'axios';

type Nationality = {
    NAT_CODE: string;
    NAT_NAME: string;
};
const RegisterPage: NextPage = () => {
    const { t } = useTranslation();
    const [nationalities, setNationalities] = useState<Nationality[]>([]);
    const [values, setValues] = useState<Register>({
        p_Mail: '',
        CNAME: '',
        TEL: '',
        NAT: '',
        C_ADDRESS: '',
        C_PASS: '',
        RememberMe: false,
        showPassword: false,
        emailError: '',
        errors: {},
    });
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const [addUser] = useAddUserMutation();

    useEffect(() => {
        const fetchNationalities = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/AllNationality`
                );
                setNationalities(response.data.items);
            } catch (error) {
                console.error('Error fetching nationalities:', error);
            }
        };

        fetchNationalities();
    }, []);

    const handleAdd = async () => {
        const newErrors: Register['errors'] = {};

        if (!values.p_Mail) {
            newErrors.p_Mail = 'Email is required';
        }
        if (!values.CNAME) {
            newErrors.CNAME = 'Full name is required';
        }
        if (!values.TEL) {
            newErrors.TEL = 'Phone number is required';
        }
        if (!values.NAT) {
            newErrors.NAT = 'Nationality is required';
        }
        if (!values.C_ADDRESS) {
            newErrors.C_ADDRESS = 'Address is required';
        }
        if (!values.C_PASS) {
            newErrors.C_PASS = 'Password is required';
        } else if (values.C_PASS.length < 6) {
            newErrors.C_PASS = 'Password must be at least 6 characters';
        }

        if (Object.keys(newErrors).length > 0) {
            setValues(prev => ({ ...prev, errors: newErrors }));
            return;
        }

        const formattedData = {
            p_Mail: values.p_Mail,
            TEL: String(values.TEL),
            CNAME: values.CNAME,
            NAT: String(values.NAT),
            C_ADDRESS: values.C_ADDRESS,
            C_PASS: values.C_PASS,
            RememberMe: values.RememberMe,
        };
        console.log('Data to be sent to backend:', formattedData);

        setIsLoading(true);
        try {
            const response = await addUser(formattedData).unwrap();

            console.log('Server response:', response);

            if (response?.OTP === 'This Mail already Exist') {
                setValues(prev => ({
                    ...prev,
                    emailError: 'This Mail already Exist',
                    errors: { ...prev.errors, p_Mail: 'This Mail already Exist' },
                }));
                toast.error('This Mail already Exist');
            } else if (response?.OTP === 'This Phone already Exist') {
                setValues(prev => ({
                    ...prev,
                    errors: { ...prev.errors, TEL: 'This Phone already Exist' },
                }));
                toast.error('This Phone already Exist');
            } else if (response?.item?.[0]?.OTP === 'Please Review Your Mail ') {
                console.log('Registered data:', formattedData);

                setValues({
                    p_Mail: '',
                    CNAME: '',
                    TEL: '',
                    NAT: '',
                    C_ADDRESS: '',
                    C_PASS: '',
                    RememberMe: false,
                    showPassword: false,
                    emailError: '',
                    errors: {},
                });

                toast.success(
                    `Registration successful. Please check your email to verify your account.`,
                    {
                        autoClose: 2000,
                        className: 'toast-orange',
                    }
                );

                if (typeof window !== 'undefined') {
                    sessionStorage.setItem('addUser', JSON.stringify(formattedData));
                }

                setTimeout(() => {
                    router.push({
                        pathname: '/VerifyEmail',
                        query: {
                            p_Mail: formattedData.p_Mail,
                            TEL: formattedData.TEL,
                        },
                    });
                }, 2000);
            } else {
                console.warn('Unexpected response:', response);
                toast.error('Unexpected response from the server.');
            }
        } catch (error: unknown) {
            console.error('Error setting up request:', error);
            const errorWithOTP = error as { data?: { OTP?: string } };
            if (errorWithOTP?.data?.OTP) {
                toast.error(errorWithOTP.data.OTP);
            } else {
                toast.error('Unknown error occurred');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const uniqueNationalities: Nationality[] = nationalities.reduce<Nationality[]>(
        (acc, current) => {
            const exists = acc.find(item => item.NAT_CODE === current.NAT_CODE);
            if (!exists) acc.push(current);
            return acc;
        },
        []
    );

    return (
        <AuthLayout>
            <>
                <ToastContainer />
                <Head>
                    <title>{t('Sign Up Page')}</title>
                    <meta name="description" content="Sign Up Page" />
                </Head>
                {isLoading && <Loading />}
                <Paper elevation={0}>
                    <Container sx={{ py: 2 }}>
                        <Typography variant="h4" sx={{ textAlign: 'center', mb: 3 }}>
                            {t('Register')}
                        </Typography>

                        <form
                            onSubmit={e => {
                                e.preventDefault();
                                handleAdd();
                            }}
                            className="pb-2"
                        >
                            <Grid>
                                {/* Full Name */}
                                <Grid item xs={12} sx={{ mt: 4 }}>
                                    <label htmlFor="Fullname">
                                        <Typography variant="subtitle1">
                                            {t('Full name')}
                                        </Typography>
                                    </label>
                                    <TextField
                                        id="Fullname"
                                        fullWidth
                                        variant="outlined"
                                        placeholder={t('Enter your Full Name')}
                                        sx={{ mt: 1 }}
                                        value={values.CNAME}
                                        onChange={e =>
                                            setValues({ ...values, CNAME: e.target.value })
                                        }
                                        error={!!values.errors.CNAME}
                                        helperText={values.errors.CNAME}
                                    />
                                </Grid>
                                {/* Email */}
                                <Grid item xs={12} sx={{ mt: 2 }}>
                                    <label htmlFor="email">
                                        <Typography variant="subtitle1">
                                            {t('Email Address')}
                                        </Typography>
                                    </label>
                                    <TextField
                                        id="email"
                                        fullWidth
                                        variant="outlined"
                                        type="email"
                                        placeholder={t('Enter your email')}
                                        sx={{ mt: 1 }}
                                        value={values.p_Mail}
                                        onChange={e =>
                                            setValues({ ...values, p_Mail: e.target.value })
                                        }
                                        error={!!values.errors.p_Mail || !!values.emailError}
                                        helperText={values.errors.p_Mail || values.emailError}
                                    />
                                </Grid>
                                {/* Phone Number */}
                                <Grid item xs={12} sx={{ mt: 2 }}>
                                    <label htmlFor="phoneNumber">
                                        <Typography variant="subtitle1">
                                            {t('Phone number')}
                                        </Typography>
                                    </label>
                                    <TextField
                                        id="phoneNumber"
                                        fullWidth
                                        type="number"
                                        variant="outlined"
                                        placeholder={t('Enter your phone Number')}
                                        sx={{ mt: 1 }}
                                        value={values.TEL}
                                        onChange={e =>
                                            setValues({ ...values, TEL: e.target.value })
                                        }
                                        error={!!values.errors.TEL}
                                        helperText={values.errors.TEL}
                                    />
                                </Grid>
                                {/* Nationality */}
                                <Grid item xs={12} sx={{ mt: 2 }}>
                                    <label htmlFor="country">
                                        <Typography variant="subtitle1">
                                            {t('Nationality')}
                                        </Typography>
                                    </label>
                                    <Autocomplete
                                        id="country"
                                        sx={{ width: '100%' }}
                                        options={uniqueNationalities}
                                        autoHighlight
                                        getOptionLabel={option => option.NAT_NAME}
                                        onChange={(event, newValue) => {
                                            setValues({
                                                ...values,
                                                NAT: newValue ? newValue.NAT_CODE : '',
                                            });
                                        }}
                                        renderInput={params => (
                                            <TextField
                                                sx={{ mt: 1 }}
                                                {...params}
                                                placeholder={t('Choose a country')}
                                                error={!!values.errors.NAT}
                                                helperText={values.errors.NAT}
                                                inputProps={{
                                                    ...params.inputProps,
                                                    autoComplete: 'new-password',
                                                }}
                                            />
                                        )}
                                        renderOption={(props, option) => (
                                            <ol key={option.NAT_CODE}>
                                                <li {...props}>{option.NAT_NAME}</li>
                                            </ol>
                                        )}
                                    />
                                </Grid>
                                {/* Address */}
                                <Grid item xs={12} sx={{ mt: 2 }}>
                                    <label htmlFor="Address">
                                        <Typography variant="subtitle1">{t('Address')}</Typography>
                                    </label>
                                    <TextField
                                        id="Address"
                                        fullWidth
                                        variant="outlined"
                                        placeholder={t('Enter your Address')}
                                        sx={{ mt: 1 }}
                                        value={values.C_ADDRESS}
                                        onChange={e =>
                                            setValues({ ...values, C_ADDRESS: e.target.value })
                                        }
                                        error={!!values.errors.C_ADDRESS}
                                        helperText={values.errors.C_ADDRESS}
                                    />
                                </Grid>
                                {/* Password */}
                                <Grid item xs={12} sx={{ mt: 2 }}>
                                    <label htmlFor="password">
                                        <Typography variant="subtitle1">{t('Password')}</Typography>
                                    </label>
                                    <FormControl fullWidth variant="outlined" sx={{ mt: 1 }}>
                                        <OutlinedInput
                                            id="password"
                                            type={values.showPassword ? 'text' : 'password'}
                                            value={values.C_PASS}
                                            onChange={e =>
                                                setValues({ ...values, C_PASS: e.target.value })
                                            }
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={() =>
                                                            setValues({
                                                                ...values,
                                                                showPassword: !values.showPassword,
                                                            })
                                                        }
                                                    >
                                                        {values.showPassword ? (
                                                            <VisibilityOffIcon />
                                                        ) : (
                                                            <VisibilityIcon />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            error={!!values.errors.C_PASS}
                                        />
                                        <FormHelperText error={!!values.errors.C_PASS}>
                                            {values.errors.C_PASS}
                                        </FormHelperText>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            {/* Register Button */}
                            <Stack spacing={2} sx={{ mt: 3 }}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    sx={{ py: '13px' }}
                                    type="submit"
                                    fullWidth
                                >
                                    {t('Sign Up')}
                                </Button>
                                <Typography variant="body2" align="center">
                                    {t('Already have an account?')}
                                </Typography>
                                <Typography
                                    align="center"
                                    variant="subtitle1"
                                    sx={{ color: 'primary.main' }}
                                >
                                    <Link href="/login">{t('Sign in')}</Link>
                                </Typography>
                            </Stack>
                        </form>
                    </Container>
                </Paper>
            </>
        </AuthLayout>
    );
};

export default RegisterPage;
