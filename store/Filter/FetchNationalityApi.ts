import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const FetchNationalityApi = createApi({
    reducerPath: 'NationalityData',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://app.misrtravelco.net:4444/ords/invoice/programes/',
    }),
    endpoints: builder => ({
        getNationality: builder.query({
            query: () => 'AllNationality',
        }),
    }),
});

export const { useGetNationalityQuery } = FetchNationalityApi;
