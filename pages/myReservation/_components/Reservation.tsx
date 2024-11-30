import React, { FunctionComponent } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Image from 'next/image';
import Img from '@/assets/images/logo_en.webp';
import { useTranslation } from 'react-i18next';

interface Props {
    customerName: string;
    tripDate: string;
    reservationNo: number;
    PayMentStatus: string;
    totalPayment: string;
    Currany: string;
    ProgramName: string;
    IMG_Path: string;
    PROG_YEAR: number;
    priority?: boolean;
}

const ReservationItem: FunctionComponent<Props> = ({
    customerName,
    tripDate,
    reservationNo,
    PayMentStatus,
    totalPayment,
    Currany,
    PROG_YEAR,
    ProgramName,
    IMG_Path,
    priority = false,
}) => {
    const labelStyle = {
        color: '#E07026',
    };
    const { t } = useTranslation();

    return (
        <div style={{ height: '100%' }}>
            <div className="container" style={{ height: '100%' }}>
                <div className="row" style={{ height: '100%' }}>
                    <div className="col-md-12 card reservation-card p-3">
                        <div className="row" style={{ height: '100%' }}>
                            {/* الصورة */}
                            <div
                                className="col-12 col-lg-6"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <div
                                    className="reservation-img-box"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        position: 'relative',
                                    }}
                                >
                                    <Image
                                        src={IMG_Path}
                                        alt="banner"
                                        layout="fill"
                                        objectFit="cover"
                                        style={{ borderRadius: '10px' }}
                                    />
                                </div>
                            </div>

                            {/* المحتوى */}
                            <div className="col-12 col-lg-6 card-body">
                                <Typography variant="body1">
                                    <span style={labelStyle}>{t('Customer Name')} : </span>
                                    {customerName}
                                </Typography>
                                <Typography variant="body1">
                                    <span style={labelStyle}>{t('Program Name')} : </span>
                                    {ProgramName}
                                </Typography>
                                <Typography variant="body1">
                                    <span style={labelStyle}>{t('Program Year')} : </span>
                                    {PROG_YEAR}
                                </Typography>
                                <Typography variant="body1">
                                    <span style={labelStyle}>{t('Trip Date')} : </span>
                                    {new Date(tripDate).toLocaleDateString('en-GB')}
                                </Typography>
                                <Typography variant="body1">
                                    <span style={labelStyle}>{t('Reservation No')} : </span>
                                    {reservationNo}
                                </Typography>
                                <Typography variant="body1">
                                    <span style={labelStyle}>{t('Total Price')} : </span>
                                    {totalPayment} {Currany}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    color={PayMentStatus === 'Unpaid' ? 'error' : 'success'}
                                >
                                    <span style={labelStyle}>{t('Payment Status')} : </span>
                                    {t(PayMentStatus)}
                                </Typography>

                                <Stack
                                    direction="row"
                                    spacing={2}
                                    className="mt-3 d-flex flex-wrap"
                                >
                                    <Button
                                        className="m-1"
                                        size="small"
                                        variant="contained"
                                        color="primary"
                                    >
                                        {t('Edit')}
                                    </Button>

                                    <Button
                                        className="m-1"
                                        size="small"
                                        variant="contained"
                                        color="secondary"
                                    >
                                        {t('Print')}
                                    </Button>

                                    <Button
                                        className="m-1"
                                        size="small"
                                        variant="outlined"
                                        color="error"
                                    >
                                        {t('Cancel')}
                                    </Button>
                                </Stack>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReservationItem;
