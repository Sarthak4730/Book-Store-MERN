import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartItems: []
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const exists = state.cartItems.find( item => item.title === action.payload.title );
            if( !exists ){
                state.cartItems.push(action.payload);
                alert("item added to cart successfully");
            }else{
                alert("ITEM ALREADY EXISTS IN CART")
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