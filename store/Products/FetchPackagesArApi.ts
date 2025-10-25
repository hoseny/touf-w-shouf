import { Product } from '@/data/products';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const FetchPackagesArApi = createApi({
    reducerPath: 'PackageDataAr',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
    }),
    endpoints: builder => ({
        getPackageAr: builder.query<{ Packages: Product[] }, void>({
            query: () => '/PackageArabichh',
        }),
    }),
});

export const { useGetPackageArQuery } = FetchPackagesArApi;
