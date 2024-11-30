import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const FetchTourIncludingArApi = createApi({
    reducerPath: 'IncludingArData',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
    }),
    endpoints: builder => ({
        getIncludingAr: builder.query({
            query: ({ code, programyear }) => `/TourIncludingAR/${code}/${programyear}`,
        }),
    }),
});

export const { useGetIncludingArQuery } = FetchTourIncludingArApi;
