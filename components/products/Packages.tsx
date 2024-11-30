import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import Products from './Products';
import { useRouter } from 'next/router';
import Loading from '../Loading/Loading';
import { useGetPackageEnQuery } from '@/store/Products/FetchPackagesEnApi';
import { useGetPackageArQuery } from '@/store/Products/FetchPackagesArApi';
import { ClientStorage } from '@/hooks/useLocalStroge';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

interface Props {
    title: string;
    offers?: boolean;
}

const Packages: FunctionComponent<Props> = ({ title }) => {
    const { t } = useTranslation();
    const language = ClientStorage.get('language') || 'en';

    const {
        data: packageDataEn,
        error: packageErrorEn,
        isLoading: isPackageLoadingEn,
    } = useGetPackageEnQuery(undefined, { skip: language !== 'en' });

    const {
        data: packageDataAr,
        error: packageErrorAr,
        isLoading: isPackageLoadingAr,
    } = useGetPackageArQuery(undefined, { skip: language !== 'ar' });

    const Router = useRouter();

    if (packageErrorEn && packageErrorAr) {
        return <p className="text-center text-danger">{t('Failed to load packages')}</p>;
    }

    const handleMoreDetails = () => {
        Router.push('/PackagesDisplay');
    };

    if (isPackageLoadingEn || isPackageLoadingAr) {
        return <Loading />;
    }

    const packages = language === 'ar' ? packageDataAr?.Packages : packageDataEn?.packages;

    return (
        <Container className="my-5">
            {(isPackageLoadingEn || isPackageLoadingAr) && <Loading />}
            <Typography variant="h2" sx={{ textAlign: 'center', mb: 3 }}>
                {title}
            </Typography>
            {packages && packages.length === 0 ? (
                <p className="text-center text-danger">{t('No trips found')}</p>
            ) : (
                <Row className="justify-content-center ">
                    {packages?.slice(1, 4).map(packages => (
                        <Col key={packages.prog_Code} xs={12} sm={6} lg={4} className="mb-4">
                            <div
                                className="reservation-card d-flex flex-column"
                                style={{ border: 'none' }}
                            >
                                <Products
                                    prog_Code={packages.prog_Code}
                                    prog_year={packages.prog_year}
                                    progName={packages.progName}
                                    rating={packages.Rate_Review}
                                    StartPrice={packages.StartPrice}
                                    IMG_Path={packages.IMG_Path}
                                    Rate_Review={packages.Rate_Review}
                                    languagecode={packages.languagecode}
                                    updatedLanguageCode={1}
                                    offerPrice={0}
                                />
                            </div>
                        </Col>
                    ))}
                </Row>
            )}
            <Grid container item xs={12} justifyContent="center" sx={{ mt: 4 }}>
                <Grid item xs={3}>
                    <Button onClick={handleMoreDetails} variant="contained" size="large" fullWidth>
                        {t('See all')}
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Packages;
