import React, { FunctionComponent } from 'react';
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
                                    {/* {PayMentStatus !== 'Paid' && (
                                        <Button
                                            className="m-1"
                                            size="small"
                                            variant="contained"
                                            color="primary"
                                        >
                                            {t('Edit')}
                                        </Button>
                                    )} */}

                                    <Button
                                        className="m-1"
                                        size="small"
                                        variant="contained"
                                        color="secondary"
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

// import React, { FunctionComponent, useState } from 'react';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import Stack from '@mui/material/Stack';
// import Image from 'next/image';
// import { useTranslation } from 'react-i18next';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogTitle from '@mui/material/DialogTitle';
// interface Props {
//     customerName: string;
//     tripDate: string;
//     reservationNo: number;
//     PayMentStatus: string;
//     totalPayment: string;
//     Currany: string;
//     ProgramName: string;
//     IMG_Path: string;
//     PROG_YEAR: number;
//     priority?: boolean;
// }

// const ReservationItem: FunctionComponent<Props> = ({
//     customerName,
//     tripDate,
//     reservationNo,
//     PayMentStatus,
//     totalPayment,
//     Currany,
//     PROG_YEAR,
//     ProgramName,
//     IMG_Path,
//     priority = false,
// }) => {
//     const labelStyle = {
//         color: '#E07026',
//     };
//     const { t } = useTranslation();

//     const [openDialog, setOpenDialog] = useState(false);

//     const handleDialogOpen = () => setOpenDialog(true);
//     const handleDialogClose = () => setOpenDialog(false);

//     return (
//         <div style={{ height: '100%' }}>
//             <div className="container" style={{ height: '100%' }}>
//                 <div className="row" style={{ height: '100%' }}>
//                     <div className="col-md-12 card reservation-card p-3">
//                         <div className="row" style={{ height: '100%' }}>
//                             <div
//                                 className="col-12 col-lg-6"
//                                 style={{
//                                     display: 'flex',
//                                     alignItems: 'center',
//                                     justifyContent: 'center',
//                                 }}
//                             >
//                                 <div
//                                     className="reservation-img-box"
//                                     style={{ width: '100%', height: '100%', position: 'relative' }}
//                                 >
//                                     <Image
//                                         src={IMG_Path}
//                                         alt="banner"
//                                         layout="fill"
//                                         objectFit="cover"
//                                         style={{ borderRadius: '10px' }}
//                                     />
//                                 </div>
//                             </div>

//                             <div className="col-12 col-lg-6 card-body">
//                                 <Typography variant="body1">
//                                     <span style={labelStyle}>{t('Customer Name')} : </span>
//                                     {customerName}
//                                 </Typography>
//                                 <Typography variant="body1">
//                                     <span style={labelStyle}>{t('Program Name')} : </span>
//                                     {ProgramName}
//                                 </Typography>
//                                 <Typography variant="body1">
//                                     <span style={labelStyle}>{t('Program Year')} : </span>
//                                     {PROG_YEAR}
//                                 </Typography>
//                                 <Typography variant="body1">
//                                     <span style={labelStyle}>{t('Trip Date')} : </span>
//                                     {new Date(tripDate).toLocaleDateString('en-GB')}
//                                 </Typography>
//                                 <Typography variant="body1">
//                                     <span style={labelStyle}>{t('Reservation No')} : </span>
//                                     {reservationNo}
//                                 </Typography>
//                                 <Typography variant="body1">
//                                     <span style={labelStyle}>{t('Total Price')} : </span>
//                                     {totalPayment} {Currany}
//                                 </Typography>
//                                 <Typography
//                                     variant="body1"
//                                     color={PayMentStatus === 'Unpaid' ? 'error' : 'success'}
//                                 >
//                                     <span style={labelStyle}>{t('Status')} : </span>
//                                     {t(
//                                         PayMentStatus === 'Unpaid'
//                                             ? 'Pre invoice'
//                                             : PayMentStatus === 'Paid'
//                                             ? 'Invoice'
//                                             : PayMentStatus
//                                     )}
//                                 </Typography>

//                                 <Stack
//                                     direction="row"
//                                     spacing={2}
//                                     className="mt-3 d-flex flex-wrap"
//                                 >
//                                     {PayMentStatus !== 'Paid' && (
//                                         <Button
//                                             className="m-1"
//                                             size="small"
//                                             variant="contained"
//                                             color="primary"
//                                         >
//                                             {t('Edit')}
//                                         </Button>
//                                     )}

//                                     <Button
//                                         className="m-1"
//                                         size="small"
//                                         variant="contained"
//                                         color="secondary"
//                                         onClick={handleDialogOpen}
//                                     >
//                                         {t(
//                                             PayMentStatus === 'Paid'
//                                                 ? 'Print Invoice'
//                                                 : PayMentStatus === 'Unpaid'
//                                                 ? 'Print Pre Invoice'
//                                                 : 'Print'
//                                         )}
//                                     </Button>

//                                     {PayMentStatus !== 'Paid' && (
//                                         <Button
//                                             className="m-1"
//                                             size="small"
//                                             variant="outlined"
//                                             color="error"
//                                         >
//                                             {t('Cancel')}
//                                         </Button>
//                                     )}
//                                 </Stack>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Dialog for displaying the data */}
//             <Dialog open={openDialog} onClose={handleDialogClose}>
//                 <DialogTitle>{t('Reservation Details')}</DialogTitle>
//                 <DialogContent>
//                     <Typography variant="body1">
//                         {t('Customer Name')}: {customerName}
//                     </Typography>
//                     <Typography variant="body1">
//                         {t('Program Name')}: {ProgramName}
//                     </Typography>
//                     <Typography variant="body1">
//                         {t('Program Year')}: {PROG_YEAR}
//                     </Typography>
//                     <Typography variant="body1">
//                         {t('Trip Date')}: {new Date(tripDate).toLocaleDateString('en-GB')}
//                     </Typography>
//                     <Typography variant="body1">
//                         {t('Reservation No')}: {reservationNo}
//                     </Typography>
//                     <Typography variant="body1">
//                         {t('Total Price')}: {totalPayment} {Currany}
//                     </Typography>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleDialogClose} color="primary">
//                         {t('Close')}
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </div>
//     );
// };

// export default ReservationItem;
