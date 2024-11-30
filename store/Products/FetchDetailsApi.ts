import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const FetchDetailsApi = createApi({
    reducerPath: 'DetailsData',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
    }),
    endpoints: builder => ({
        getDetails: builder.query({
            query: ({ code, programyear, languagecode }) =>
                `/detailsesProgram/${code}/${programyear}/${languagecode}`,
        }),
    }),
});

export const { useGetDetailsQuery } = FetchDetailsApi;
