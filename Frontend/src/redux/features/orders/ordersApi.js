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
        }),
        getOrdersByEmail: builder.query ({
            query: email => ({
                url: `/get-orders/${email}`
            }),
            providesTags: ['Orders']
        })
    })
})

export const { useCreateOrderMutation, useGetOrdersByEmailQuery } = ordersApi;
export default ordersApi;