import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const FetchPaidReservation = createApi({
    reducerPath: 'PaidReservationData',
    baseQuery: fetchBaseQuery({
        baseUrl: `https://app.misrtravelco.net:4444/ords/invoice/public/`,
    }),
    endpoints: builder => ({
        getPaidReservation: builder.query({
            query: (id) => `GetPayment?CustomerID=${id}`,
        }),
    }),
});

export const { useGetPaidReservationQuery } = FetchPaidReservation;
