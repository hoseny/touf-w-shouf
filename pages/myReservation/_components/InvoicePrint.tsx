// components/InvoicePrint.tsx
import React from 'react';

interface InvoicePrintProps {
    customerName: string;
    tripDate: string;
    reservationNo: number;
    PayMentStatus: string;
    totalPayment: string;
    Currany: string;
    ProgramName: string;
    PROG_YEAR: number;
}

export const InvoicePrint: React.FC<InvoicePrintProps> = ({
    customerName,
    tripDate,
    reservationNo,
    PayMentStatus,
    totalPayment,
    Currany,
    ProgramName,
    PROG_YEAR,
}) => {
    return (
        <div
            className="invoice-print"
            style={{
                padding: '20px',
                fontFamily: 'Arial',
                display: 'none', // مخفي بشكل افتراضي
            }}
        >
            <h1 style={{ color: '#E07026', textAlign: 'center' }}>
                {PayMentStatus === 'Paid' ? 'INVOICE' : 'PRE-INVOICE'}
            </h1>
            <hr />
            <p>
                <strong>Customer Name:</strong> {customerName}
            </p>
            <p>
                <strong>Program Name:</strong> {ProgramName}
            </p>
            <p>
                <strong>Reservation No:</strong> {reservationNo}
            </p>
            <p>
                <strong>Trip Date:</strong> {new Date(tripDate).toLocaleDateString('en-GB')}
            </p>
            <p>
                <strong>Total Price:</strong> {totalPayment} {Currany}
            </p>
            <hr />
            <p style={{ textAlign: 'right', marginTop: '30px' }}>
                {new Date().toLocaleDateString()}
            </p>
        </div>
    );
};
