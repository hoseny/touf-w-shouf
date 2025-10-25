import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const FetchCountryArApi = createApi({
    reducerPath: 'CountryArData',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://test.com/ords/invoice/ProgAR/',
    }),
    endpoints: builder => ({
        getCountryAr: builder.query({
            query: () => 'getCountryAR',
        }),
    }),
});

export const { useGetCountryArQuery } = FetchCountryArApi;
