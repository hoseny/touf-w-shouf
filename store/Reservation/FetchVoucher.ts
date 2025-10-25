import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const FetchVoucher = createApi({
    reducerPath: 'VoucherData',
    baseQuery: fetchBaseQuery({
        baseUrl: `https://app.misrtravelco.net:4444/ords/invoice/`,
    }),
    endpoints: builder => ({
        getVoucher: builder.query({
            query: ReservationNo => `voucher/v5?ResNO=${ReservationNo}`,
        }),
    }),
});

export const { useGetVoucherQuery, useLazyGetVoucherQuery } = FetchVoucher;
