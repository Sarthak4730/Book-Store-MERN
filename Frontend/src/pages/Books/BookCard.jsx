import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/features/cart/cartSlice'

export const BookCard = ( {book} ) => {
    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        dispatch( addToCart(product) )
    }

    return <div className="bg-yellow-300 w-[20vw] h-[80vh] m-6 flex flex-col justify-between p-3 rounded-xl relative">
        <img className="h-[50vh]" src={book.image} />
        
        <button onClick={() => handleAddToCart(book)} className="bg-white w-[7.5vw] h-[5vh] absolute top-82 right-5 rounded-md cursor-pointer hover:scale-110 font-semibold border-3 border-black">Add to Cart</button>
        
        <h3><b>Title:</b> {book.title}</h3>
        <h3><b>Author:</b> {book.author}</h3>
        <h3><b>First Published:</b> {book.first_published}</h3>
        <h3><b>Approximate Sales:</b> {book.approximate_sales}</h3>
        <h3><b>Original Language:</b> {book.original_language}</h3>
        <h3><b>Price:</b> <span className='text-xl'>{book.price}</span></h3>
    </div>
}