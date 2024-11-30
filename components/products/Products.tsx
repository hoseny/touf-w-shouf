import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/system';
import { useRouter } from 'next/router';
import { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import Price from './Price';
import ProductRating from './ProductRating';
import WishlistButton from './WishlistButton';

import type { Product } from '@/data/products';

const Products: FunctionComponent<Product & { updatedLanguageCode: number }> = ({
    prog_Code,
    progName,
    Rate_Review,
    StartPrice,
    IMG_Path,
    prog_year,
    offerPrice,
    rating,
    updatedLanguageCode, 
}) => {
    const { t } = useTranslation();
    const router = useRouter();

    const productData = {
        prog_Code,
        progName,
        Rate_Review,
        StartPrice,
        IMG_Path,
        prog_year,
        offerPrice,
        rating,
        languagecode: updatedLanguageCode, 
    };

    return (
        <Grid item container xs={3}>
            <Card
                sx={{
                    position: 'relative',
                    height: '350px',
                    width: '100%',
                    boxShadow: 'unset',
                }}
            >
                <CardMedia component="img" height="60%" image={IMG_Path} alt="main Image" />
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
                                `/productDetails/${prog_Code}/${prog_year}/${updatedLanguageCode}`
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
                    ></Link>

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
                        <Price price={StartPrice ?? 0} offerPrice={offerPrice ?? 0} />
                        <WishlistButton id={prog_Code} productData={productData} />
                    </Stack>

                    <Typography gutterBottom variant="subtitle1" component="div">
                        {t(progName)}
                    </Typography>

                    <ProductRating rating={Rate_Review} readOnly />
                </CardContent>
            </Card>
        </Grid>
    );
};

export default Products;

