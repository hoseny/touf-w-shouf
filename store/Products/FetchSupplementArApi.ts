import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const FetchSupplementArApi = createApi({
    reducerPath: 'SupplementArData',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
    }),
    endpoints: builder => ({
        getSupplementAr: builder.query({
            query: ({ code, programyear }) => `/ProgramIncludingAR/${code}/${programyear}`,
        }),
    }),
});

export const { useGetSupplementArQuery } = FetchSupplementArApi;
