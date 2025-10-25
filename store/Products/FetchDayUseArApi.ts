import { Product } from '@/data/products';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const FetchDayUseArApi = createApi({
    reducerPath: 'FetchDayUseArApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
    }),
    endpoints: builder => ({
        getDayUseAr: builder.query<{ DayUse: Product[] }, void>({
            query: () => '/',
        }),
    }),
});

export const { useGetDayUseArQuery } = FetchDayUseArApi;
