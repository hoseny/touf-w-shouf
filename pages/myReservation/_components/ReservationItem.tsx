import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import Logo from '@/assets/images/logo-misr.png';
import LogoTouf from '@/assets/images/logo_en.webp';
import { useLazyGetVoucherQuery } from '@/store/Reservation/FetchVoucher';
import Loading from '@/components/Loading/Loading';
import Swal from 'sweetalert2';
import { useGetPaymentQuery } from '@/store/Reservation/FetchPaymentApi';
import { log } from 'console';

interface GeideaData {
    responseCode: string;
    responseMessage: string;
    detailedResponseCode: string;
    detailedResponseMessage: string;
    orderId: string;
    reference: string;
}

interface Props {
    customerName: string;
    tripDate: string;
    ReservationRef: string;
    CustomerRef: number;
    reservationNo: number;
    PayMentStatus: string;
    totalPayment: string;
    Currany: string;
    ProgramName: string;
    IMG_Path: string;
    PROG_YEAR: number;
    priority?: boolean;
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
    CustomerRef,
    reservationNo,
    PayMentStatus,
    totalPayment,
    Currany,
    ReservationRef,
    PROG_YEAR,
    ProgramName,
    IMG_Path,
}) => {
    const labelStyle = {
        color: '#E07026',
    };
    const { t } = useTranslation();

    const printRef = useRef<HTMLDivElement>(null);
    const [ref, setRef] = useState<string | null>(null);
    const [sp, setSp] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    // const customer_ref = typeof window !== 'undefined' ? localStorage.getItem('custcode') : null;

    // useEffect(() => {
    //     if (typeof window !== 'undefined') {
    //         const refNo = sessionStorage.getItem('ref_no');
    //         const resSp = sessionStorage.getItem('Res_sp');

    //         if (refNo) setRef(refNo);
    //         if (resSp) setSp(resSp);
    //     }
    // }, []);

    const [triggerVoucherQuery, { data, isLoading: isVoucherLoading, error: voucherError }] =
        useLazyGetVoucherQuery();
    const customerRef = CustomerRef;

    const reservationRef = ReservationRef;
    const reservationsp = reservationNo;
    // const total = totalPayment || 0;
    const totalWithVat = totalPayment || 0;

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

    const handlePrintVoucher = async () => {
        try {
            const { data } = await triggerVoucherQuery(reservationNo);
            const voucher = data?.Voucher?.[0];

            if (!voucher) {
                console.error('No voucher data received');
                return;
            }
            const logoPath = typeof Logo === 'string' ? Logo : Logo.src;
            const content = `
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Tour Service Voucher</title>
    <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background: #fff;
      color: #000;
    }
    
    .voucher-container {
      max-width: 1050px;
      margin: auto;
      padding: 30px;
      border: 1px solid #ccc;
    }
    .img-div{
        background-color: #21216e;
    }
    .voucher-header {
      text-align: left;
      border-bottom: 3px solid #005baa;
      padding-bottom: 10px;
      margin-bottom: 20px;
    }
    
    .logo {
      width: 200px;
    }
    
    .voucher-header h1 {
      color: #005baa;
      font-size: 20px;
      margin-top: 10px;
    }
    
    .voucher-meta {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
      font-size: 14px;
    }
    
    .section {
      margin-bottom: 20px;
    }
    
    .section h2 {
      color: #005baa;
      font-size: 16px;
      margin-bottom: 10px;
      text-transform: uppercase;
    }
    
    .section p, .section li {
      font-size: 14px;
      line-height: 1.6;
    }
    
    .section ul {
      list-style: disc;
      margin-left: 20px;
    }
    
    .footer {
      text-align: center;
      border-top: 1px solid #ccc;
      padding-top: 15px;
      margin-top: 30px;
      font-size: 14px;
    }
    
    .footer a {
      color: #005baa;
      text-decoration: none;
    }
    
    .blue {
      color: #005baa;
    }
    
    @media print {
      body { 
        padding: 10px;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      
      .img-div {
        background-color: #21216e !important;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      
      .logo {
        width: 200px;
        height: auto;
      }
    }
    
    </style>
      </head>
    <body>
      <div class="voucher-container">
        <header class="voucher-header">
        <div class="img-div">
        <img src="${logoPath}" alt="Misr Travel Logo" class="logo">
          </div>
          <h1>Tour Service Voucher</h1>
          <div class="voucher-meta">
            <span>Voucher No.: <strong style="Color:red">${voucher.VoucherNo}</strong></span>
            <span>Issue Date: <strong style="Color:red">${voucher.IssueDate}</strong></span>
          </div>
        </header>
    
        <section class="section">
          <h2>PASSENGER DETAILS</h2>
          <p>Name: <strong style="Color:red">${voucher.CustomerName}</strong></p>
          <p>Contact: [ Phone: <strong style="Color:red">${
              voucher.Phone
          }</strong> / Email: <strong style="Color:red">${voucher.EMail}</strong> ]</p>
<p><strong>No. of Travelers:</strong> [
  ${voucher.AdultNo > 0 ? `<span style="color:red">${voucher.AdultNo} Adults</span>` : ''}
  ${voucher.AdultNo > 0 && voucher.ChildNo > 0 ? `<span style="color:black"> / </span>` : ''}
  ${voucher.ChildNo > 0 ? `<span style="color:red">${voucher.ChildNo} Children</span>` : ''}
]</p>        </section>
    
        <section class="section">
          <h2>TRAVEL SERVICE DETAILS</h2>
          <p><strong>Service Type:</strong> ${voucher.ServiceType}</p>
          <p><strong>Destination:</strong> [ <span style="color:red">${
              voucher.City || 'Not Found'
          }</span> / <span style="color:red">${voucher.Country}</span> ]</p>
          <p><strong>Service Dates:</strong> From [ <span style="color:red">${new Date(
              voucher.DateStart
          ).toLocaleDateString('en-GB')}</span> ] to [ <span style="color:red">${new Date(
                voucher.DateEnd
            ).toLocaleDateString('en-GB')}</span> ]</p>
          <p><strong>Number of Nights:</strong> [ <span style="color:red">${
              voucher.NightCount
          }</span> ]</p>
        </section>
                 
       <section class="section">
  <h2>INCLUDED SERVICES</h2>
  <ul>
    ${
        voucher.INCLUDEDSERVICE && voucher.INCLUDEDSERVICE.length > 0
            ? voucher.INCLUDEDSERVICE.map((service: { [x: string]: string }) => {
                  // Check each possible service type
                  if (service['Hotel ']) {
                      return `<li>Accommodation at the <strong>${service['Hotel ']
                          .replace('Accommodation at the', '')
                          .trim()}</strong></li>`;
                  }
                  if (service['siteseeing ']) {
                      return `<li>Site seeing: <strong>${service['siteseeing ']
                          .replace('site seeing at the', '')
                          .trim()}</strong></li>`;
                  }
                  if (service['Transport ']) {
                      return `<li>Transportation by <strong>${service['Transport ']
                          .replace('Transfar By', '')
                          .trim()}</strong></li>`;
                  }
                  return '<li>Service details not Found</li>';
              }).join('')
            : '<li>No included services Found</li>'
    }
  </ul>
</section>
        <section class="section">
          <h2>SUPPLIER / SERVICE PROVIDER DETAILS</h2>
          ${
              voucher.Providers && voucher.Providers.length > 0
                  ? voucher.Providers.map(
                        (provider: { ProviderName: string; Phone: string; Email: string }) =>
                            `<p><strong>Name:</strong> <span style="color:red">${
                                provider.ProviderName || 'Not Found'
                            }</span></p>
                 <p><strong>Contact:</strong> [ Phone: <span style="color:red">${
                     provider.Phone || 'Not Found'
                 }</span> / Email: <span style="color:red">${
                                provider.Email || 'Not Found'
                            }</span> ]</p>`
                    ).join('')
                  : '<p>Provider details not Found</p>'
          }
        </section>
        
        <section class="section">
          <h2>BOOKING & PAYMENT STATUS</h2>
          <p><strong>Booking Reference:</strong> <span style="color:red">${
              voucher.BookingReference
          }</span></p>
          <p><strong>Payment Status:</strong> <span style="color:red">PAID</span></p>
          <p><strong>Issued By:</strong> <span style="color:red">Online Reservation</span></p>
        </section>
    
        <section class="section">
          <h2>IMPORTANT NOTES</h2>
          <ul>
            <li>Please present this voucher upon arrival or at the beginning of service.</li>
            <li>This voucher is non-transferable and valid only for the services mentioned.</li>
            <li>For any issues during travel, please contact our 24/7 support 19341 .</li>
          </ul>
        </section>
    
        <section class="section">
          <h2 class="blue">BON VOYAGE! HAVE A GREAT TRIP!</h2>
          <p><em>(This voucher is issued by Misr Travel as proof of booking and confirmation.)</em></p>
        </section>
    
        <footer class="footer">
          <p>Misr Travel Tower – Abbassia Square / 1 Talaat Harb St., Cairo – Egypt.</p>
          <p>Tel: +2 (02) 23930010 | <a href="http://www.misrtravel.net" target="_blank">www.misrtravel.net</a></p>
        </footer>
      </div>

      <script>
        function triggerPrint() {
          setTimeout(function() {
            window.print();
            window.onafterprint = function() {
              window.close();
            };
          }, 500); 
        }
        
        if (document.readyState === 'complete') {
          triggerPrint();
        } else {
          window.addEventListener('load', triggerPrint);
        }
      </script>
    </body>
    </html>
        `;

            const width = window.screen.width;
            const height = window.screen.height;
            const printWindowVoucher = window.open('', '_blank', `width=${width},height=${height}`);
            if (printWindowVoucher) {
                printWindowVoucher.document.open();
                printWindowVoucher.document.write(content);
                printWindowVoucher.document.close();
            }
        } catch (err) {
            console.error('Error fetching voucher:', err);
        }
    };

    // fetch check out id
    const fetchPaymentData = async (): Promise<any> => {
        try {
            setIsLoading(true);
            // const urlTrue = 'http://localhost:3000/Payment/Success';
            // const urlFalse = 'http://localhost:3000/Payment/Failed';
            // const urlTrue = 'https://touf-we-shouf.vercel.app/Payment/Success';
            // const urlFalse = 'https://touf-we-shouf.vercel.app/Payment/Failed';
            const urlTrue = 'https://www.toufwshouf.travel/Payment/Success';
            const urlFalse = 'https://www.toufwshouf.travel/Payment/Failed';
            const accessType = 'Web';
            const custRef = customerRef;
            const invNo = reservationsp;
            const invAmount = totalWithVat;
            const appSession =
                typeof window !== 'undefined' ? localStorage.getItem('token') : '123456';
            // const appSession = '123456';

            const url = `https://app.misrtravelco.net:4444/ords/invoice/public/GetCheckOut?urlFalse=${urlFalse}&urlTrue=${urlTrue}&accessType=${accessType}&custRef=${custRef}&invNo=${invNo}&invAmount=${invAmount}&appSession=${appSession}`;

            const response = await fetch(url);

            if (!response.ok) {
                setIsLoading(false);
                throw new Error('Failed to fetch payment data');
            }
            return await response.json();
        } catch (error: any) {
            setIsLoading(false);
            const errMessage = error.response?.data?.errMessage || 'Unexpected error occurred';
            console.error(errMessage);
            Swal.fire(errMessage);
        }
    };

    //add Geidea
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://www.merchant.geidea.net/hpp/geideaCheckout.min.js';
        script.async = true;
        script.onload = () => console.log('GeideaCheckout script loaded successfully');
        script.onerror = () => console.error('Failed to load GeideaCheckout script');
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    // Handle payment success
    const onSuccess = (data: GeideaData) => {
        Swal.fire({
            icon: 'success',
            title: t('Payment Successful'),
            html: `
            <strong>${t('Response Code')}:</strong> ${data.responseCode}<br />
            <strong>${t('Order ID')}:</strong> ${data.orderId}
            `,
        });
    };

    // Handle payment error
    const onError = (data: GeideaData) => {
        setIsLoading(false);
        Swal.fire({
            icon: 'error',
            title: t('Payment Failed'),
            html: `
            <strong>${t('Response Code')}:</strong> ${data.responseCode}<br />
            <strong>${t('Order ID')}:</strong> ${data.orderId}
            `,
        });
    };

    // Handle payment cancellation
    const onCancel = () => {
        setIsLoading(false);
        Swal.fire({
            icon: 'warning',
            title: t('Payment Cancelled'),
        });
    };

    // Start payment
    const startPayment = async () => {
        setIsLoading(true);
        if (!reservationRef || !customerRef || !totalWithVat) {
            Swal.fire({
                icon: 'error',
                title: t('Missing Information'),
                text: t('Please make sure all payment details are filled out correctly.'),
            });
            return;
        }
        const paymentData = await fetchPaymentData();
        if (!paymentData || paymentData.errMessage !== 'Success') {
            alert(t('Payment data is missing or failed!'));
            return;
        }

        const checkoutId = paymentData.checkout;
        console.log('checkoutId', checkoutId);

        if ((window as any).GeideaCheckout) {
            const GeideaCheckout = (window as any).GeideaCheckout;
            const payment = new GeideaCheckout(onSuccess, onError, onCancel);
            payment.startPayment(checkoutId);
        } else {
            setIsLoading(false);
            Swal.fire({
                icon: 'error',
                title: t('Script Not Loaded'),
                text: t('GeideaCheckout script is not loaded yet. Please try again later.'),
            });
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
                                    {PayMentStatus === 'Paid' && (
                                        <Button
                                            className="m-1"
                                            size="small"
                                            variant="contained"
                                            onClick={handlePrintVoucher}
                                            disabled={isVoucherLoading}
                                        >
                                            {isVoucherLoading ? (
                                                <>
                                                    {t('Loading...')} <Loading />
                                                </>
                                            ) : (
                                                t('Print Voucher')
                                            )}
                                        </Button>
                                    )}

                                    {PayMentStatus === 'Unpaid' && (
                                        <>
                                            <Button
                                                className="m-1"
                                                size="small"
                                                variant="contained"
                                                onClick={startPayment}
                                            >
                                                {isLoading ? (
                                                    <>
                                                        {t('Loading...')} <Loading />
                                                    </>
                                                ) : (
                                                    t('Pay Now')
                                                )}
                                            </Button>
                                        </>
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
