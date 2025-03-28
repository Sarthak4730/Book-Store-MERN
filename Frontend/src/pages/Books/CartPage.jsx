import Navbar from "../../components/Navbar";
import CartCard from "./CartCard";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../redux/features/cart/cartSlice";

const CartPage = () => {
    const cartItems = useSelector(state => state.cart.cartItems);
    const dispatch = useDispatch();
    
    function removeRupeeTotal(){
        const rupeeRemoved = cartItems.map(item => {
            return parseInt( item.price.replace('₹', '') )
        });
        return rupeeRemoved.reduce( (sum, i) => sum + i, 0 );
    }

    return <>
        <Navbar count={cartItems.length} />
        
        {
            cartItems.length > 0
            ?   <div className="box mx-auto mt-[10vh] w-[80vw] h-[86vh] px-5 py-5 flex flex-col justify-between border-2 rounded-md border-black">
                    <div className="firstLine flex justify-between">
                        <h1 className="text-2xl font-semibold">Shopping Cart</h1>

                        <button onClick={() => dispatch( clearCart() )} className='bg-black w-[10vw] h-[5vh] text-lg text-white font-semibold rounded-md cursor-pointer hover:text-black hover:bg-white hover:border-2 hover:border-black'>Clear Cart</button>
                    </div>
                    
                    <div className="bookList my-5 h-[60vh] overflow-y-scroll">
                        {
                            cartItems.map( (item, index) => (
                                <CartCard key={index} book={item} />
                            ) )
                        }
                    </div>
                    
                    <div className="checkout">
                        <div className="totalDiv flex ml-[35vw] mb-4">
                            <h3 className="text-2xl font-bold mr-4 pt-1 underline decoration-green-400 decoration-4">Total:</h3>

                            <h3 className="text-3xl font-bold [text-shadow:3px_3px_5px_rgba(0,0,0,0.3)]"> ₹{ removeRupeeTotal() } </h3>
                        </div>
                        
                        <button className='bg-green-400 w-[78vw] h-[8vh] text-xl font-semibold rounded-md cursor-pointer hover:bg-black hover:text-yellow-300'>Checkout</button>
                    </div>
                </div>
            :   <h1 className="ml-[32vw] mt-[46vh] text-5xl font-semibold"> No products added to cart </h1>
        }
    </>
}

export default CartPage;