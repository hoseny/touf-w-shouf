import React, { useEffect } from 'react';
import { removeFromWishlist, setWishlist } from '@/store/wishlistSlice';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast, ToastContainer } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '@/hooks/useStore';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import ProductRating from '@/components/products/ProductRating';
import Box from '@mui/material/Box';
import Link from 'next/link';
import Button from '@mui/material/Button';
import Head from 'next/head';
import BackgroundImage from '@/components/ui/BackgroundImage';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import bgSearch from '@/assets/images/search.jpg';
import { useTranslation } from 'react-i18next';
import { ClientStorage } from '@/hooks/useLocalStroge';
import defaultImage from '@/assets/images/banner1.jpg';

const Wishlist = () => {
    const wishlistItems = useAppSelector(state => state.wishlist.items);
    const dispatch = useAppDispatch();
    const { t } = useTranslation();

    const handleRemoveFromWishlist = (prog_Code: number) => {
        dispatch(removeFromWishlist(prog_Code));
        toast.error(t('removed successfully') as string);
    };

    useEffect(() => {
        const storedItems = JSON.parse(localStorage.getItem('wishlistItems') || '[]');
        const normalizedItems = storedItems.map((item: any) => {
            return {
                prog_Code: item.prog_Code || item.PROGCODE,
                progName: item.progName || item.ProgramName,
                Rate_Review: item.Rate_Review || 'No Review',
                StartPrice: item.StartPrice || 0,
                IMG_Path: item.IMG_Path || defaultImage.src,
                prog_year: item.prog_year || item.ProgramYear || new Date().getFullYear(),
                languagecode: item.languagecode || (item.language === 'Arabic' ? 2 : 1),
            };
        });
        dispatch(setWishlist(normalizedItems));
    }, [dispatch]);

    const totalPrice = wishlistItems.reduce((total, item) => total + (item.StartPrice || 0), 0);
    const language = ClientStorage.get('language') || 'en';

    return (
        <div>
            <Head>
                <title>{t('My WishList')}</title>
            </Head>
            <ToastContainer />
            <BackgroundImage imageSrc={bgSearch}>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    sx={{ height: '100%' }}
                >
                    <Typography variant="h1" sx={{ color: 'body.light' }}>
                        {t('My WishList')}
                    </Typography>
                </Stack>
            </BackgroundImage>
            <Container maxWidth="lg">
                <Grid container spacing={3} justifyContent="center" sx={{ p: 2 }}>
                    {wishlistItems.length === 0 ? (
                        <Grid item xs={12}>
                            <Typography variant="h6" sx={{ textAlign: 'center', py: 4 }}>
                                {t('Your wishlist is empty')}
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                                <Link href="/" passHref>
                                    <Button variant="contained" color="primary">
                                        {t('Go to Home')}
                                    </Button>
                                </Link>
                            </Box>
                        </Grid>
                    ) : (
                        <>
                            {wishlistItems.map(item => (
                                <Grid item xs={12} key={item.prog_Code}>
                                    <Card
                                        sx={{
                                            display: 'flex',
                                            flexDirection: { xs: 'column', md: 'row' },
                                            boxShadow: 3,
                                            borderRadius: 2,
                                            overflow: 'hidden',
                                        }}
                                    >
                                        <CardMedia
                                            component="img"
                                            height="240"
                                            image={item.IMG_Path || defaultImage.src}
                                            alt={item.progName}
                                            sx={{
                                                width: { xs: '100%', md: '300px' },
                                                objectFit: 'cover',
                                            }}
                                        />
                                        <CardContent
                                            sx={{
                                                flex: 1,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                p: 3,
                                            }}
                                        >
                                            <Box sx={{ flexGrow: 1 }}>
                                                <Typography variant="h6" gutterBottom>
                                                    {item.progName}
                                                </Typography>
                                                <Typography variant="body1" color="text.secondary">
                                                    {t('Price')}: $
                                                    {item.StartPrice?.toLocaleString()}
                                                </Typography>
                                                <Box sx={{ my: 1 }}>
                                                    <ProductRating
                                                        rating={item.Rate_Review || 'No Review'}
                                                        readOnly
                                                    />
                                                </Box>
                                            </Box>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    mt: 2,
                                                }}
                                            >
                                                <Link
                                                    href={`/productDetails/${item.prog_Code}/${
                                                        item.prog_year
                                                    }/${
                                                        item.languagecode ||
                                                        (language === 'ar' ? 2 : 1)
                                                    }`}
                                                    passHref
                                                >
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        size="large"
                                                    >
                                                        {t('More Details')}
                                                    </Button>
                                                </Link>
                                                <IconButton
                                                    onClick={e => {
                                                        e.stopPropagation();
                                                        handleRemoveFromWishlist(item.prog_Code);
                                                    }}
                                                    sx={{ color: 'error.main' }}
                                                >
                                                    <DeleteIcon fontSize="large" />
                                                </IconButton>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                            <Grid item xs={12}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        p: 3,
                                        bgcolor: 'background.paper',
                                        borderRadius: 2,
                                        boxShadow: 1,
                                    }}
                                >
                                    <Typography variant="h5" color="primary">
                                        {t('Total Price')}:
                                    </Typography>
                                    <Typography variant="h5" color="primary">
                                        {totalPrice.toLocaleString()} {t('EGP')}
                                    </Typography>
                                </Box>
                            </Grid>
                        </>
                    )}
                </Grid>
            </Container>
        </div>
    );
};

export default Wishlist;
