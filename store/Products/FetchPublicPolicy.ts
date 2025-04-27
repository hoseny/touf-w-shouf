import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const FetchPublicPolicy = createApi({
    reducerPath: 'PublicPolicyData',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
    }),
    endpoints: builder => ({
        getPublicPolicy: builder.query({
            query: ({ code, programyear }) => `/programpolicy/${code}/${programyear}/Public`,
        }),
    }),
});

export const { useGetPublicPolicyQuery } = FetchPublicPolicy;
