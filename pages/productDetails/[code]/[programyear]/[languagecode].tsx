import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { useTranslation } from 'react-i18next';
import TitleAndRating from '../../_components/TitleAndRating';
import WatchVideoAndMap from '@/pages/productDetails/_components/WatchVideoAndMap';
import Tags from '@/components/products/Tags';
import LocationAndPriceAndTime from '../../_components/LocationAndPriceAndTime';
import Accordion from '@/components/products/Accordion';
import DetailsTabs from '../../_components/DetailsTabs';
import { useGetDetailsQuery } from '@/store/Products/FetchDetailsApi';
import { useGetIncludingQuery } from '@/store/Products/FetchTourIncludingApi';
import { useGetPolicyQuery } from '@/store/Products/FetchPolicyApi';
import Loading from '@/components/Loading/Loading';
import { ClientStorage } from '@/hooks/useLocalStroge';
import { useGetDetailsArQuery } from '@/store/Products/ProgramDetailsAR/FetchDetailsARApi';
import { useGetIncludingArQuery } from '@/store/Products/ProgramDetailsAR/FetchTourIncludingArApi';
import { useGetPolicyArQuery } from '@/store/Products/FetchPolicyArApi';
import { useGetExcludingQuery } from '@/store/Products/FetchTourExcludingApi';
import { useGetExcludingArQuery } from '@/store/Products/ProgramDetailsAR/FetchTourExcludingArApi';

interface Props {
    code: string;
    programyear: string;
    languagecode: string;
}
const Index: NextPage<Props> = () => {
    const language = ClientStorage.get('language') || 'en';

    useEffect(() => {
        document.body.dir = language === 'ar' ? 'rtl' : 'ltr';
    }, [language]);

    const { t } = useTranslation();
    const router = useRouter();
    // const { code, programyear, languagecode } = router.query;

    // fetch details
    const getQueryParam = (param: string | string[] | undefined): string => {
        if (Array.isArray(param)) return param[0] || '';
        return param || '';
    };

    const code = getQueryParam(router.query.code);
    const programyear = getQueryParam(router.query.programyear);
    const languagecode = getQueryParam(router.query.languagecode);

    // Now these are guaranteed to be strings
    const queryParams = code && programyear ? { code, programyear, languagecode } : undefined;
    const { data, error, isLoading } = useGetDetailsQuery(queryParams, { skip: language !== 'en' });

    const {
        data: DataAr,
        error: dataErrorAr,
        isLoading: isLoadingDataAr,
    } = useGetDetailsArQuery(queryParams, { skip: language !== 'ar' });
    const queryParamsInlude = code && programyear ? { code, programyear } : undefined;

    // fetch tour including
    const { data: includingData, error: includingError } = useGetIncludingQuery(queryParamsInlude, {
        skip: language !== 'en',
    });

    const { data: includingDataAr, error: includingErrorAr } = useGetIncludingArQuery(
        queryParamsInlude,
        {
            skip: language !== 'ar',
        }
    );

    const including = language === 'ar' ? includingDataAr?.items || [] : includingData?.items || [];

    // fetch tour Excluding
    const { data: ExcludingData, error: ExcludingError } = useGetExcludingQuery(queryParamsInlude, {
        skip: language !== 'en' || !queryParamsInlude,
    });

    const { data: ExcludingDataAr, error: ExcludingErrorAr } = useGetExcludingArQuery(
        queryParamsInlude,
        {
            skip: language !== 'ar' || !queryParamsInlude,
        }
    );
    const excluding = language === 'ar' ? ExcludingDataAr?.items || [] : ExcludingData?.items || [];

    // fetch tour policy
    const { data: policyData, error: policyError } = useGetPolicyQuery(
        {
            code,
            programyear,
        },
        { skip: language !== 'en' }
    );
    const { data: policyArData, error: policyArError } = useGetPolicyArQuery(
        {
            code,
            programyear,
        },
        { skip: language !== 'ar' }
    );
    const policy = language === 'ar' ? policyArData?.items || [] : policyData?.items || [];

    if (isLoading || isLoadingDataAr) {
        return <Loading />;
    }

    if (
        (!data || !data.items || data.items.length === 0) &&
        (!DataAr || !DataAr.items || DataAr.items.length === 0)
    ) {
        return (
            <Typography variant="h6" sx={{ padding: '10px', textAlign: 'center' }}>
                {t('No Trips Details Found')}
            </Typography>
        );
    }
    const productData = language === 'ar' ? DataAr?.items?.[0] : data?.items?.[0];

    if (!productData) {
        return (
            <Typography variant="h6" sx={{ padding: '10px', textAlign: 'center' }}>
                {t('Loading product details...')}
            </Typography>
        );
    }

    return (
        <div>
            <Head>
                <title>{t('Product Details')}</title>
                <meta name="description" content="Product Details" />
            </Head>
            {isLoading && <Loading />}
            <Box>
                <Container maxWidth="lg" sx={{ mt: 3 }}>
                    {productData ? (
                        <>
                            <TitleAndRating title={productData.ProgramName} />
                            <WatchVideoAndMap code={code} programyear={programyear} />
                            <Tags tags={t(productData.ClassTrip)} />
                            <LocationAndPriceAndTime
                                time={`${productData.day} ${t('days')}`}
                                location={productData.City}
                                price={productData.StartPrice || t('Price Not Available')}
                            />
                        </>
                    ) : (
                        <Typography variant="h6" sx={{ padding: '10px', textAlign: 'center' }}>
                            {t('Loading product details...')}
                        </Typography>
                    )}

                    <Grid container spacing={3}>
                        <Grid item xs={4}>
                            <Accordion
                                data={[
                                    {
                                        title: 'Tour Including',
                                        des: (
                                            <Typography component="span">
                                                {including[0]?.TourIncludin ||
                                                    t('No Tour Including available.')}
                                            </Typography>
                                        ),
                                    },
                                    {
                                        title: 'Tour Excluding',
                                        des: (
                                            <Typography component="span">
                                                {excluding[0]?.TOUREXCLUDING ||
                                                    t('No Tour Excluding available.')}
                                            </Typography>
                                        ),
                                    },
                                    {
                                        title: 'Cancellation policy',
                                        des: (
                                            <Typography component="span">
                                                {policy[0]?.policy ||
                                                    t('No Tour policy available.')}
                                            </Typography>
                                        ),
                                    },
                                ]}
                            />
                        </Grid>
                        <Grid item xs={7}>
                            <DetailsTabs id={`${code}`} productData={productData} />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </div>
    );
};

export default Index;
