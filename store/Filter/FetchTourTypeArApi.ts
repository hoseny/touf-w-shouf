import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const FetchTourTypeArApi = createApi({
    reducerPath: 'TourTypeArData',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://app.misrtravelco.net:4444/ords/invoice/programes/',
    }),
    endpoints: builder => ({
        getTourTypeAr: builder.query({
            query: () => 'tour_typeAR',
        }),
    }),
});

export const { useGetTourTypeArQuery } = FetchTourTypeArApi;
