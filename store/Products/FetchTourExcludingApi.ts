import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const FetchTourExcludingApi = createApi({
    reducerPath: 'ExcludingData',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
    }),
    endpoints: builder => ({
        getExcluding: builder.query({
            query: ({ code, programyear }) => `/TOUREXCLUDING/${code}/${programyear}`,
        }),
    }),
});

export const { useGetExcludingQuery } = FetchTourExcludingApi;
