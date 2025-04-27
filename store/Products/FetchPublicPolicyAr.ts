import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const FetchPublicPolicyArApi = createApi({
    reducerPath: 'PublicPolicyArData',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
    }),
    endpoints: builder => ({
        getPublicPolicyAr: builder.query({
            query: ({ code, programyear }) => `/programpolicyAR/${code}/${programyear}/Public`,
        }),
    }),
});

export const { useGetPublicPolicyArQuery } = FetchPublicPolicyArApi;
