import { Product } from '@/data/products';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const FetchPackagesEnApi = createApi({
    reducerPath: 'PackageDataEn',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
    }),
    endpoints: builder => ({
        getPackageEn: builder.query<{ packages: Product[] }, void>({
            query: () => '/Packkages',
        }),
    }),
});

export const { useGetPackageEnQuery } = FetchPackagesEnApi;
