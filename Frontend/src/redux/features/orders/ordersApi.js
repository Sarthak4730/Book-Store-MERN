import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const ordersApi = createApi({
    reducerPath: 'ordersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_API_URL}/api/orders`,
        // baseUrl: 'https://ccp-by-sk.vercel.app/api/orders',
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