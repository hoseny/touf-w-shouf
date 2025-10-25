import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const FetchTourTypeApi = createApi({
    reducerPath: 'TourTypeData',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://test.com:4444/ords/invoice/programes/',
    }),
    endpoints: builder => ({
        getTourType: builder.query({
            query: () => 'tour_type',
        }),
    }),
});

export const { useGetTourTypeQuery } = FetchTourTypeApi;
