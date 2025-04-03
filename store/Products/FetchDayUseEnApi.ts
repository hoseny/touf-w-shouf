import { Product } from '@/data/products';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const FetchDayUseEnApi = createApi({
    reducerPath: 'FetchDayUseEnApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
    }),
    endpoints: builder => ({
        getDayUseEn: builder.query<{
            item: any; DayUse: Product[] 
}, void>({
            query: () => '/programENG',
        }),
    }),
});

export const { useGetDayUseEnQuery } = FetchDayUseEnApi;
