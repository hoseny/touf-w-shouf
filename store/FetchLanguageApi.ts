import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const FetchLanguageApi = createApi({
    reducerPath: 'LanguageData',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
    }),
    endpoints: builder => ({
        getLanguage: builder.query({
            query: () => `/language/`,
        }),
    }),
});

export const { useGetLanguageQuery } = FetchLanguageApi;
