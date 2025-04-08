import InsertInvitationRoundedIcon from '@mui/icons-material/InsertInvitationRounded';
import UpdateIcon from '@mui/icons-material/Update';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Link from 'next/link';
import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AdditionalServices from './AdditionalServices';
import { useRouter } from 'next/router';
import { useGetProgramGroupQuery } from '@/store/Products/FetchProgramGroupsApi';
import { useGetGroupPriceQuery } from '@/store/Products/FetchGroupPriceApi';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useAddReservationMutation } from '@/store/Reservation/AddReservationApi';
import { useAddExtraMutation } from '@/store/Reservation/AddExtraApi';
import { useGetExtraQuery } from '@/store/Products/FetchExtraApi';
import Loading from '../Loading/Loading';
import { useAddReservationDetailsMutation } from '@/store/Reservation/AddReservationDetailsApi';
import { store } from '@/store/store';
import { toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';
import { useAppDispatch, useAppSelector } from '@/hooks/useStore';
import { addToWishlist, removeFromWishlist, setWishlist } from '@/store/wishlistSlice';
import { Product } from '@/data/products';

// const names = ['18:00', '19:00', '20:00', '22:00', '15:00'];

interface ProgramGroupItem {
    prog_grp_no: number;
    prog_grp_from: string;
    pax_aval: number;
}
interface ExtraService {
    ext_sp: number;
    ext_srv: string;
    ext_descr: string;
    ext_price: number;
    p_category: string;
    ext_comm: number;
    ext_tax: number;
    prog_code: number;
    prog_year: number;
    item_ref: string;
}
interface Props {
    handleNext: Function;
    setTripDate: (date: string | null) => void;
}

const PassengerData: FunctionComponent<Props> = ({ handleNext, setTripDate }) => {
    const { t } = useTranslation();
    const [personName, setPersonName] = useState<string[]>([]);
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedPaxAval, setSelectedPaxAval] = useState<number | null>(null);
    const [groupNumber, setGroupNumber] = useState<number | null>(null);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [isTermsAccepted, setIsTermsAccepted] = useState(false);

    const router = useRouter();
    const { code, programyear, languagecode } = router.query;
    const programYear = typeof programyear === 'string' ? Number(programyear) : undefined;

    const {
        data: programGroupData,
        error: programGroupError,
        isLoading: programGroupLoading,
    } = useGetProgramGroupQuery({ code, programyear });

    const {
        data: groupPriceData,
        isLoading: groupPriceLoading,
        error: groupPriceError,
    } = useGetGroupPriceQuery(
        groupNumber !== null ? { code, programyear, groupNo: groupNumber } : skipToken
    );

    const productGroup: ProgramGroupItem[] = useMemo(
        () => programGroupData?.items || [],
        [programGroupData]
    );

    useEffect(() => {
        if (programGroupData?.items && programGroupData.items.length > 0) {
            const firstDate = programGroupData.items[0].prog_grp_from;
            setSelectedDate(firstDate);

            const selectedGroup = programGroupData.items.find(
                (item: ProgramGroupItem) => item.prog_grp_from === firstDate
            );

            if (selectedGroup) {
                setSelectedPaxAval(selectedGroup.pax_aval);
                setGroupNumber(selectedGroup.prog_grp_no);
            }
        }
    }, [programGroupData?.items]);
    const [selectedServices, setSelectedServices] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        if (productGroup.length > 0) {
            const defaultDate = productGroup[0].prog_grp_from;
            setSelectedDate(defaultDate);
            setTripDate(defaultDate);
        }
    }, [productGroup, setTripDate]);

    const handleDateChange = (event: SelectChangeEvent<string>) => {
        const selectedValue = event.target.value;
        setSelectedDate(selectedValue);
        setTripDate(selectedValue);
    };

    const handleChange = (event: SelectChangeEvent<typeof personName>) => {
        const {
            target: { value },
        } = event;
        setPersonName(typeof value === 'string' ? value.split(',') : value);
    };

    const additionalServices = groupPriceData?.items.map((item: any) => ({
        title: item.pax_type,
        subtitle: `Price : `,
        price: item.p_price,
    }));

    const [addReservation] = useAddReservationMutation();
    const [addReservationDetails] = useAddReservationDetailsMutation();
    const [addExtra] = useAddExtraMutation();
    const { data: extra } = useGetExtraQuery({ code, programyear });
    const extraData = extra?.items[0];

    const [errorMessage, setErrorMessage] = useState('');

    const useCustomerData = () => {
        const isBrowser = typeof window !== 'undefined';
        return {
            CustCode: isBrowser ? localStorage.getItem('custcode') : null,
            TELEPHONE: isBrowser ? localStorage.getItem('TELEPHONE') : null,
        };
    };

    const customerData = useCustomerData();
    useEffect(() => {
        if (programGroupData?.items?.length) {
            const firstDate = programGroupData.items[0].prog_grp_from;
            setSelectedDate(firstDate);

            const selectedGroup = programGroupData.items.find(
                (item: { prog_grp_from: string }) => item.prog_grp_from === firstDate
            );
            if (selectedGroup) {
                setSelectedPaxAval(selectedGroup.pax_aval);
                setGroupNumber(selectedGroup.prog_grp_no);
            }
        }
    }, [programGroupData]);

    if (groupPriceData && groupPriceData.items && groupPriceData.items.length > 0) {
    }
    const [loading, setLoading] = useState(false);

    const handlePayment = async (selectedServices: { [key: string]: number }) => {
        setLoading(true);
        try {
            const progGrpNo = groupPriceData?.items?.[0]?.prog_grp_no;
            if (!progGrpNo) {
                console.error('No program group number found.');
                setLoading(false);
                return;
            }
    
            // 1. إنشاء الحجز الأساسي
            const reservationResponse = await addReservation({
                CUST_REF: customerData.CustCode,
                TELEPHONE: customerData.TELEPHONE,
                PROG_GRP_NO: progGrpNo,
                PROG__CODE: code,
                lang: languagecode,
                PROG_YEAR: programyear,
            }).unwrap();
    
            if (!reservationResponse) {
                throw new Error('Failed to create reservation');
            }
    
            // حفظ بيانات الحجز
            sessionStorage.setItem('ref_no', reservationResponse.REF_NO);
            sessionStorage.setItem('Res_sp', reservationResponse.RESSP);
    
            // 2. معالجة الخدمات الأساسية (الغرف)
            for (const [serviceKey, count] of Object.entries(selectedServices)) {
                if (count <= 0) continue;
    
                // إذا كانت خدمة أساسية (ليست إضافية)
                if (!serviceKey.startsWith('extra_')) {
                    const paxData = groupPriceData.items.find(
                        (item: any) => item.pax_type === serviceKey
                    );
    
                    if (paxData) {
                        await addReservationDetails({
                            REF_NO: reservationResponse.REF_NO,
                            RESSP: reservationResponse.RESSP,
                            CUST_REF: customerData.CustCode,
                            CODE: code,
                            YEAR: programyear,
                            PAX_TYPE: paxData.p_category,
                            PAX_COUNT: count,
                            PROG_GRP_NO: progGrpNo,
                        }).unwrap();
                    }
                }
            }
    
            // 3. معالجة الخدمات الإضافية
            if (extra?.items) {
                for (const [serviceKey, count] of Object.entries(selectedServices)) {
                    if (count <= 0 || !serviceKey.startsWith('extra_')) continue;
    
                    const serviceName = serviceKey.replace('extra_', '');
                    const extraService = extra.items.find(
                        (item: ExtraService) => item.ext_srv === serviceName
                    );
    
                    if (extraService) {
                        await addExtra({
                            code: code,
                            year: programyear,
                            CUST_REF: customerData.CustCode,
                            REF_NO: reservationResponse.REF_NO,
                            RES_SP: reservationResponse.RESSP,
                            SRV_TYPE: extraService.ext_srv,
                            PAX_TYPE: extraService.p_category,
                            PAX_COUNT: count,
                            ITEM_REF: extraService.item_ref,
                        }).unwrap();
                    }
                }
            }
    
            handleNext();
        } catch (error) {
            console.error('Error during payment process:', error);
            toast.error('Failed to complete booking. Please try again.');
            setLoading(false);
        }
    };

    const handlePayButtonClick = (
        selectedServices: { [key: string]: number },
        handlePayment: (services: { [key: string]: number }) => void
    ) => {
        const hasSelectedServices = Object.values(selectedServices).some(count => count > 0);

        if (!hasSelectedServices) {
            Swal.fire({
                icon: 'error',
                title: 'Payment Error',
                text: 'Please select at least one adult or child.',
                confirmButtonColor: '#E07026',
            });
        } else if (!isTermsAccepted) {
            Swal.fire({
                icon: 'error',
                title: 'Payment Error',
                text: 'Please accept the terms and conditions.',
                confirmButtonColor: '#E07026',
            });
        } else {
            handlePayment(selectedServices);
        }
    };

    return (
        <Box sx={{ mt: 5 }}>
            <ToastContainer />
            {programGroupLoading || groupPriceLoading ? (
                <Loading />
            ) : programGroupError || groupPriceError ? (
                <p>Error loading details.</p>
            ) : (
                <>
                    {loading && <Loading />}
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={2.5}>
                            <FormControl sx={{ mt: 1, width: '100%' }} variant="outlined">
                                <Select
                                    id="date-select"
                                    sx={{ backgroundColor: 'body.light' }}
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    displayEmpty
                                    input={<OutlinedInput />}
                                    fullWidth
                                    placeholder={t('Pick a date')}
                                    startAdornment={
                                        <InputAdornment
                                            position="start"
                                            sx={{ color: 'main.lightGray' }}
                                        >
                                            <InsertInvitationRoundedIcon />
                                        </InputAdornment>
                                    }
                                >
                                    <MenuItem disabled value="">
                                        <em>{t('Pick a date')}</em>
                                    </MenuItem>
                                    {productGroup.map((item: ProgramGroupItem) => (
                                        <MenuItem key={item.prog_grp_no} value={item.prog_grp_from}>
                                            {new Date(item.prog_grp_from).toLocaleDateString()}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        {/* <Grid item xs={2.5}>
                            <FormControl sx={{ mt: 1, width: '100%' }} variant="outlined">
                                <Select
                                    id="Trip type"
                                    sx={{ backgroundColor: 'body.light' }}
                                    displayEmpty
                                    input={<OutlinedInput />}
                                    fullWidth
                                    value={personName}
                                    onChange={handleChange}
                                    placeholder="Trip type"
                                    renderValue={(selected: any) => {
                                        if (selected.length === 0) {
                                            return <Box sx={{ color: '#B7B7B7' }}>Time</Box>;
                                        }
                                        return selected.join(', ');
                                    }}
                                    startAdornment={
                                        <InputAdornment
                                            position="start"
                                            sx={{ color: 'main.lightGray' }}
                                        >
                                            <UpdateIcon />
                                        </InputAdornment>
                                    }
                                >
                                    <MenuItem disabled value="">
                                        <em>Time</em>
                                    </MenuItem>
                                    {names.map(name => (
                                        <MenuItem key={name} value={name}>
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid> */}
                    </Grid>

                    <AdditionalServices
                        numberOfPeople={selectedPaxAval}
                        setTotalPrice={setTotalPrice}
                        services={additionalServices}
                        selectedServices={selectedServices}
                        setSelectedServices={setSelectedServices}
                    />
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{ py: 2, mt: 3 }}
                    >
                        <Typography variant="h3" className="text-danger">
                            {t('Total')}
                        </Typography>
                        <Typography variant="h3" className="fw-bold text-danger">
                            {totalPrice} {t('EGP')}
                        </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center">
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={isTermsAccepted}
                                    onChange={e => setIsTermsAccepted(e.target.checked)}
                                />
                            }
                            label={t('I Accept Terms And Conditions and Cancellation policy')}
                        />
                        <Typography
                            variant="subtitle1"
                            sx={{ color: 'secondary.main', ml: '-5px' }}
                        >
                            <Link href={'/Terms'}>{t('Read Terms and conditions')}</Link>
                        </Typography>
                    </Stack>

                    <Grid container sx={{ my: 3 }} justifyContent="space-between">
                        <Grid item xs={3}>
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                sx={{ py: '10px', px: '50px', fontSize: '18px' }}
                                onClick={() =>
                                    handlePayButtonClick(selectedServices, handlePayment)
                                }
                                disabled={loading}
                            >
                                {loading ? t('Booking...') : t('Booking')}
                            </Button>
                        </Grid>

                        {errorMessage && (
                            <Typography variant="subtitle1" color="error" sx={{ mt: 2 }}>
                                {errorMessage}
                            </Typography>
                        )}
                        {/* <Grid item xs={3}>
                            <Button variant="outlined" sx={{ mr: 1 }} fullWidth size="large">
                                {t('Add to my shopping cart')}
                            </Button>
                        </Grid> */}
                    </Grid>
                </>
            )}
        </Box>
    );
};

export default PassengerData;
