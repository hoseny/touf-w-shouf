import React, { FunctionComponent, useRef } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import Logo from '@/assets/images/misr-logo.JPG';
import LogoTouf from '@/assets/images/logo_en.webp';

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
    // Add these new props for the additional details
    phone?: string;
    email?: string;
    numberOfAdults?: number;
    numberOfChildrenUnder6?: number;
    numberOfChildrenBetween6And12?: number;
    TheNumberOfCHILDFROM6TO12DayUseX?: number;
    TheNumberOfADULTINSINGLEX?: number;
    TheNumberOfADULTINDOUBLEX?: number;
    TheNumberOfADULTINTRIPLEX?: number;
    TheNumberOfADULTINSUITEX?: number;
    TheNumberOfADULTINQUARTERX?: number;
    totalAdditionalService?: string;
    totalWithoutAdditionalService?: string;
    vat?: string;
    totalWithVat?: string;
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
    phone = '',
    email = '',
    numberOfAdults = 0,
    numberOfChildrenUnder6 = 0,
    numberOfChildrenBetween6And12 = 0,
    TheNumberOfCHILDFROM6TO12DayUseX = 0,
    TheNumberOfADULTINSINGLEX = 0,
    TheNumberOfADULTINDOUBLEX = 0,
    TheNumberOfADULTINTRIPLEX = 0,
    TheNumberOfADULTINSUITEX = 0,
    TheNumberOfADULTINQUARTERX = 0,
    totalAdditionalService = '0',
    totalWithoutAdditionalService = '0',
    vat = '0',
    totalWithVat = '0',
}) => {
    const labelStyle = {
        color: '#E07026',
    };
    const { t } = useTranslation();
    const printRef = useRef<HTMLDivElement>(null);

    const handlePrintWindow = () => {
        const logoPath = typeof Logo === 'string' ? Logo : Logo.src;
        const logoPathTouf = typeof LogoTouf === 'string' ? LogoTouf : LogoTouf.src;

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
                .container { max-width: 1000px; margin: 0 auto; }
                .row { display: flex; flex-wrap: wrap; margin-bottom: 20px; }
                .col-md-12 { width: 100%; }
                .col-md-6 { width: 50%; padding: 0 15px; box-sizing: border-box; }
                .bg-light { background-color: #f8f9fa; }
                .p-3 { padding: 16px; }
                .mt-4 { margin-top: 16px; }
                .mt-5 { margin-top: 32px; }
                .mb-2 { margin-bottom: 8px; }
                .text-center { text-align: center; }
                .text-white { color: white; }
                table { width: 100%; border-collapse: collapse; }
                th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
                .success-icon { 
                    font-size: 177px; 
                    color: #E07026; 
                    margin: 0 auto 16px auto; 
                    display: block; 
                    text-align: center;
                }
                .d-flex { display: flex; }
                .flex-wrap { flex-wrap: wrap; }
                .justify-content-between { justify-content: space-between; }
                .align-items-center { align-items: center; }
                .ml-1 { margin-left: 4px; }
                .w-100 { width: 100%; }
                
                @media print {
                    body { padding: 10px; }
                    button { display: none; }
                    .col-md-6 { width: 50%; }
                    .break-before { page-break-before: always; }
                }
            </style>
        </head>
        <body>
            <div class="container">

                <div class="d-flex justify-content-between align-items-center">
                <div>
                    <img src="${logoPath}" alt="Logo" style="max-width: 150px; height: auto;" />
                </div>
                <div>
                    <img src="${logoPathTouf}" alt="Logo" style="max-width: 150px; height: auto;" />
                </div>
                </div>

                <div class="row">
                    <div class="col-md-12">
                        <div class="d-flex align-items-center mb-2">
                            <h3>${t('Invoice Status')}</h3>
                            <h3 style="color: green; margin-left: 4px;">
                                : ${PayMentStatus === 'Paid' ? t('Paid') : t('Unpaid')}
                            </h3>
                        </div>
                    </div>

                    <!-- Trip Details -->
                    <div class="col-md-6">
                        <div class="bg-light p-3">
                            <h4>${t('Trip Details')}</h4>
                            <div class="d-flex align-items-center justify-content-between mb-2">
                                <p style="color: #E07026;">${t('Program Name')}</p>
                                <p>${ProgramName}</p>
                            </div>
                            <div class="d-flex align-items-center justify-content-between mb-2">
                                <p style="color: #E07026;">${t('Program Year')}</p>
                                <p>${PROG_YEAR}</p>
                            </div>
                            <div class="d-flex align-items-center justify-content-between mb-2">
                                <p style="color: #E07026;">${t('Date')}</p>
                                <p>${new Date(tripDate).toLocaleDateString('en-GB')}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Price Details -->
                    <div class="col-md-6">
                        <div class="bg-light p-3">
                            <h4>${t('Trip Details')}</h4>
                            <div class="d-flex align-items-center justify-content-between mb-2">
                                <p style="color: #E07026;">${t('Customer Name')}</p>
                                <p>${customerName}</p>
                            </div>
                            <div class="d-flex align-items-center justify-content-between mb-2">
                                <p style="color: #E07026;">${t('Reservation No')}</p>
                                <p>${reservationNo}</p>
                            </div>
                            <div class="d-flex align-items-center justify-content-between mb-2">
                                <p style="color: #E07026;">${t('Total Price')}</p>
                                <p>${totalPayment} ${Currany}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <script>
                window.onload = function() {
                    setTimeout(function() {
                        window.print();
                    }, 500);
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

                                    {/* {PayMentStatus !== 'Paid' && (
                                        <Button
                                            className="m-1"
                                            size="small"
                                            variant="outlined"
                                            color="error"
                                        >
                                            {t('Cancel')}
                                        </Button>
                                    )} */}
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
