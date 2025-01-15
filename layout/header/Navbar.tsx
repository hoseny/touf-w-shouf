import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import React, { FunctionComponent, useState } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import Logo from '@/assets/images/logo_en.webp';
import Misr from '@/assets/images/misr-tour.jpg';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Drawer from '@mui/material/Drawer';

interface Props {
    window?: () => Window;
}
interface PropsComponent {
    window?: () => Window;
    children: React.ReactElement;
}

const Navbar: FunctionComponent<Props> = props => {
    const { window } = props;

    const { t } = useTranslation();
    const router = useRouter();

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }
        setDrawerOpen(open);
    };

    return (
        <ElevationScroll {...props}>
            <>
                <AppBar
                    sx={{
                        top: trigger ? 0 : '49px',
                        backgroundColor: 'body.light',
                        color: 'body.main',
                    }}
                >
                    <Toolbar>
                        <Container maxWidth="lg">
                            <Grid
                                container
                                spacing={3}
                                alignItems="center"
                                justifyContent="space-between"
                                padding="10px"
                            >
                                <Grid item xs={5} sm={2} sx={{ textAlign: 'left' }}>
                                    <Box
                                        onClick={() => router.push('/')}
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        <Image
                                            src={Misr}
                                            alt="logo-left"
                                            priority
                                            layout="intrinsic"
                                        />
                                    </Box>
                                </Grid>

                                <Grid item xs={7} sm={8} sx={{ textAlign: 'right' }}>
                                    <Stack
                                        direction="row"
                                        spacing={4}
                                        sx={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            display: { xs: 'none', sm: 'flex' },
                                        }}
                                    >
                                        <Link href={'/'}>{t('Home')}</Link>
                                        <Link href={'/myReservation'}>{t('My Reservations')}</Link>
                                        <Link href={'/ContactUs'}>{t('Contact Us')}</Link>
                                        <Link href={'/Suggestion'}>
                                            {t('Complaint and Suggestion')}
                                        </Link>
                                        <Stack
                                            direction="row"
                                            alignItems="center"
                                            spacing={1.5}
                                            justifyContent="end"
                                        >
                                            <IconButton
                                                sx={{ color: 'body.main' }}
                                                onClick={() => router.push('/wishlist')}
                                            >
                                                <ShoppingBagIcon />
                                            </IconButton>
                                            {/* <SearchModal /> */}
                                        </Stack>
                                    </Stack>

                                    <IconButton
                                        sx={{
                                            display: { xs: 'inline-flex', sm: 'none' },
                                            color: 'body.main',
                                        }}
                                        onClick={toggleDrawer(true)}
                                    >
                                        <MenuIcon />
                                    </IconButton>
                                </Grid>

                                <Grid
                                    item
                                    xs={2}
                                    sm={2}
                                    sx={{
                                        textAlign: 'right',
                                        display: { xs: 'none', sm: 'block' },
                                    }}
                                >
                                    <Box
                                        onClick={() => router.push('/')}
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        <Image
                                            src={Logo}
                                            alt="logo-right"
                                            priority
                                            layout="intrinsic"
                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                        </Container>
                    </Toolbar>
                </AppBar>

                <Drawer
                    anchor="right"
                    open={drawerOpen}
                    onClose={toggleDrawer(false)}
                    sx={{
                        '& .MuiDrawer-paper': {
                            width: 250,
                            padding: 2,
                        },
                    }}
                >
                    <Box>
                        <IconButton
                            onClick={toggleDrawer(false)}
                            sx={{ color: 'body.main', mb: 2 }}
                        >
                            <CloseIcon />
                        </IconButton>

                        <Stack direction="column" spacing={2} sx={{ textAlign: 'left' }}>
                            <Box
                                onClick={() => {
                                    router.push('/');
                                    setDrawerOpen(false);
                                }}
                                sx={{ cursor: 'pointer' }}
                            >
                                {t('Home')}
                            </Box>

                            <Box
                                onClick={() => {
                                    router.push('/myReservation');
                                    setDrawerOpen(false);
                                }}
                                sx={{ cursor: 'pointer' }}
                            >
                                {t('My Reservations')}
                            </Box>

                            <Box
                                onClick={() => {
                                    router.push('/ContactUs');
                                    setDrawerOpen(false);
                                }}
                                sx={{ cursor: 'pointer' }}
                            >
                                {t('Contact Us')}
                            </Box>

                            <Box
                                onClick={() => {
                                    router.push('/Suggestion');
                                    setDrawerOpen(false);
                                }}
                                sx={{ cursor: 'pointer' }}
                            >
                                {t('Complaint and Suggestion')}
                            </Box>

                            <IconButton
                                sx={{
                                    color: 'body.main',
                                    alignSelf: 'flex-start',
                                }}
                                onClick={() => {
                                    router.push('/wishlist');
                                    setDrawerOpen(false);
                                }}
                            >
                                <ShoppingBagIcon />
                            </IconButton>
                        </Stack>
                    </Box>
                </Drawer>
            </>
        </ElevationScroll>
    );
};

export default Navbar;

function ElevationScroll(props: PropsComponent) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 1,
        top: trigger ? '0px' : 'top: 49px',
    });
}
