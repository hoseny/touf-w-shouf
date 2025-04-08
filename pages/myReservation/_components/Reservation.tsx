import React, { FunctionComponent, useRef } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Image from 'next/image';
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
    const printRef = useRef<HTMLDivElement>(null);

    const handlePrintWindow = () => {
        const content = `
        <html>
        <head>
            <title>Invoice</title>
            <style>
            body { 
                font-family: Arial, sans-serif; 
                padding: 20px; 
                margin: 0;
                background-color: #fff;
            }
            h2 { color: #E07026; }
            .label { font-weight: bold; color:#E07026; }
            .container { width: 100%; }
            .row { display: flex; flex-wrap: wrap; }
            .col-12 { width: 100%; }
            .col-lg-6 { width: 50%; padding: 10px; }
            .reservation-img-box { width: 100%; height: auto; }
            @media print {
                body { padding: 10px; font-size: 14px; }
                .col-lg-6 {
                    width: 100%; /* عرض الصورة بشكل كامل على الهواتف */
                    padding: 0;
                }
                .reservation-img-box img {
                    width: 100%;
                    height: auto;
                    border-radius: 10px;
                }
                .row {
                    display: block; /* ترتيب العمود في الصفوف على الهواتف */
                }
                .container {
                    width: 100%;
                }
                /* إخفاء الأزرار في الطباعة */
                button {
                    display: none;
                }
            }
            </style>
        </head>
        <body>
            <h2>Invoice No: ${reservationNo}</h2>
            <p><span class="label">Customer Name:</span> ${customerName}</p>
            <p><span class="label">Program Name:</span> ${ProgramName}</p>
            <p><span class="label">Trip Date:</span> ${tripDate}</p>
            <p><span class="label">Payment Status:</span> ${PayMentStatus}</p>
            <p><span class="label">Total Payment:</span> ${totalPayment} ${Currany}</p>
            <p><span class="label">Program Year:</span> ${PROG_YEAR}</p>
            <script>
            window.onload = function () {
                window.print();
            }
            </script>
        </body>
        </html>
        `;

        const printWindow = window.open('', '_blank', 'width=800,height=600');
        if (printWindow) {
            printWindow.document.open();
            printWindow.document.write(content);
            printWindow.document.close();
        }
    };

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
                            <div ref={printRef} className="col-12 col-lg-6 card-body">
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
                                    <span style={labelStyle}>{t('Status')} : </span>
                                    {t(
                                        PayMentStatus === 'Unpaid'
                                            ? 'Pre invoice'
                                            : PayMentStatus === 'Paid'
                                            ? 'Invoice'
                                            : PayMentStatus
                                    )}
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
                                        color="secondary"
                                        onClick={handlePrintWindow}
                                    >
                                        {t(
                                            PayMentStatus === 'Paid'
                                                ? 'Print Invoice'
                                                : PayMentStatus === 'Unpaid'
                                                ? 'Print Pre Invoice'
                                                : 'Print'
                                        )}
                                    </Button>

                                    {PayMentStatus !== 'Paid' && (
                                        <Button
                                            className="m-1"
                                            size="small"
                                            variant="outlined"
                                            color="error"
                                        >
                                            {t('Cancel')}
                                        </Button>
                                    )}
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
