import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const fetchLogoSlice = createApi({
    reducerPath: 'fetchLogoData',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://test.com',
    }),
    endpoints: builder => ({
        getLogo: builder.query({
            query: () => `/B1/Logo`, 
        }),
    }),
});

export const { useGetLogoQuery } = fetchLogoSlice;