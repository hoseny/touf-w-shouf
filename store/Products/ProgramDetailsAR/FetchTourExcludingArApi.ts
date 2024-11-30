import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const FetchTourExcludingArApi = createApi({
    reducerPath: 'TourExcludingArData',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
    }),
    endpoints: builder => ({
        getTourExcludingAr: builder.query({
            query: ({ code, programyear }) => `/TourExcluding/${code}/${programyear}`,
        }),
    }),
});

export const { useGetTourExcludingArQuery } = FetchTourExcludingArApi;
