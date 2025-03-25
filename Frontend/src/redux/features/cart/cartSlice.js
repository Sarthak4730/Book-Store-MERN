import { createSlice } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';

const initialState = {
    cartItems: []
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            // SweetAlert2
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer);
                  toast.addEventListener('mouseleave', Swal.resumeTimer);
                }
            });

            const exists = state.cartItems.find( item => item.title === action.payload.title );
            if( !exists ){
                state.cartItems.push(action.payload);
                // alert(`${action.payload.title} added to cart successfully`);
                Toast.fire({
                    icon: "success",
                    title: `${action.payload.title} added to cart successfully`
                });
            }else{
                // alert(`${action.payload.title} ALREADY EXISTS IN CART`);
                Toast.fire({
                    icon: "warning",
                    title: `${action.payload.title} already exists in the cart`
                });
            }
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter( item => item.title !== action.payload.title );
        },
        clearCart: (state) => {
            state.cartItems = [];
        }
    }
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;