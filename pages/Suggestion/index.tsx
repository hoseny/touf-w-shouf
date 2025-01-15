import BackgroundImage from '@/components/ui/BackgroundImage';
import Typography from '@mui/material/Typography';
import Head from 'next/head';
import React from 'react';
import bgSearch from '@/assets/images/search.jpg';
import { useTranslation } from 'react-i18next';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Image from 'next/image';
import logo from '@/assets/images/misr-tour.jpg';

const Suggestion = () => {
    const { t } = useTranslation();

    return (
        <div>
            <Head>
                <title> {t('Complaint and Suggestion')} </title>
            </Head>
            <BackgroundImage imageSrc={bgSearch}>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    sx={{ height: '100%' }}
                >
                    <Typography variant="h1" textAlign={'center'} sx={{ color: 'body.light' }}>
                        {t('Complaint and Suggestion')}
                    </Typography>
                </Stack>
            </BackgroundImage>

            <Container maxWidth="lg">
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
                    <Grid item xs={12} md={5}>
                        <label htmlFor="message">
                            <Typography variant="subtitle1">{t('Your Message')}</Typography>
                        </label>
                        <TextField
                            id="message"
                            fullWidth
                            variant="outlined"
                            placeholder={t('Enter your Message')}
                            multiline
                            rows={4}
                            sx={{ mt: 1 }}
                        />
                        <Stack spacing={2} sx={{ mt: 3 }}>
                            <Button
                                variant="contained"
                                size="large"
                                sx={{ py: '13px' }}
                                type="submit"
                                fullWidth
                            >
                                {t('Send')}
                            </Button>
                        </Stack>
                    </Grid>
                    {/* <Grid xs={1}></Grid>
                    <Grid
                        item
                        xs={6}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
                            paddingTop: '50px',
                        }}
                    >
                        <Image
                            src={logo}
                            placeholder="blur"
                            layout="intrinsic"
                            objectFit="contain"
                            alt="visa"
                        />
                    </Grid> */}
                </Grid>
            </Container>
        </div>
    );
};

export default Suggestion;
