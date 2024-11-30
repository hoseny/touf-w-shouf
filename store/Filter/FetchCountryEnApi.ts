import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const FetchCountryEnApi = createApi({
    reducerPath: 'CountryData',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://app.misrtravelco.net:4444/ords/invoice/Region/',
    }),
    endpoints: builder => ({
        getCountryEn: builder.query({
            query: () => 'Country',
        }),
    }),
});

export const { useGetCountryEnQuery } = FetchCountryEnApi;
