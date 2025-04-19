import React, { FunctionComponent, useRef } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import Logo from '@/assets/images/logo-misr.png';
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
                .footer {
                    margin-top: 40px;
                    font-size: 0.9em;
                    color: #666;
                }
                .thank-you {
                    text-align: center;
                    font-size: 1.2em;
                    font-weight: bold;
                    margin-top: 30px;
                }
                    .head-title {
                color: #0336a7;
                }
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
                    <h2 class='head-title'>MISR TRAVEL</h2>
                    <p>Misr Travel Tower -- Abbassia Square / 1 Talaat Harb St., Cairo -- Egypt.</p>
                    <p>Tel: +2 (02) 23930010 | www.misrtravel.net</p>
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
                     <div class="footer col-md-12 text-center">
                    <p>Make all checks payable to Misr Travel</p>
                    <p>If you have any questions concerning this invoice, use the following contact information:</p>
                    <p>Contact Misr Travel, +2 (02) 23930010, info@misrtravel.net</p>
                </div>
    
                <div class="thank-you col-md-12 head-title">
                    THANK YOU FOR YOUR BUSINESS!
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

    // const handlePrintWindow = () => {
    //     const logoPath = typeof Logo === 'string' ? Logo : Logo.src;
    //     const logoPathTouf = typeof LogoTouf === 'string' ? LogoTouf : LogoTouf.src;

    //     const content = `
    //     <html>
    //     <head>
    //         <title>Invoice</title>
    //         <style>
    //             body {
    //                 font-family: Arial, sans-serif;
    //                 padding: 20px;
    //                 margin: 0;
    //                 background-color: #fff;
    //             }
    //             .invoice-container {
    //                 max-width: 800px;
    //                 margin: 0 auto;
    //             }
    //             .header {
    //                 display: flex;
    //                 justify-content: space-between;
    //                 margin-bottom: 30px;
    //             }
    //             .logo {
    //                 max-width: 150px;
    //                 height: auto;
    //             }
    //             .invoice-info {
    //                 text-align: right;
    //             }
    //             .invoice-title {
    //                 font-size: 24px;
    //                 font-weight: bold;
    //                 margin-bottom: 5px;
    //             }
    //             .invoice-number {
    //                 font-size: 18px;
    //                 margin-bottom: 5px;
    //             }
    //             .invoice-date {
    //                 margin-bottom: 20px;
    //             }
    //             .billing-info {
    //                 display: flex;
    //                 justify-content: space-between;
    //                 margin-bottom: 20px;
    //             }
    //             .bill-to, .service-for {
    //                 width: 48%;
    //             }
    //             .section-title {
    //                 font-weight: bold;
    //                 margin-bottom: 10px;
    //                 color: #E07026;
    //             }
    //             table {
    //                 width: 100%;
    //                 border-collapse: collapse;
    //                 margin: 20px 0;
    //             }
    //             th {
    //                 text-align: left;
    //                 padding: 10px;
    //                 background-color: #f5f5f5;
    //                 border-bottom: 1px solid #ddd;
    //             }
    //             td {
    //                 padding: 10px;
    //                 border-bottom: 1px solid #eee;
    //             }
    //             .text-right {
    //                 text-align: right;
    //             }
    //             .totals {
    //                 margin-top: 20px;
    //                 width: 300px;
    //                 margin-left: auto;
    //             }
    //             .total-row {
    //                 display: flex;
    //                 justify-content: space-between;
    //                 margin-bottom: 10px;
    //             }
    //             .footer {
    //                 margin-top: 40px;
    //                 font-size: 0.9em;
    //                 color: #666;
    //             }
    //             .thank-you {
    //                 text-align: center;
    //                 font-size: 1.2em;
    //                 font-weight: bold;
    //                 margin-top: 30px;
    //             }
    //             @media print {
    //                 body { padding: 0; }
    //                 button { display: none; }
    //             }
    //         </style>
    //     </head>
    //     <body>
    //         <div class="invoice-container">
    //             <div class="header">
    //                 <div>
    //                     <img src="${logoPath}" alt="Logo" class="logo" />
    //                 </div>
    //                 <div class="invoice-info">
    //                     <div class="invoice-title">INVOICE</div>
    //                     <div class="invoice-number"># ${reservationNo}</div>
    //                     <div class="invoice-date">Date: ${new Date().toLocaleDateString('en-GB')}</div>
    //                 </div>
    //             </div>

    //             <div class="billing-info">
    //                 <div class="bill-to">
    //                     <div class="section-title">BILL TO</div>
    //                     <div>${customerName}</div>
    //                     <div>${phone || email}</div>
    //                 </div>
    //                 <div class="service-for">
    //                     <div class="section-title">FOR</div>
    //                     <div>${ProgramName}</div>
    //                 </div>
    //             </div>

    //             <table>
    //                 <thead>
    //                     <tr>
    //                         <th>SERVICE DESCRIPTION</th>
    //                         <th class="text-right">AMOUNT</th>
    //                     </tr>
    //                 </thead>
    //                 <tbody>
    //                     <tr>
    //                         <td>${ProgramName} Package (${PROG_YEAR})</td>
    //                         <td class="text-right">${totalWithoutAdditionalService} ${Currany}</td>
    //                     </tr>
    //                     ${totalAdditionalService !== '0' ? `
    //                     <tr>
    //                         <td>Additional Services</td>
    //                         <td class="text-right">${totalAdditionalService} ${Currany}</td>
    //                     </tr>
    //                     ` : ''}
    //                     ${vat !== '0' ? `
    //                     <tr>
    //                         <td>Tax (VAT)</td>
    //                         <td class="text-right">${vat} ${Currany}</td>
    //                     </tr>
    //                     ` : ''}
    //                 </tbody>
    //             </table>

    //             <div class="totals">
    //                 <div class="total-row">
    //                     <span>Subtotal:</span>
    //                     <span>${totalWithoutAdditionalService} ${Currany}</span>
    //                 </div>
    //                 ${totalAdditionalService !== '0' ? `
    //                 <div class="total-row">
    //                     <span>Additional costs:</span>
    //                     <span>${totalAdditionalService} ${Currany}</span>
    //                 </div>
    //                 ` : ''}
    //                 ${vat !== '0' ? `
    //                 <div class="total-row">
    //                     <span>Tax rate:</span>
    //                     <span>${vat} ${Currany}</span>
    //                 </div>
    //                 ` : ''}
    //                 <div class="total-row" style="font-weight: bold; font-size: 1.1em;">
    //                     <span>TOTAL COST:</span>
    //                     <span>${totalWithVat || totalPayment} ${Currany}</span>
    //                 </div>
    //             </div>

    //             <div class="footer">
    //                 <p>Make all checks payable to Misr Travel</p>
    //                 <p>If you have any questions concerning this invoice, use the following contact information:</p>
    //                 <p>Contact Misr Travel, +2 (02) 23930010, info@misrtravel.net</p>
    //             </div>

    //             <div class="thank-you">
    //                 THANK YOU FOR YOUR BUSINESS!
    //             </div>
    //         </div>

    //         <script>
    //             window.onload = function() {
    //                 setTimeout(function() {
    //                     window.print();
    //                 }, 500);
    //             }
    //         </script>
    //     </body>
    //     </html>
    //     `;

    //     const printWindow = window.open('', '_blank', 'width=900,height=650');
    //     if (printWindow) {
    //         printWindow.document.open();
    //         printWindow.document.write(content);
    //         printWindow.document.close();
    //     }
    // };
    const handlePrintVoucher = () => {
        const logoPath = typeof Logo === 'string' ? Logo : Logo.src;

        const totalTravelers =
            numberOfAdults + numberOfChildrenUnder6 + numberOfChildrenBetween6And12;

        const includedServices = [
            'الإقامة في الفندق',
            'وجبات الإفطار',
            'جولات سياحية حسب البرنامج',
            'خدمة نقل من/إلى المطار',
            'مرشد سياحي',
            'تأمين صحي',
        ]
            .map(service => `<li>${service}</li>`)
            .join('');

        const content = `
        <html>
        <head>
            <title>Voucher</title>
            <style>
                body { 
                    font-family: Arial, sans-serif; 
                    padding: 20px; 
                    margin: 0;
                    background-color: #fff;
                }
                .voucher-container { 
                    max-width: 800px; 
                    margin: 0 auto; 
                    border: 1px solid #ddd;
                    padding: 20px;
                    box-shadow: 0 0 10px rgba(0,0,0,0.1);
                }
                .header { 
                    text-align: center; 
                    margin-bottom: 20px;
                }
                .logo { 
                    max-width: 150px; 
                    height: auto;
                }
                .section { 
                    margin-bottom: 15px;
                }
                .section-title { 
                    font-weight: bold; 
                    color: #E07026; 
                    margin-bottom: 5px;
                    border-bottom: 1px solid #E07026;
                    padding-bottom: 3px;
                }
                .details-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 10px;
                }
                .detail-item {
                    margin-bottom: 5px;
                }
                .detail-label {
                    font-weight: bold;
                    color: #555;
                }
                .notes {
                    font-style: italic;
                    color: #666;
                }
                ul {
                    padding-left: 20px;
                    margin: 5px 0;
                }
                .footer {
                    text-align: center;
                    margin-top: 20px;
                    font-size: 0.9em;
                    color: #777;
                }
                @media print {
                    body { padding: 0; }
                    .voucher-container { 
                        border: none; 
                        box-shadow: none;
                    }
                    button { display: none; }
                }
            </style>
        </head>
        <body>
            <div class="voucher-container">
                <div class="header">
                    <img src="${logoPath}" alt="Misr Travel Logo" class="logo">
                </div>
    
                <div class="section">
                    <div class="section-title">Tour Service Voucher</div>
                    <div class="details-grid">
                        <div class="detail-item">
                            <span class="detail-label">Voucher No.:</span> ${reservationNo}
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Issue Date:</span> ${new Date().toLocaleDateString(
                                'en-GB'
                            )}
                        </div>
                    </div>
                </div>
    
                <div class="section">
                    <div class="section-title">PASSENGER DETAILS</div>
                    <div class="details-grid">
                        <div class="detail-item">
                            <span class="detail-label">Name:</span> ${customerName}
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Contact:</span> ${phone || email}
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">No. of Travelers:</span> ${totalTravelers} (Adults: ${numberOfAdults}, Children: ${
            numberOfChildrenUnder6 + numberOfChildrenBetween6And12
        })
                        </div>
                    </div>
                </div>
    
                <div class="section">
                    <div class="section-title">TRAVEL SERVICE DETAILS</div>
                    <div class="details-grid">
                        <div class="detail-item">
                            <span class="detail-label">Service Type:</span> ${ProgramName}
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Destination:</span> [City / Country]
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Service Dates:</span> From ${new Date(
                                tripDate
                            ).toLocaleDateString('en-GB')} to [End Date]
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Number of Nights:</span> [Nights]
                        </div>
                    </div>
                </div>
    
                <div class="section">
                    <div class="section-title">INCLUDED SERVICES</div>
                    <ul>
                        ${includedServices}
                    </ul>
                </div>
    
                <div class="section">
                    <div class="section-title">SUPPLIER / SERVICE PROVIDER DETAILS</div>
                    <div class="details-grid">
                        <div class="detail-item">
                            <span class="detail-label">Name:</span> [Supplier Name]
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Contact:</span> [Phone / Email]
                        </div>
                    </div>
                </div>
    
                <div class="section">
                    <div class="section-title">BOOKING & PAYMENT STATUS</div>
                    <div class="details-grid">
                        <div class="detail-item">
                            <span class="detail-label">Booking Reference:</span> ${reservationNo}
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Payment Status:</span> <strong>${
                                PayMentStatus === 'Paid' ? 'PAID' : 'PENDING'
                            }</strong>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Issued By:</span> [Employee Name / Booking Agent]
                        </div>
                    </div>
                </div>
    
                <div class="section">
                    <div class="section-title">IMPORTANT NOTES</div>
                    <ul class="notes">
                        <li>Please present this voucher upon arrival or at the beginning of service.</li>
                        <li>This voucher is non-transferable and valid only for the services mentioned.</li>
                        <li>For any issues during travel, please contact our 24/7 support at [Emergency Contact Number].</li>
                    </ul>
                </div>
    
                <div class="section" style="text-align: center; font-weight: bold; font-size: 1.2em;">
                    BON VOYAGE! HAVE A GREAT TRIP!
                </div>
    
                <div class="footer">
                    <p>(This voucher is issued by Misr Travel as proof of booking and confirmation.)</p>
                    <p>Misr Travel Tower -- Abbassia Square / 1 Talaat Harb St., Cairo -- Egypt.</p>
                    <p>Tel: +2 (02) 23930010 | www.misrtravel.net</p>
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
                                    <Button
                                        className="m-1"
                                        size="small"
                                        variant="contained"
                                        onClick={handlePrintVoucher}
                                    >
                                        {t(PayMentStatus === 'Paid' ? 'print voucher' : '')}
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
