import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { useTranslation } from 'react-i18next';
import { useGetPaymentQuery } from '@/store/Reservation/FetchPaymentApi';
import PaymentForm from '@/components/Booking/PaymentForm';
import Swal from 'sweetalert2';
import CircularProgress from '@mui/material/CircularProgress';
import Loading from '@/components/Loading/Loading';
import { useRouter } from 'next/router';
interface GeideaData {
    responseCode: string;
    responseMessage: string;
    detailedResponseCode: string;
    detailedResponseMessage: string;
    orderId: string;
    reference: string;
}

const Payment = () => {
    const { t } = useTranslation();
    const [ref, setRef] = useState<string | null>(null);
    const [sp, setSp] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const customer_ref = typeof window !== 'undefined' ? localStorage.getItem('custcode') : null;
    const customerName = typeof window !== 'undefined' ? localStorage.getItem('NAME') : null;
    const router = useRouter();

    const handleLater = () => {
        router.push('/myReservation');
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const refNo = sessionStorage.getItem('ref_no');
            const resSp = sessionStorage.getItem('Res_sp');

            if (refNo) setRef(refNo);
            if (resSp) setSp(resSp);
        }
    }, []);

    const { data } = useGetPaymentQuery(ref && sp ? { ref, sp } : undefined, {
        skip: !ref || !sp,
    });
    const paymentData = data?.items || [];
    const programname = paymentData[0]?.programname || t('Program name not available');
    const programyear = paymentData[0]?.programyear || t('Program year not available');
    const TripDate = paymentData[0]?.['TripDate :'] || t('Program date not available');
    const customerRef = paymentData[0]?.['Customerref :'] || customer_ref;
    const reservationRef = paymentData[0]?.['reservationRef '] || ref;
    const reservationsp = paymentData[0]?.['reservationsp '] || sp;
    const total = paymentData[0]?.['Total '] || 0;
    const vat = paymentData[0]?.['Vat '] || 0;
    const totalWithVat = paymentData[0]?.['TheTotalincludesVat '] || 0;
    const numberOfAdults = paymentData[0]?.['TheNumberOfADULTX'] || 0;
    const numberOfChildrenUnder6 = paymentData[0]?.['TheNumberOfCHILD FROM 1 TO 6X'] || 0;
    const numberOfChildrenBetween6And12 = paymentData[0]?.['TheNumberOfCHILD FROM 6 TO 12X'] || 0;
    const TheNumberOfCHILDFROM6TO12DayUseX =
        paymentData[0]?.['TheNumberOfCHILD FROM 6 TO 12 DayUseX'] || 0;
    const TheNumberOfADULTINSINGLEX = paymentData[0]?.['TheNumberOfADULT IN SINGLEX'] || 0;
    const TheNumberOfADULTINDOUBLEX = paymentData[0]?.['TheNumberOfADULT IN DOUBLEX'] || 0;
    const TheNumberOfADULTINTRIPLEX = paymentData[0]?.['TheNumberOfADULT IN TRIPLEX'] || 0;
    const TheNumberOfADULTINSUITEX = paymentData[0]?.['TheNumberOfADULT IN SUITEX'] || 0;
    const TheNumberOfADULTINQUARTERX = paymentData[0]?.['TheNumberOfADULT IN QUARTERX'] || 0;
    const totalWithoutAdditionalService = paymentData[0]?.['TheTotalwithoutadditionalservice'] || 0;
    const totalAdditionalService = paymentData[0]?.['TheTotaladditionalservice'] || 0;

    // fetch check out id
    const fetchPaymentData = async (): Promise<any> => {
        try {
            setIsLoading(true);
            // const urlTrue = 'http://localhost:3000/Payment/Success';
            // const urlFalse = 'http://localhost:3000/Payment/Failed';
            // const urlTrue = 'https://touf-we-shouf.vercel.app/Payment/Success';
            // const urlFalse = 'https://touf-we-shouf.vercel.app/Payment/Failed';
            const urlTrue = 'https://www.toufwshouf.travel/Payment/Success';
            const urlFalse = 'https://www.toufwshouf.travel/Payment/Failed';
            const accessType = 'Web';
            const custRef = customerRef;
            const invNo = reservationsp;
            const invAmount = totalWithVat;
            const appSession =
                typeof window !== 'undefined' ? localStorage.getItem('token') : '123456';
            // const appSession = '123456';

            const url = `https://app.misrtravelco.net:4444/ords/invoice/public/GetCheckOut?urlFalse=${urlFalse}&urlTrue=${urlTrue}&accessType=${accessType}&custRef=${custRef}&invNo=${invNo}&invAmount=${invAmount}&appSession=${appSession}`;

            const response = await fetch(url);

            if (!response.ok) {
                setIsLoading(false);
                throw new Error('Failed to fetch payment data');
            }
            return await response.json();
        } catch (error: any) {
            setIsLoading(false);
            const errMessage = error.response?.data?.errMessage || 'Unexpected error occurred';
            console.error(errMessage);
            Swal.fire(errMessage);
        }
    };

    //add Geidea
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://www.merchant.geidea.net/hpp/geideaCheckout.min.js';
        script.async = true;
        script.onload = () => console.log('GeideaCheckout script loaded successfully');
        script.onerror = () => console.error('Failed to load GeideaCheckout script');
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    // Handle payment success
    const onSuccess = (data: GeideaData) => {
        Swal.fire({
            icon: 'success',
            title: t('Payment Successful'),
            html: `
        <strong>${t('Response Code')}:</strong> ${data.responseCode}<br />
        <strong>${t('Order ID')}:</strong> ${data.orderId}
        `,
        });
    };

    // Handle payment error
    const onError = (data: GeideaData) => {
        Swal.fire({
            icon: 'error',
            title: t('Payment Failed'),
            html: `
        <strong>${t('Response Code')}:</strong> ${data.responseCode}<br />
        <strong>${t('Order ID')}:</strong> ${data.orderId}
        `,
        });
    };

    // Handle payment cancellation
    const onCancel = () => {
        Swal.fire({
            icon: 'warning',
            title: t('Payment Cancelled'),
        });
    };

    // Start payment
    const startPayment = async () => {
        setIsLoading(true);
        if (!reservationRef || !customerRef || !total) {
            Swal.fire({
                icon: 'error',
                title: t('Missing Information'),
                text: t('Please make sure all payment details are filled out correctly.'),
            });
            return;
        }
        const paymentData = await fetchPaymentData();
        if (!paymentData || paymentData.errMessage !== 'Success') {
            alert(t('Payment data is missing or failed!'));
            return;
        }

        const checkoutId = paymentData.checkout;
        console.log('checkoutId', checkoutId);

        if ((window as any).GeideaCheckout) {
            const GeideaCheckout = (window as any).GeideaCheckout;
            const payment = new GeideaCheckout(onSuccess, onError, onCancel);
            payment.startPayment(checkoutId);
        } else {
            setIsLoading(false);
            Swal.fire({
                icon: 'error',
                title: t('Script Not Loaded'),
                text: t('GeideaCheckout script is not loaded yet. Please try again later.'),
            });
        }
    };

    return (
        <div>
            <Grid container spacing={5}>
                {isLoading && <Loading />}
                {/* <Grid xs={7} item>
                    <PaymentForm />
                </Grid> */}
                <Grid md={5} xs={12} item sx={{ margin: 'auto' }}>
                    <Paper elevation={1} sx={{ backgroundColor: '#FAFAFA', p: 2, mt: 5 }}>
                        <Typography variant="h3">{programname}</Typography>

                        <Stack sx={{ mt: 3 }} direction="column" spacing={2}>
                            {/* <Stack direction="row" justifyContent="space-between">
                                <Typography variant="body2">{t('program year')}:</Typography>
                                <Typography variant="body1">{programyear}</Typography>
                            </Stack> */}

                            {/* <Stack direction="row" justifyContent="space-between">
                                <Typography variant="body2">{t('Customer Ref')}:</Typography>
                                <Typography variant="body1">{customerRef}</Typography>
                            </Stack> */}

                            <Stack direction="row" justifyContent="space-between">
                                <Typography variant="body2">{t('Customer Name')}:</Typography>
                                <Typography variant="body1">{customerName}</Typography>
                            </Stack>

                            <Stack direction="row" justifyContent="space-between">
                                <Typography variant="body2">{t('Trip Date')}:</Typography>
                                <Typography variant="body1">{TripDate}</Typography>
                            </Stack>

                            <Stack direction="row" justifyContent="space-between">
                                <Typography variant="body2">{t('reservation sp')}:</Typography>
                                <Typography variant="body1">{reservationsp}</Typography>
                            </Stack>

                            {numberOfAdults > 0 && (
                                <Stack direction="row" justifyContent="space-between">
                                    <Typography variant="body2">{t('Number of Adult')}:</Typography>
                                    <Typography variant="body1">{numberOfAdults}</Typography>
                                </Stack>
                            )}

                            {TheNumberOfADULTINSINGLEX > 0 && (
                                <Stack direction="row" justifyContent="space-between">
                                    <Typography variant="body2">
                                        {t('Number of Adult Single')}:
                                    </Typography>
                                    <Typography variant="body1">
                                        {TheNumberOfADULTINSINGLEX}
                                    </Typography>
                                </Stack>
                            )}

                            {TheNumberOfADULTINDOUBLEX > 0 && (
                                <Stack direction="row" justifyContent="space-between">
                                    <Typography variant="body2">
                                        {t('Number of Adult Double')}:
                                    </Typography>
                                    <Typography variant="body1">
                                        {TheNumberOfADULTINDOUBLEX}
                                    </Typography>
                                </Stack>
                            )}

                            {TheNumberOfADULTINTRIPLEX > 0 && (
                                <Stack direction="row" justifyContent="space-between">
                                    <Typography variant="body2">
                                        {t('Number of Adult in Triple')}:
                                    </Typography>
                                    <Typography variant="body1">
                                        {TheNumberOfADULTINTRIPLEX}
                                    </Typography>
                                </Stack>
                            )}

                            {TheNumberOfADULTINQUARTERX > 0 && (
                                <Stack direction="row" justifyContent="space-between">
                                    <Typography variant="body2">
                                        {t('Number of Adult in Quarter')}:
                                    </Typography>
                                    <Typography variant="body1">
                                        {TheNumberOfADULTINQUARTERX}
                                    </Typography>
                                </Stack>
                            )}

                            {TheNumberOfADULTINSUITEX > 0 && (
                                <Stack direction="row" justifyContent="space-between">
                                    <Typography variant="body2">
                                        {t('Number of Adult in Suite')}:
                                    </Typography>
                                    <Typography variant="body1">
                                        {TheNumberOfADULTINSUITEX}
                                    </Typography>
                                </Stack>
                            )}

                            {TheNumberOfCHILDFROM6TO12DayUseX > 0 && (
                                <Stack direction="row" justifyContent="space-between">
                                    <Typography variant="body2">
                                        {t('Number Of CHILD (6 TO 12) DayUse')}:
                                    </Typography>
                                    <Typography variant="body1">
                                        {TheNumberOfCHILDFROM6TO12DayUseX}
                                    </Typography>
                                </Stack>
                            )}

                            {numberOfChildrenUnder6 > 0 && (
                                <Stack direction="row" justifyContent="space-between">
                                    <Typography variant="body2">
                                        {t('Number of Children (1-6)')}:
                                    </Typography>
                                    <Typography variant="body1">
                                        {numberOfChildrenUnder6}
                                    </Typography>
                                </Stack>
                            )}

                            {numberOfChildrenBetween6And12 > 0 && (
                                <Stack direction="row" justifyContent="space-between">
                                    <Typography variant="body2">
                                        {t('Number of Children (6-12)')}:
                                    </Typography>
                                    <Typography variant="body1">
                                        {numberOfChildrenBetween6And12}
                                    </Typography>
                                </Stack>
                            )}

                            <Stack direction="row" justifyContent="space-between">
                                <Typography variant="body2">
                                    {t('Total Without Additional Services')}:
                                </Typography>
                                <Typography variant="body1">
                                    {totalWithoutAdditionalService}
                                </Typography>
                            </Stack>

                            <Stack direction="row" justifyContent="space-between">
                                <Typography variant="body2">
                                    {t('Additional Service Total')}:
                                </Typography>
                                <Typography variant="body1">{totalAdditionalService}</Typography>
                            </Stack>

                            <Stack direction="row" justifyContent="space-between">
                                <Typography variant="body2">{t('Total')}:</Typography>
                                <Typography variant="body1">{total}</Typography>
                            </Stack>

                            <Stack direction="row" justifyContent="space-between">
                                <Typography variant="body2">{t('VAT')}:</Typography>
                                <Typography variant="body1">{vat}</Typography>
                            </Stack>

                            <Stack direction="row" justifyContent="space-between">
                                <Typography variant="body2">{t('Total with VAT')}:</Typography>
                                <Typography variant="body1">{totalWithVat}</Typography>
                            </Stack>
                        </Stack>
                    </Paper>
                </Grid>
            </Grid>

            <Grid container sx={{ my: 3 }} justifyContent="space-between">
                <Grid item xs={3} sx={{ margin: 'auto' }}>
                    <Button onClick={startPayment} variant="contained" fullWidth size="large">
                        {t('Pay Now')}
                    </Button>
                </Grid>
                <Grid item xs={3} sx={{ margin: 'auto' }}>
                    <Button variant="outlined" onClick={handleLater} fullWidth size="large">
                        {t('Pay Later')}
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default Payment;
