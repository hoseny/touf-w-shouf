import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import Products from './Products';
import { useRouter } from 'next/router';
import Loading from '../Loading/Loading';
import { useGetDayUseQuery } from '@/store/Products/FetchDayUseApi';
import { Col, Container, Row } from 'react-bootstrap';

interface Props {
    title: string;
    offers?: boolean;
}

const DayUse: FunctionComponent<Props> = ({ title }) => {
    const { t } = useTranslation();
    const { data, error, isLoading } = useGetDayUseQuery();
    const Router = useRouter();

    if (error) {
        return (
            <Typography variant="body1" sx={{ textAlign: 'center', color: 'red' }}>
                {t('Failed to load Day Use')}
            </Typography>
        );
    }

    if (isLoading) {
        return <Loading />;
    }

    const handleMoreDetails = () => {
        Router.push('/DayUseDisplay');
    };

    const products = data?.DayUse || [];

    return (
        <Container className="my-5">
            {isLoading && <Loading />}
            <Typography variant="h2" sx={{ textAlign: 'center', mb: 3 }}>
                {title}
            </Typography>
            {products.length === 0 ? (
                <Typography variant="body1" sx={{ textAlign: 'center', color: 'red' }}>
                    {t('No trips found')}
                </Typography>
            ) : (
                <Row className="justify-content-center">
                    {products.slice(1, 4).map(product => (
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
                                    updatedLanguageCode={2}
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
