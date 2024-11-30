import { Product } from '@/data/products';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const FetchDayUseApi = createApi({
    reducerPath: 'ProductsDayUse',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
    }),
    endpoints: builder => ({
        getDayUse: builder.query<{
            item: any; DayUse: Product[] 
}, void>({
            query: () => '/ProgramArabic',
        }),
    }),
});

export const { useGetDayUseQuery } = FetchDayUseApi;
