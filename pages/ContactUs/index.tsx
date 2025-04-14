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
                <title>{t('Contact Us')}</title>
            </Head>
            <BackgroundImage imageSrc={bgSearch.src}>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    sx={{ height: '100%' }}
                >
                    <Typography variant="h1" textAlign={'center'} sx={{ color: 'body.light' }}>
                        {t('Contact Us')}
                    </Typography>
                </Stack>
            </BackgroundImage>

            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Stack spacing={3}>
                            <Typography variant="h2" sx={{ color: '#E07026' }} fontWeight="bold">
                                {t('Have Questions? Contact Us')}
                            </Typography>

                            <div>
                                <Typography variant="subtitle1" component="label" htmlFor="name">
                                    {t('Your Name')}
                                </Typography>
                                <TextField
                                    id="name"
                                    fullWidth
                                    variant="outlined"
                                    placeholder={t('Enter your Name')}
                                    sx={{ mt: 1 }}
                                />
                            </div>

                            <div>
                                <Typography variant="subtitle1" component="label" htmlFor="email">
                                    {t('Your Email')}
                                </Typography>
                                <TextField
                                    id="email"
                                    fullWidth
                                    variant="outlined"
                                    placeholder={t('Enter your Email')}
                                    sx={{ mt: 1 }}
                                />
                            </div>

                            <div>
                                <Typography variant="subtitle1" component="label" htmlFor="phone">
                                    {t('Your Phone')}
                                </Typography>
                                <TextField
                                    id="phone"
                                    fullWidth
                                    variant="outlined"
                                    placeholder={t('Enter your Phone')}
                                    sx={{ mt: 1 }}
                                />
                            </div>

                            <div>
                                <Typography variant="subtitle1" component="label" htmlFor="message">
                                    {t('Your Message')}
                                </Typography>
                                <TextField
                                    id="message"
                                    fullWidth
                                    variant="outlined"
                                    placeholder={t('Enter your Message')}
                                    multiline
                                    rows={4}
                                    sx={{ mt: 1 }}
                                />
                            </div>

                            <Button
                                variant="contained"
                                size="large"
                                sx={{ py: 2, mt: 2 }}
                                type="submit"
                                fullWidth
                            >
                                {t('Send')}
                            </Button>
                        </Stack>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Stack spacing={3}>
                            <div className="d-flex justify-content-between align-items-center flex-lg-row flex-column mb-4">
                                <Typography variant="h2" sx={{ color: '#E07026' }}>
                                    HotLine:
                                </Typography>
                                <a href="tel:19341">
                                    <Typography variant="h2" sx={{ color: '#E07026' }}>
                                        19341
                                    </Typography>
                                </a>
                            </div>
                            <div style={{ width: '100%', height: '450px' }}>
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3452.7655260969964!2d31.28360787428792!3d30.072254817254866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583fbd53054749%3A0x8540e1f9be36937!2z2KjYsdisINmF2LXYsSDZhNmE2LPZitin2K3YqQ!5e0!3m2!1sen!2seg!4v1744644898229!5m2!1sen!2seg"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default ContactUs;
