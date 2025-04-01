import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const ordersApi = createApi({
    reducerPath: 'ordersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/api/orders',
        credentials: 'include'
    }),
    tagTypes: ['Orders'],
    endpoints: (builder) => ({
        createOrder: builder.mutation ({
            query: newOrder => ({
                url: "/create-order",
                method: "POST",
                body: newOrder,
                credentials: 'include'
            })
        })
    })
})

export const { useCreateOrderMutation } = ordersApi;
export default ordersApi;