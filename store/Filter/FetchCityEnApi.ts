import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const FetchCityEnApi = createApi({
    reducerPath: 'CityEnData',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://app.misrtravelco.net:4444/ords/invoice/Region/',
    }),
    endpoints: builder => ({
        getCityEn: builder.query({
            query: ({ Country, Region }) => `/City/${Country}/${Region}`,
        }),
    }),
});

export const { useGetCityEnQuery } = FetchCityEnApi;
