import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { useRouter } from 'next/router';
import { useGetInvoiceQuery } from '@/store/Reservation/FetchInvoiceById';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PrintIcon from '@mui/icons-material/Print';
import Logo from '@/assets/images/logo-misr.png';
import LogoTouf from '@/assets/images/logo_en.webp';

interface Props {}

const Success: FunctionComponent<Props> = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const printRef = useRef<HTMLDivElement>(null);
    const [invoiceId, setInvoiceId] = useState<string | null>(null);
    const [phone, setPhone] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const phoneNo = localStorage.getItem('TELEPHONE');
            const emailNo = localStorage.getItem('EMAIL');

            if (phoneNo) setPhone(phoneNo);
            if (emailNo) setEmail(emailNo);
        }
    }, []);

    useEffect(() => {
        const storedId = sessionStorage.getItem('Res_sp');
        if (storedId) {
            setInvoiceId(storedId);
        }
    }, []);

    const { data, isLoading, error } = useGetInvoiceQuery({ id: invoiceId || '' });

    if (isLoading) return <Typography>{t('Loading...')}</Typography>;
    if (error) return <Typography>{t('Error fetching data')}</Typography>;

    const invoice = data?.items?.[0];

    const programname = invoice?.programname || t('Program name not available');
    const reservationNo = invoice?.reservationsp || t('Program name not available');
    const InvoiceStatus = invoice?.InvoiceStatus || t('Program Invoice Status not available');
    const programyear = invoice?.programyear || t('Program year not available');
    const TripDate = invoice?.['TripDate :'] || t('Program date not available');
    const CustomerName = invoice?.['CustomerName '] || t('Program date not available');
    const total = invoice?.['Total '] || t('Total not available');
    const vat = invoice?.['Vat '] || t('0');
    const totalWithVat = invoice?.['TheTotalincludesVat '] || t('Total with VAT not available');
    const numberOfAdults = invoice?.['TheNumberOfADULTX'] || t('Number of Adults not available');
    const numberOfChildrenUnder6 =
        invoice?.['TheNumberOfCHILD FROM 1 TO 6X'] || t('Number of Children (1-6) not available');
    const numberOfChildrenBetween6And12 =
        invoice?.['TheNumberOfCHILD FROM 6 TO 12X'] || t('Number of Children (6-12) not available');
    const TheNumberOfCHILDFROM6TO12DayUseX =
        invoice?.['TheNumberOfCHILD FROM 6 TO 12 DayUseX'] ||
        t('Day Use Children (6-12) not available');
    const TheNumberOfADULTINSINGLEX =
        invoice?.['TheNumberOfADULT IN SINGLEX'] || t('Adults in Single not available');
    const TheNumberOfADULTINDOUBLEX =
        invoice?.['TheNumberOfADULT IN DOUBLEX'] || t('Adults in Double not available');
    const TheNumberOfADULTINTRIPLEX =
        invoice?.['TheNumberOfADULT IN TRIPLEX'] || t('Adults in Triplex not available');
    const TheNumberOfADULTINSUITEX =
        invoice?.['TheNumberOfADULT IN SUITEX'] || t('Adults in Suite not available');
    const TheNumberOfADULTINQUARTERX =
        invoice?.['TheNumberOfADULT IN QUARTERX'] || t('Adults in Quarter not available');
    const totalWithoutAdditionalService =
        invoice?.['TheTotalwithoutadditionalservice'] ||
        t('Total without additional services not available');
    const totalAdditionalService = invoice?.['TheTotaladditionalservice'] || 0;

    const handlePrint = () => {
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
                                : ${InvoiceStatus}
                            </h3>
                        </div>
                    </div>

                    <!-- Trip Details -->
                    <div class="col-md-6">
                        <div class="bg-light p-3">
                            <h4>${t('Trip Details')}</h4>
                            <div class="d-flex align-items-center justify-content-between mb-2">
                                <p style="color: #E07026;">${t('Program Name')}</p>
                                <p>${programname}</p>
                            </div>
                            <div class="d-flex align-items-center justify-content-between mb-2">
                                <p style="color: #E07026;">${t('Reservation No')}</p>
                                <p>${reservationNo}</p>
                            </div>
                            <div class="d-flex align-items-center justify-content-between mb-2">
                                <p style="color: #E07026;">${t('Date')}</p>
                                <p>${TripDate}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Customer Details -->
                    <div class="col-md-6">
                        <div class="bg-light p-3">
                            <h4>${t('Customer Details')}</h4>
                            <div class="d-flex align-items-center justify-content-between mb-2">
                                <p style="color: #E07026;">${t('Customer Name')}</p>
                                <p>${CustomerName}</p>
                            </div>
                            <div class="d-flex align-items-center justify-content-between mb-2">
                                <p style="color: #E07026;">${t('Phone')}</p>
                                <p>${phone || 'N/A'}</p>
                            </div>
                            <div class="d-flex align-items-center justify-content-between mb-2">
                                <p style="color: #E07026;">${t('Email')}</p>
                                <p>${email || 'N/A'}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Pax Details -->
                    <div class="col-md-12 mt-2">
                        <table>
                            <thead style="background-color: #E07026;">
                                <tr>
                                    <th class="text-white">${t('Pax Type')}</th>
                                    <th class="text-white">${t('Pax No')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${
                                    numberOfAdults > 0
                                        ? `
                                <tr>
                                    <td>${t('Adults')}</td>
                                    <td>${numberOfAdults}</td>
                                </tr>
                                `
                                        : ''
                                }
                                ${
                                    numberOfChildrenUnder6 > 0
                                        ? `
                                <tr>
                                    <td>${t('Children (1-6)')}</td>
                                    <td>${numberOfChildrenUnder6}</td>
                                </tr>
                                `
                                        : ''
                                }
                                ${
                                    numberOfChildrenBetween6And12 > 0
                                        ? `
                                <tr>
                                    <td>${t('Children (6-12)')}</td>
                                    <td>${numberOfChildrenBetween6And12}</td>
                                </tr>
                                `
                                        : ''
                                }
                                ${
                                    TheNumberOfCHILDFROM6TO12DayUseX > 0
                                        ? `
                                <tr>
                                    <td>${t('Day Use Children (6-12)')}</td>
                                    <td>${TheNumberOfCHILDFROM6TO12DayUseX}</td>
                                </tr>
                                `
                                        : ''
                                }
                                ${
                                    TheNumberOfADULTINSINGLEX > 0
                                        ? `
                                <tr>
                                    <td>${t('Adults in Single')}</td>
                                    <td>${TheNumberOfADULTINSINGLEX}</td>
                                </tr>
                                `
                                        : ''
                                }
                                ${
                                    TheNumberOfADULTINDOUBLEX > 0
                                        ? `
                                <tr>
                                    <td>${t('Adults in Double')}</td>
                                    <td>${TheNumberOfADULTINDOUBLEX}</td>
                                </tr>
                                `
                                        : ''
                                }
                                ${
                                    TheNumberOfADULTINTRIPLEX > 0
                                        ? `
                                <tr>
                                    <td>${t('Adults in Triplex')}</td>
                                    <td>${TheNumberOfADULTINTRIPLEX}</td>
                                </tr>
                                `
                                        : ''
                                }
                                ${
                                    TheNumberOfADULTINSUITEX > 0
                                        ? `
                                <tr>
                                    <td>${t('Adults in Suite')}</td>
                                    <td>${TheNumberOfADULTINSUITEX}</td>
                                </tr>
                                `
                                        : ''
                                }
                                ${
                                    TheNumberOfADULTINQUARTERX > 0
                                        ? `
                                <tr>
                                    <td>${t('Adults in Quarter')}</td>
                                    <td>${TheNumberOfADULTINQUARTERX}</td>
                                </tr>
                                `
                                        : ''
                                }
                            </tbody>
                        </table>
                    </div>

                    <!-- Price Details -->
                    <div class="col-md-12 mt-2">
                        <div class="bg-light p-3">
                            <h4>${t('Price Details')}</h4>
                            <div class="d-flex align-items-center justify-content-between mb-2">
                                <p style="color: #E07026;">${t('Total AdditionalService')}</p>
                                <p>${totalAdditionalService} EGP</p>
                            </div>
                            <div class="d-flex align-items-center justify-content-between mb-2">
                                <p style="color: #E07026;">${t(
                                    'Total Without AdditionalService'
                                )}</p>
                                <p>${totalWithoutAdditionalService} EGP</p>
                            </div>
                            <div class="d-flex align-items-center justify-content-between mb-2">
                                <p style="color: #E07026;">${t('Vat')}</p>
                                <p>${vat} EGP</p>
                            </div>
                            <div class="d-flex align-items-center justify-content-between mb-2">
                                <p style="color: #E07026;">${t('Total With Vat')}</p>
                                <p>${totalWithVat} EGP</p>
                            </div>
                            <div class="d-flex align-items-center justify-content-between mb-2">
                                <p style="color: #E07026;">${t('Total Price')}</p>
                                <p>${total} EGP</p>
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

        const width = window.screen.width;
        const height = window.screen.height;

        const printWindow = window.open('', '_blank', `width=${width},height=${height}`);
        if (printWindow) {
            printWindow.document.open();
            printWindow.document.write(content);
            printWindow.document.close();
        }
    };

    return (
        <div className="container my-4" ref={printRef}>
            <div className="row">
                <div className="col-md-12 no-print">
                    <CheckCircleRoundedIcon
                        sx={{
                            fontSize: 177,
                            color: 'secondary.main',
                            mx: 'auto',
                            width: '100%',
                            mb: 2,
                        }}
                    />

                    <Typography variant="h3" sx={{ textAlign: 'center' }}>
                        {t('Booking Successful')}
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{ textAlign: 'center', color: 'main.payment', mt: 1 }}
                    >
                        {t('Thank you for Choosing Touf w shof')}
                    </Typography>
                </div>

                <div className="row mt-5">
                    <div className="col-md-12">
                        <Stack direction="row" alignItems="center" sx={{ mb: 2 }}>
                            <Typography variant="h6">{t('Invoice Status')}</Typography>
                            <Typography variant="h6" color="green" ml={1}>
                                : {InvoiceStatus}
                            </Typography>
                        </Stack>
                    </div>
                    {/* Trip Details */}
                    <div className="col-md-6">
                        <div className="bg-light p-3">
                            <Stack>
                                <h4>{t('Trip Details')}</h4>
                            </Stack>
                            <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="space-between"
                                sx={{ mb: 2 }}
                            >
                                <Typography variant="body1" sx={{ color: 'main.payment' }}>
                                    {t('Program Name')}
                                </Typography>
                                <Typography variant="body2">{programname}</Typography>
                            </Stack>
                            <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="space-between"
                                sx={{ mb: 2 }}
                            >
                                <Typography variant="body1" sx={{ color: 'main.payment' }}>
                                    {t('Reservation No')}
                                </Typography>
                                <Typography variant="body2">{reservationNo}</Typography>
                            </Stack>
                            <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="space-between"
                                sx={{ mb: 2 }}
                            >
                                <Typography variant="body1" sx={{ color: 'main.payment' }}>
                                    {t('Date')}
                                </Typography>
                                <Typography variant="body2">{TripDate}</Typography>
                            </Stack>
                        </div>
                    </div>
                    {/* Customer Details */}
                    <div className="col-md-6">
                        <div className="bg-light p-3">
                            <Stack>
                                <h4>{t('Customer Details')}</h4>
                            </Stack>
                            <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="space-between"
                                sx={{ mb: 2 }}
                            >
                                <Typography variant="body1" sx={{ color: 'main.payment' }}>
                                    {t('Customer Name')}
                                </Typography>
                                <Typography variant="body2">{CustomerName}</Typography>
                            </Stack>
                            <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="space-between"
                                sx={{ mb: 2 }}
                            >
                                <Typography variant="body1" sx={{ color: 'main.payment' }}>
                                    {t('Phone')}
                                </Typography>
                                <Typography variant="body2">{phone}</Typography>
                            </Stack>
                            <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="space-between"
                                sx={{ mb: 2 }}
                            >
                                <Typography variant="body1" sx={{ color: 'main.payment' }}>
                                    {t('Email')}
                                </Typography>
                                <Typography variant="body2">{email}</Typography>
                            </Stack>
                        </div>
                    </div>
                    {/* pax Details */}
                    <TableContainer className="mt-4" component={Paper}>
                        <Table>
                            <TableHead
                                sx={{
                                    backgroundColor: 'secondary.main',
                                }}
                            >
                                <TableRow>
                                    <TableCell className="text-white">Pax Type</TableCell>
                                    <TableCell className="text-white">Pax No</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {numberOfAdults > 0 && (
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="h6">{t('Adults')}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="h6">{numberOfAdults}</Typography>
                                        </TableCell>
                                    </TableRow>
                                )}
                                {numberOfChildrenUnder6 > 0 && (
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="h6">
                                                {t('Children (1-6)')}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="h6">
                                                {numberOfChildrenUnder6}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                )}
                                {numberOfChildrenBetween6And12 > 0 && (
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="h6">
                                                {t('Children (6-12)')}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="h6">
                                                {numberOfChildrenBetween6And12}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                )}
                                {TheNumberOfCHILDFROM6TO12DayUseX > 0 && (
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="h6">
                                                {t('Day Use Children (6-12)')}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="h6">
                                                {TheNumberOfCHILDFROM6TO12DayUseX}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                )}
                                {TheNumberOfADULTINSINGLEX > 0 && (
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="h6">
                                                {t('Adults in Single')}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="h6">
                                                {TheNumberOfADULTINSINGLEX}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                )}
                                {TheNumberOfADULTINDOUBLEX > 0 && (
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="h6">
                                                {t('Adults in Double')}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="h6">
                                                {TheNumberOfADULTINDOUBLEX}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                )}
                                {TheNumberOfADULTINTRIPLEX > 0 && (
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="h6">
                                                {t('Adults in Triplex')}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="h6">
                                                {TheNumberOfADULTINTRIPLEX}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                )}
                                {TheNumberOfADULTINSUITEX > 0 && (
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="h6">
                                                {t('Adults in Suite')}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="h6">
                                                {TheNumberOfADULTINSUITEX}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                )}
                                {TheNumberOfADULTINQUARTERX > 0 && (
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="h6">
                                                {t('Adults in Quarter')}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="h6">
                                                {TheNumberOfADULTINQUARTERX}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>

                {/* Price Details */}
                <div className="col-md-12 mt-4">
                    <div className="bg-light p-3">
                        <Stack>
                            <h4>{t('Price Details')}</h4>
                        </Stack>

                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            sx={{ mb: 2, mt: 2 }}
                        >
                            <Typography variant="body1" sx={{ color: 'main.payment' }}>
                                {t('Total AdditionalService')}
                            </Typography>
                            <Typography variant="body2">{totalAdditionalService} EGP</Typography>
                        </Stack>
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            sx={{ mb: 2 }}
                        >
                            <Typography variant="body1" sx={{ color: 'main.payment' }}>
                                {t('Total Without AdditionalService')}
                            </Typography>
                            <Typography variant="body2">
                                {totalWithoutAdditionalService} EGP
                            </Typography>
                        </Stack>
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            sx={{ mb: 2 }}
                        >
                            <Typography variant="body1" sx={{ color: 'main.payment' }}>
                                {t('Vat')}
                            </Typography>
                            <Typography variant="body2">{vat} EGP</Typography>
                        </Stack>
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            sx={{ mb: 2 }}
                        >
                            <Typography variant="body1" sx={{ color: 'main.payment' }}>
                                {t('Total With Vat')}
                            </Typography>
                            <Typography variant="body2">{totalWithVat} EGP</Typography>
                        </Stack>

                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            sx={{ mb: 2 }}
                        >
                            <Typography variant="body1" sx={{ color: 'main.payment' }}>
                                {t('Total Price')}
                            </Typography>
                            <Typography variant="body2">{total} EGP</Typography>
                        </Stack>
                    </div>
                </div>

                <div className="no-print" style={{ margin: '20px 0' }}>
                    <Button variant="contained" startIcon={<PrintIcon />} onClick={handlePrint}>
                        {t('Print Invoice')}
                    </Button>
                </div>

                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    spacing={4}
                    sx={{ mt: 4 }}
                >
                    <Button variant="contained" fullWidth onClick={() => router.push('/')}>
                        {t('Make another booking')}
                    </Button>
                    <Button variant="outlined" fullWidth onClick={() => router.push('/')}>
                        {t('Return home')}
                    </Button>
                </Stack>
            </div>
        </div>
    );
};

export default Success;
