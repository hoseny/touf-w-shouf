import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { NextPage } from 'next';
import { useTranslation } from 'react-i18next';
import bg from '@/assets/images/bgAuth.jpg';

const bgStyle = {
    height: '100%',
    width: '100%',
    backgroundImage: `url('${bg.src}')`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    py: 5.4,
};

interface Props {
    children: React.ReactElement;
}

const Index: NextPage<Props> = ({ children }) => {
    const { t } = useTranslation();

    return (
        <Box sx={bgStyle}>
            <Container maxWidth="lg" sx={{ height: '100%' }}>
                <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={6}
                    sx={{
                        height: '100%',
                        mt: 'unset',
                        flexDirection: { xs: 'column', sm: 'column', md: 'row' },
                    }}
                >
                    <Grid
                        item
                        xs={12}
                        md={6.5}
                        sx={{
                            color: 'body.light',
                            textAlign: { xs: 'center', md: 'left' },
                            mb: { xs: 4, sm: 4, md: 0 },
                        }}
                    >
                        <Typography variant="h2">
                            {t('Creating an account is great for you!')}
                        </Typography>
                        <Typography variant="h4" sx={{ mt: 2, fontWeight: 500 }}>
                            {t(
                                'Get access to exclusive deals, save travellers’ details for quicker bookings and manage your upcoming bookings with ease!'
                            )}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={5}>
                        {children}
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Index;
