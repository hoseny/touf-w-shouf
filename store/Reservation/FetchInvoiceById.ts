import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const FetchInvoiceById = createApi({
    reducerPath: 'InvoiceData',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://app.misrtravelco.net:4444/ords',
    }),
    endpoints: builder => ({
        getInvoice: builder.query({
            query: ({ id }) => `/invoice/v5/inv/${id}`,
        }),
    }),
});

export const { useGetInvoiceQuery } = FetchInvoiceById;
