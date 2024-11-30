import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import { useRouter } from 'next/router';
import Loading from '@/components/Loading/Loading';
import { ToastContainer } from 'react-toastify';
import { useGetPackageArQuery } from '@/store/Products/FetchPackagesArApi';
import { useGetPackageEnQuery } from '@/store/Products/FetchPackagesEnApi';
import { ClientStorage } from '@/hooks/useLocalStroge';
import Price from '@/components/products/Price';
import WishlistButton from '@/components/products/WishlistButton';
import ProductRating from '@/components/products/ProductRating';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@/hooks/useStore';
import { getLanguage } from '@/store/languageSlice';

const PackagesDisplay: React.FC = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const language = useAppSelector(getLanguage);
    const [packages, setPackages] = useState<any[]>([]);

    const {
        data: packageDataEn,
        isLoading: isPackageLoadingEn,
        error: packageErrorEn,
    } = useGetPackageEnQuery(undefined, { skip: language !== 'en' });
    const {
        data: packageDataAr,
        isLoading: isPackageLoadingAr,
        error: packageErrorAr,
    } = useGetPackageArQuery(undefined, { skip: language !== 'ar' });

    useEffect(() => {
        if (language === 'ar') {
            setPackages(packageDataAr?.Packages || []);
        } else {
            setPackages(packageDataEn?.packages || []);
        }
    }, [language, packageDataEn, packageDataAr]);

    const isLoading = isPackageLoadingEn || isPackageLoadingAr;

    const hasError = packageErrorEn || packageErrorAr;

    const hasData = packages && packages.length > 0;

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
                {(isPackageLoadingEn || isPackageLoadingAr) && <Loading />}
                <h2 className="my-4 fw-bold">{t('All Trips')}</h2>
                {packages.map(pkg => (
                    <div key={pkg.prog_Code} className="col-md-4">
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
                                    image={pkg.IMG_Path}
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
                                                `/productDetails/${pkg.prog_Code}/${
                                                    pkg.prog_year
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
                                            price={pkg.StartPrice ?? 0}
                                            offerPrice={pkg.offerPrice ?? 0}
                                        />
                                        <WishlistButton id={pkg.prog_Code} productData={pkg} />
                                    </Stack>

                                    <Typography gutterBottom variant="subtitle1" component="div">
                                        {pkg.progName}
                                    </Typography>

                                    <ProductRating rating={pkg.Rate_Review} readOnly />
                                </CardContent>
                            </Card>
                        </Grid>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PackagesDisplay;
