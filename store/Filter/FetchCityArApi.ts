import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const FetchCityArApi = createApi({
    reducerPath: 'CityArData',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://test.com/ords/invoice/ProgAR/',
    }),
    endpoints: builder => ({
        getCityAr: builder.query({
            query: ({ Country, Region }) => `/getCityAR/${Country}/${Region}`,
        }),
    }),
});

export const { useGetCityArQuery } = FetchCityArApi;
