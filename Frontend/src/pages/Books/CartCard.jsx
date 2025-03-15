import React from 'react'
import { useDispatch } from "react-redux";
import { removeFromCart } from "../../redux/features/cart/cartSlice";

const CartCard = ({ book }) => {
  const dispatch = useDispatch(book);

  return (
    <div className='my-2 flex justify-between'>
      <div className="left flex">
        <img className="h-[26vh] w-[8vw]" src={book.image} />

        <div className="info ml-4 text-lg">
            <h1><b>Title:</b> {book.title}</h1>

            <h2><b>Genre:</b> {book.genre}</h2>
        </div>
      </div>

      <div className="info mr-5 text-lg">
        <h3 className='text-3xl'>{book.price}</h3>

        <button onClick={() => dispatch( removeFromCart(book) )} className='mt-10 bg-red-500 w-[7.5vw] h-[5vh] text-lg text-white font-semibold rounded-md cursor-pointer hover:scale-110'>Remove</button>
      </div>
    </div>
  )
}

export default CartCard;