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

const ContactUs = () => {
    const { t } = useTranslation();

    return (
        <div>
            <Head>
                <title> {t('Contact Us')} </title>
            </Head>
            <BackgroundImage imageSrc={bgSearch}>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    sx={{ height: '100%' }}
                >
                    <Typography variant="h1" sx={{ color: 'body.light' }}>
                        {t('Contact Us')}
                    </Typography>
                </Stack>
            </BackgroundImage>

            <Container maxWidth="lg">
                <Grid container>
                    <Grid item xs={7} className="mb-3 mt-5 m-auto">
                        <label htmlFor="name">
                            <Typography variant="subtitle1">{t('Your Name')}</Typography>
                        </label>
                        <TextField
                            id="name"
                            fullWidth
                            variant="outlined"
                            placeholder={t('Enter your Name')}
                            multiline
                            sx={{ mt: 1 }}
                        />
                    </Grid>

                    <Grid item xs={7} className="mb-3 m-auto">
                        <label htmlFor="email">
                            <Typography variant="subtitle1">{t('Your Email')}</Typography>
                        </label>
                        <TextField
                            id="email"
                            fullWidth
                            variant="outlined"
                            placeholder={t('Enter your Email')}
                            multiline
                            sx={{ mt: 1 }}
                        />
                    </Grid>

                    <Grid item xs={7} className="mb-3 m-auto">
                        <label htmlFor="Phone">
                            <Typography variant="subtitle1">{t('Your Phone')}</Typography>
                        </label>
                        <TextField
                            id="Phone"
                            fullWidth
                            variant="outlined"
                            placeholder={t('Enter your Phone')}
                            multiline
                            sx={{ mt: 1 }}
                        />
                    </Grid>

                    <Grid item xs={7} className="mb-3 m-auto">
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
                </Grid>
            </Container>
        </div>
    );
};

export default ContactUs;
