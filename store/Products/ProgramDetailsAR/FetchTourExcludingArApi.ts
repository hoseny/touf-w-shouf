import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const FetchTourExcludingArApi = createApi({
    reducerPath: 'ExcludingArData',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
    }),
    endpoints: builder => ({
        getExcludingAr: builder.query({
            query: ({ code, programyear }) => `/TourExcludingِAR/${code}/${programyear}`,
        }),
    }),
});

export const { useGetExcludingArQuery } = FetchTourExcludingArApi;
