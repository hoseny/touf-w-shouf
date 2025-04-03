import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import React, { FunctionComponent, useEffect, useState } from 'react';
import WishlistButton from '@/components/products/WishlistButton';
import Price from '@/components/products/Price';
import ProductRating from '@/components/products/ProductRating';
import { useRouter } from 'next/router';
import Loading from '@/components/Loading/Loading';
import { Product } from '@/data/products';
import { ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useGetDayUseEnQuery } from '@/store/Products/FetchDayUseEnApi';
import { useAppSelector } from '@/hooks/useStore';
import { getLanguage } from '@/store/languageSlice';
import { useGetDayUseArQuery } from '@/store/Products/FetchDayUseArApi';
interface Props {
    myBooking?: boolean;
    productData: Product;
}
const DayUseDisplay: FunctionComponent<Product> = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const language = useAppSelector(getLanguage);
    const [dayUse, setDayUse] = useState<any[]>([]);

    const {
        data: dayUseDataEn,
        isLoading: isDayUseLoadingEn,
        error: dayUseErrorEn,
    } = useGetDayUseEnQuery(undefined, { skip: language !== 'en' });

    const {
        data: dayUseDataAr,
        isLoading: isDayUseLoadingAr,
        error: DayUseErrorAr,
    } = useGetDayUseArQuery(undefined, { skip: language !== 'ar' });

    useEffect(() => {
        if (language === 'ar') {
            setDayUse(dayUseDataAr?.DayUse || []);
        } else {
            setDayUse(dayUseDataEn?.DayUse || []);
        }
    }, [language, dayUseDataEn, dayUseDataAr]);

    const isLoading = isDayUseLoadingEn || isDayUseLoadingAr;

    const hasError = dayUseErrorEn || DayUseErrorAr;

    const hasData = dayUse.length > 0;

    if (isLoading) {
        return <Loading />;
    }

    if (hasError || !hasData) {
        return (
            <Typography variant="h6" color="error" className="text-center">
                {t('Error Downloading Data')}
            </Typography>
        );
    }

    return (
        <div className="container">
            <div className="row">
                <ToastContainer />
                {isLoading && <Loading />}
                <h2 className="my-4 fw-bold">{t('All Trips')}</h2>
                {dayUse.map(product => (
                    <div key={product.prog_Code} className="col-md-4">
                        <Grid>
                            <Card
                                sx={{
                                    position: 'relative',
                                    height: '350px',
                                    width: '100%',
                                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.171)',
                                    marginBottom: '30px',
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    height="60%"
                                    image={product.IMG_Path}
                                    alt="main Image"
                                />
                                <CardContent
                                    sx={{
                                        py: '16px !important',
                                        border: '1px solid #C7C7C7',
                                        borderRadius: '0 0 5px 5px',
                                    }}
                                >
                                    <Link
                                        onClick={() =>
                                            router.push(
                                                `/productDetails/${product.prog_Code}/${
                                                    product.prog_year
                                                }/${1}`
                                            )
                                        }
                                        sx={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            zIndex: '2',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        {' '}
                                    </Link>
                                    <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems={'center'}
                                        sx={{
                                            position: 'absolute',
                                            top: 0,
                                            zIndex: 100,
                                            left: 0,
                                            right: 0,
                                        }}
                                    >
                                        <Price
                                            price={product.StartPrice ?? 0}
                                            offerPrice={product.offerPrice ?? 0}
                                        />
                                        <WishlistButton
                                            id={product.prog_Code}
                                            productData={product}
                                        />
                                    </Stack>

                                    <Typography gutterBottom variant="subtitle1" component="div">
                                        {product.progName}
                                    </Typography>

                                    <ProductRating rating={product.Rate_Review} readOnly />
                                </CardContent>
                            </Card>
                        </Grid>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DayUseDisplay;
