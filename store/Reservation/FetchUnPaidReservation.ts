import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const FetchUnPaidReservation = createApi({
    reducerPath: 'UnPaidReservationData',
    baseQuery: fetchBaseQuery({
        baseUrl: `https://app.misrtravelco.net:4444/ords/invoice/public/`,
    }),
    endpoints: builder => ({
        getUnPaidReservation: builder.query({
            query: (id) => `getReservations?CustomerID=${id}`,
        }),
    }),
});

export const { useGetUnPaidReservationQuery } = FetchUnPaidReservation;
