import React, { useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { NextPage } from 'next';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import productDetailsImg from '@/assets/images/products/productDetails.jpg';
import BackgroundImage from '@/components/ui/BackgroundImage';
import BookingStepper from '@/components/Booking/Stepper';
import { useGetDetailsQuery } from '@/store/Products/FetchDetailsApi';
import { useRouter } from 'next/router';
import Loading from '@/components/Loading/Loading';
import { ClientStorage } from '@/hooks/useLocalStroge';
import { useGetDetailsArQuery } from '@/store/Products/ProgramDetailsAR/FetchDetailsARApi';

const Book: NextPage = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const language = ClientStorage.get('language') || 'en';

    useEffect(() => {
        document.body.dir = language === 'ar' ? 'rtl' : 'ltr';
    }, [language]);

    const { code, programyear, languagecode } = router.query;

    const queryParams = code && programyear ? { code, programyear, languagecode } : null;

    const { data, error, isLoading } = useGetDetailsQuery(queryParams, { skip: language !== 'en' });

    const {
        data: DataAr,
        error: dataErrorAr,
        isLoading: isLoadingDataAr,
    } = useGetDetailsArQuery(queryParams, { skip: language !== 'ar' });

    if (isLoading || isLoadingDataAr) {
        return <Loading />;
    }

    if (
        (!data || !data.items || data.items.length === 0) &&
        (!DataAr || !DataAr.items || DataAr.items.length === 0)
    ) {
        return (
            <Typography variant="h6" sx={{ padding: '10px', textAlign: 'center' }}>
                {t('No booking Details Found')}
            </Typography>
        );
    }
    if (error) {
        return <p>{t('Error loading details.')}</p>;
    }
    const productData = language === 'ar' ? DataAr?.items?.[0] : data?.items?.[0];

    return (
        <div>
            <Head>
                <title>{t('Booking')}</title>
            </Head>
            {isLoading && <Loading />}

            <BackgroundImage imageSrc={productDetailsImg}>
                <Stack
                    direction="row"
                    justifyContent="start"
                    alignItems="end"
                    sx={{
                        position: 'relative',
                        zIndex: 3,
                        color: 'body.light',
                        height: '100%',
                        pb: 5,
                    }}
                >
                    <Container maxWidth="lg">
                        <Typography variant="h2">{t(productData?.ProgramName)}</Typography>
                    </Container>
                </Stack>
            </BackgroundImage>
            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <BookingStepper />
            </Container>
        </div>
    );
};

export default Book;
