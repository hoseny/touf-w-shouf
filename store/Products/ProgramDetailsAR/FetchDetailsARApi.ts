import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const FetchDetailsARApi = createApi({
    reducerPath: 'DetailsArData',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
    }),
    endpoints: builder => ({
        getDetailsAr: builder.query({
            query: ({ code, programyear, languagecode }) =>
                `/programDtlsAR/${code}/${programyear}/${languagecode}`,
        }),
    }),
});

export const { useGetDetailsArQuery } = FetchDetailsARApi;
