import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { NextPage } from 'next';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import BackgroundImage from '@/components/ui/BackgroundImage';
import bgSearch from '@/assets/images/search.jpg';
import BasicTabs from './_components/ReservationTabs';

interface Props {}

const Index: NextPage<Props> = () => {
    const { t } = useTranslation();

    return (
        <div>
            <Head>
                <title> {t('My Reservation')} </title>
            </Head>
            <BackgroundImage imageSrc={bgSearch}>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    sx={{ height: '100%' }}
                >
                    <Typography variant="h1" sx={{ color: 'body.light' }}>
                        {t('My Reservation list')}
                    </Typography>
                </Stack>
            </BackgroundImage>
            <Container maxWidth="lg">
                <Grid container sx={{ my: 4 }}>
                    {/* <Grid
                        item
                        xs={12}
                        container
                        justifyContent="start"
                        alignItems="center"
                        sx={{ mb: 3 }}
                    >
                        <Grid item md={2}>
                            <Button variant="contained" fullWidth size="large" className="px-1">
                                <Typography
                                    sx={{
                                        fontSize: 14,
                                        paddingTop: 1,
                                        paddingBottom: 1,
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {t('All Unpaid Reservations')}
                                </Typography>
                            </Button>
                        </Grid>
                        <Grid item md={2}>
                            <Button
                                variant="text"
                                fullWidth
                                size="large"
                                className="px-1"
                                sx={{ color: 'body.main' }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: 14,
                                        paddingTop: 1,
                                        paddingBottom: 1,
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {t('All Paid Reservations')}
                                </Typography>
                            </Button>
                        </Grid>
                    </Grid> */}

                    <BasicTabs />

                    {/* <Grid container spacing={2}>
                        {reservations.map((reservation: Reservation) => (
                            <Grid item xs={12} sm={6} key={reservation.ReservationNo}>
                                <ReservationItem
                                    customerName={reservation.CustomerName}
                                    tripDate={reservation.DateTrip}
                                    reservationNo={reservation.ReservationNo}
                                    paymentStatus={reservation.TotalPayMent}
                                    PROG_YEAR={reservation.PROG_YEAR}
                                    ProgramName={reservation.ProgramName}
                                    totalPayment={
                                        reservation.TotalPayMent === 'Paid' ? 'Paid' : 'Unpaid'
                                    }
                                />
                            </Grid>
                        ))}
                    </Grid> */}
                </Grid>
                {/* <Grid container spacing={4} direction="column">
                    <Grid item xs={12}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="h3">{t('Total')}</Typography>
                            <Typography variant="h3">{t('2250 EGP')}</Typography>
                        </Stack>
                    </Grid>
                </Grid> */}
            </Container>
        </div>
    );
};

export default Index;
