import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ 
    baseUrl: 'http://localhost:3000/api/books',
    credentials: 'include',
    prepareHeaders: (Headers) => {
        const token = localStorage.getItem('token');
        if(token){
            Headers.set('Authorization', `Bearer ${token}`);
        }
        return Headers; 
    }
});

const booksApi = createApi({
    reducerPath: 'booksApi',
    baseQuery,
    tagTypes: ['Books'],
    endpoints: (builder) => ({
        fetchAllBooks: builder.query({
            query: () => '/',
            providesTags: ['Books']
        }),
        deleteBook: builder.mutation ({
            query: (id) => ({
                url: `/delete-book/${id}`,
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                }
            }),
            invalidatesTags: ['Books']
        }),
    })
});

export const { useFetchAllBooksQuery, useDeleteBookMutation } = booksApi;
export default booksApi;