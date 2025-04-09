import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import React, { FunctionComponent, useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import Logo from '@/assets/images/logo_en.webp';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Drawer from '@mui/material/Drawer';
import { useGetLogoQuery } from '@/store/Home/LogoSlice';
import { ClientStorage } from '@/hooks/useLocalStroge';
import Loading from '@/components/Loading/Loading';

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
    const language = ClientStorage.get('language') || 'en';

    useEffect(() => {
        document.body.dir = language === 'ar' ? 'rtl' : 'ltr';
    }, [language]);

    const { code, programyear, languagecode } = router.query;

    const queryParamsInlude = code && programyear ? { code, programyear } : undefined;

    const { data, isLoading, isError } = useGetLogoQuery(queryParamsInlude, {
        skip: language !== 'en',
    });

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true); 
    }, []);

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: isMounted && window ? window() : undefined, 
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

    if (!isMounted) {
        return null; 
    }

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <div>Error loading logo</div>;
    }

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
                                            src={data?.Logo?.[0]?.Logo_PATH || Logo.src} 
                                            alt="logo-left"
                                            priority
                                            width={150}
                                            height={50}
                                            onError={e => {
                                                e.currentTarget.src = Logo.src; 
                                            }}
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
                                        <Link href={'/wishlist'}>
                                            {t('My WishList')}
                                        </Link>
                                        {/* <Stack
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
                                        </Stack> */}
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
                                            width={150}
                                            height={50}
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
