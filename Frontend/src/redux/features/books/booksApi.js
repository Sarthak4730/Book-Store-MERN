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
        addBook: builder.mutation ({
            query: (data) => ({
                url: '/create-book',
                method: 'POST',
                body: data,
                credentials: 'include',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    'Content-Type': 'application/json',
                }
            }),
            invalidatesTags: ['Books']
        }),
        updateBook: builder.mutation ({
            query: ( { id, data } ) => ({
                url: `/update-book/${id}`,
                method: 'PUT',
                body: data,
                credentials: 'include',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ['Books']
        }),
        fetchOneBook: builder.query({
            query: (id) => `/get-specific-book/${id}`,
            providesTags: ['Books']
        })
    })
});

export const { useFetchAllBooksQuery, useDeleteBookMutation, useAddBookMutation, useUpdateBookMutation, useFetchOneBookQuery } = booksApi;
export default booksApi;