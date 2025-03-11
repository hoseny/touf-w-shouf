import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const fetchLogoSlice = createApi({
    reducerPath: 'fetchLogoData',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://app.misrtravelco.net:4444/ords/invoice',
    }),
    endpoints: builder => ({
        getLogo: builder.query({
            query: () => `/B1/Logo`, 
        }),
    }),
});

export const { useGetLogoQuery } = fetchLogoSlice;