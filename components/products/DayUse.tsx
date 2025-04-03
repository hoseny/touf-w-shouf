import React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import Products from './Products';
import { useRouter } from 'next/router';
import Loading from '../Loading/Loading';
import { useGetDayUseArQuery } from '@/store/Products/FetchDayUseArApi';
import { Col, Container, Row } from 'react-bootstrap';
import { ClientStorage } from '@/hooks/useLocalStroge';
import { useGetDayUseEnQuery } from '@/store/Products/FetchDayUseEnApi';

interface Props {
    title: string;
    offers?: boolean;
}

const DayUse: FunctionComponent<Props> = ({ title }) => {
    const { t } = useTranslation();
    const language = ClientStorage.get('language') || 'en';
    const Router = useRouter();

    const {
        data: dayUseDataEn,
        error: dayUseErrorEn,
        isLoading: isdayUseLoadingEn,
    } = useGetDayUseEnQuery(undefined, { skip: language !== 'en' });

    const {
        data: dayUseDataAr,
        error: dayUseErrorAr,
        isLoading: isdayUseLoadingAr,
    } = useGetDayUseArQuery(undefined, { skip: language !== 'ar' });

    if (dayUseErrorAr && dayUseErrorEn) {
        return (
            <Typography variant="body1" sx={{ textAlign: 'center', color: 'red' }}>
                {t('Failed to load Day Use')}
            </Typography>
        );
    }

    if (isdayUseLoadingAr || isdayUseLoadingEn) {
        return <Loading />;
    }

    const handleMoreDetails = () => {
        Router.push('/DayUseDisplay');
    };

    const AlldayUse = language === 'ar' ? dayUseDataAr?.DayUse : dayUseDataEn?.DayUse;

    if (!AlldayUse) {
        return null; 
    }

    return (
        <Container className="my-5">
            <Typography variant="h2" sx={{ textAlign: 'center', mb: 3 }}>
                {title}
            </Typography>
            {AlldayUse.length === 0 ? (
                <Typography variant="body1" sx={{ textAlign: 'center', color: 'red' }}>
                    {t('No trips found')}
                </Typography>
            ) : (
                <Row className="justify-content-center">
                    {AlldayUse.slice(1, 4).map(product => (
                        <Col key={product.prog_Code} xs={12} sm={6} lg={4} className="mb-4">
                            <div
                                className="reservation-card d-flex flex-column"
                                style={{ border: 'none' }}
                            >
                                <Products
                                    prog_Code={product.prog_Code}
                                    prog_year={product.prog_year}
                                    progName={product.progName}
                                    rating={product.Rate_Review}
                                    StartPrice={product.StartPrice}
                                    IMG_Path={product.IMG_Path}
                                    Rate_Review={product.Rate_Review}
                                    languagecode={product.languagecode}
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

export default DayUse;
