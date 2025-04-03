import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const FetchVideo = createApi({
    reducerPath: 'videoData',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://app.misrtravelco.net:4444/ords/invoice/B1',
    }),
    endpoints: builder => ({
        getVideo: builder.query({
            query: ({ code, programyear }) => `/Vedio/${code}/${programyear}`,
        }),
    }),
});

export const { useGetVideoQuery } = FetchVideo;
