import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const FetchPolicyArApi = createApi({
    reducerPath: 'PolicyArData',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
    }),
    endpoints: builder => ({
        getPolicyAr: builder.query({
            query: ({ code, programyear }) => `/programpolicyAR/${code}/${programyear}/Cancel`,
        }),
    }),
});

export const { useGetPolicyArQuery } = FetchPolicyArApi;
