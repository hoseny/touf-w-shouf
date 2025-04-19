import BackgroundImage from '@/components/ui/BackgroundImage';
import Typography from '@mui/material/Typography';
import Head from 'next/head';
import React from 'react';
import bgSearch from '@/assets/images/search.jpg';
import { useTranslation } from 'react-i18next';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';

const Suggestion = () => {
    const { t } = useTranslation();
    const router = useRouter();

    return (
        <div>
            <Head>
                <title> {t('Read Terms and conditions')} </title>
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

            <Container maxWidth="md">
                <Grid
                    container
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        paddingTop: '50px',
                        paddingBottom: '50px',
                    }}
                >
                    <h3 style={{ lineHeight: '1.8' }}>
                        {t(
                            'By using our hotel booking services, you agree to provide accurate information, adhere to the hotel’s booking and cancellation policies, take full responsibility for any additional fees or damages, and acknowledge that the site is not liable for any losses or changes due to unforeseen circumstances'
                        )}
                    </h3>

                    <Button
                        className="mt-5"
                        variant="contained"
                        size="large"
                        onClick={() => router.back()}
                    >
                        {t('back to booking')}
                    </Button>
                </Grid>
            </Container>
        </div>
    );
};

export default Suggestion;
