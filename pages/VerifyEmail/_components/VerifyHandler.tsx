import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useVerifyEmailMutation } from '@/store/Register/VerifyEmailApi';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { VerifyEmailHandlerProps } from '@/type/type';
import Grid from '@mui/material/Grid';
import { useAddUserMutation } from '@/store/Register/RegisterApi';
const VerifyHandler: React.FC<VerifyEmailHandlerProps> = ({
    OTP,
    email,
    phone,
    setOtpError,
    setEmailError,
    setPhoneError,
    setIsLoading,
}) => {
    const { t } = useTranslation();
    const router = useRouter();
    const [verifyEmail] = useVerifyEmailMutation();
    const [addUser] = useAddUserMutation();
    const [isResendDisabled, setIsResendDisabled] = useState(false);
    const [timer, setTimer] = useState(60);

    const handleVerify = async () => {
        let isValid = true;

        if (OTP === '') {
            setOtpError(t('OTP is required'));
            isValid = false;
        } else {
            setOtpError(null);
        }

        if (email === '') {
            setEmailError(t('Email is required'));
            isValid = false;
        } else {
            setEmailError(null);
        }

        if (phone === '') {
            setPhoneError(t('Phone is required'));
            isValid = false;
        } else {
            setPhoneError(null);
        }

        if (!isValid) return;

        setIsLoading(true);
        try {
            const response = await verifyEmail({
                OTP: Number(OTP),
                p_Mail: email,
                TEL: phone,
            }).unwrap();

            if (response.OTP === 'This Phone already Exist') {
                setPhoneError(t('This phone number already exists. Please use another number.'));
                toast.error(t('This phone number already exists!') as string);
                return;
            }

            if (response.OTP === 'OTP is Invalid/Expired') {
                setOtpError(t('The OTP is invalid or has expired. Please request a new one.'));
                toast.error(t('The OTP is invalid or has expired!') as string);
                return;
            }

            if (response.OTP === 'This Mail already Exist') {
                setEmailError(t('This email already exists. Please use another email.'));
                toast.error(t('This email already exists!') as string);
                return;
            }

            toast.success(t('Email verified successfully!') as string, {
                className: 'toast-orange',
                autoClose: 2000,
            });

            if (typeof window !== 'undefined') {
                sessionStorage.removeItem('addUser');
            }

            setTimeout(() => {
                router.push('/login');
            }, 2000);

        } catch (error) {
            console.error(error);
            setOtpError(t('Verification failed. Please check the OTP.'));
            toast.error(t('Verification failed!') as string);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);
            return () => clearInterval(interval);
        } else {
            setIsResendDisabled(false);
        }
    }, [timer]);

    const handleResendOTP = async () => {
        const storedData = sessionStorage.getItem('addUser');
        if (storedData) {
            const userData = JSON.parse(storedData);
            setIsResendDisabled(true);
            setTimer(60);

            try {
                const response = await addUser({
                    p_Mail: userData.p_Mail,
                    TEL: userData.TEL,
                    CNAME: userData.CNAME,
                    NAT: userData.NAT,
                    C_ADDRESS: userData.C_ADDRESS,
                    C_PASS: userData.C_PASS,
                }).unwrap();

                if (response?.item?.[0]?.OTP === 'Please Review Your Mail ') {
                    toast.success(t('OTP resent successfully!') as string);
                } else {
                    toast.error(t('Failed to resend OTP.') as string);
                }
            } catch (error) {
                console.error(error);
                toast.error(t('An error occurred while resending the OTP.') as string);
            }
        } else {
            toast.error(t('No user data found') as string);
        }
    };

    return (
        <>
            <Grid item xs={12} sx={{ mt: 4 }}>
                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    sx={{ py: '13px' }}
                    fullWidth
                    onClick={handleVerify}
                >
                    <Typography variant="button">{t('Verify')}</Typography>
                </Button>
            </Grid>

            <Grid item xs={12} sx={{ mt: 2 }}>
                <Button
                    type="button"
                    variant="contained"
                    size="large"
                    sx={{ py: '13px' }}
                    fullWidth
                    onClick={handleResendOTP}
                    disabled={isResendDisabled}
                >
                    <Typography variant="button">
                        {isResendDisabled ? `${t('Resend OTP')} (${timer}s)` : t('Resend OTP')}
                    </Typography>
                </Button>
            </Grid>
        </>
    );
};

export default VerifyHandler;
