import BackgroundImage from '@/components/ui/BackgroundImage';
import Typography from '@mui/material/Typography';
import Head from 'next/head';
import React, { useEffect } from 'react';
import bgSearch from '@/assets/images/search.jpg';
import { useTranslation } from 'react-i18next';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import { ClientStorage } from '@/hooks/useLocalStroge';
import { useGetPublicPolicyQuery } from '@/store/Products/FetchPublicPolicy';
import { useGetPublicPolicyArQuery } from '@/store/Products/FetchPublicPolicyAr';

const Suggestion = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const language = ClientStorage.get('language') || 'en';

    useEffect(() => {
        document.body.dir = language === 'ar' ? 'rtl' : 'ltr';
    }, [language]);

    const getValidatedParam = (param: string | string[] | undefined): string => {
        if (Array.isArray(param)) return param[0] || '';
        return param || '';
    };

    const code = getValidatedParam(router.query.code);
    const programyear = getValidatedParam(router.query.programyear);

    // fetch tour policy
    const {
        data: policyData,
        error: policyError,
        isLoading: isPolicyLoading,
    } = useGetPublicPolicyQuery(
        {
            code,
            programyear,
        },
        { skip: language !== 'en' }
    );
    const {
        data: policyArData,
        error: policyArError,
        isLoading: isPolicyArLoading,
    } = useGetPublicPolicyArQuery(
        {
            code,
            programyear,
        },
        { skip: language !== 'ar' }
    );
    const policy = language === 'ar' ? policyArData?.items || [] : policyData?.items || [];

    if (policyError || policyArError) {
        return (
            <Typography variant="body1" color="error">
                {t('Failed to load terms and conditions')}
            </Typography>
        );
    }

    if (isPolicyLoading || isPolicyArLoading) {
        return <Typography>{t('Loading...')}</Typography>;
    }

    return (
        <div>
            <Head>
                <title>{t('Read Terms and conditions')}</title>
            </Head>

            <BackgroundImage imageSrc={bgSearch}>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    sx={{ height: '100%' }}
                >
                    <Typography variant="h1" textAlign={'center'} sx={{ color: 'body.light' }}>
                        {t('Terms and conditions')}
                    </Typography>
                </Stack>
            </BackgroundImage>

            <Container maxWidth="md" sx={{ py: 6 }}>
                <Grid
                    container
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 4,
                    }}
                >
                    <Typography
                        component="div"
                        sx={{
                            lineHeight: 1.8,
                            whiteSpace: 'pre-line',
                            textAlign: language === 'ar' ? 'right' : 'left',
                        }}
                    >
                        {policy[0]?.policy || t('No Tour policy available.')}{' '}
                    </Typography>

                    <Button
                        variant="contained"
                        size="large"
                        onClick={() => router.back()}
                        sx={{ mt: 4 }}
                    >
                        {t('back to booking')}
                    </Button>
                </Grid>
            </Container>
        </div>
    );
};

export default Suggestion;
