import Navbar from "../../components/Navbar";
import { useSelector } from "react-redux";
import { useGetOrdersByEmailQuery } from "../../redux/features/orders/ordersApi";
import { useAuth } from "../../context/AuthContext";
import Loader from "../../components/Loader";

const OrdersPage = () => {
    const cartItems = useSelector(state => state.cart.cartItems);
    const { currentUser, loading } = useAuth();
    // console.log("currentUser: ", currentUser);
    
    const { data, isLoading, isError } = useGetOrdersByEmailQuery(currentUser?.email);
    if(isLoading) return <Loader />
    // console.log("data", data);
    const orders = data?.orders || [];
    // console.log("orders", orders);

    if(isLoading) return <h1>isLoading</h1>
    if(isError) {
        console.log(isError);
        return <div className="ml-[50vw] mt-[30vh]">
            <h1>Error: {isError}</h1>
        </div>
    }

    return <>
        <Navbar count={cartItems.length} />
        
        <div className="container my-[10vh] flex flex-col items-center w-[70vw] mx-auto">
            <p className="text-3xl font-bold mt-[3vh]">Your Orders: ({currentUser?.email})</p>
            {
                orders.length === 0 
                ? ( <p className="text-xl font-semibold my-[3vh]">No orders yet.</p> )
                : ( <div className="div-of-uls w-full my-[3vh] flex flex-col">
                        { orders.map( (o, index) => ( <ul>
                            <li className="flex flex-col justify-between h-[45vh] p-4 border-t-2 border-b-2 border-yellow-400" key={index}>
                                <p><span className="font-bold text-xl text-white bg-black p-2 rounded-full">#{index+1}</span></p>
                                <p><span className="font-bold">OrderId:</span> {o._id}</p>
                                <p><span className="font-bold">Name:</span> {o.name}</p>
                                {/* <p><span className="font-bold">Email:</span> {o?.email}</p> */}
                                <p><span className="font-bold">Phone Number:</span> {o.phoneNumber}</p>
                                <p><span className="font-bold">Address:</span> {o.address.area}, {o.address.city} - {o.address.pincode}, {o.address.state}</p>
                                <p><span className="font-bold">Product IDs:</span> <ul>{ o.productIds.map( (p, index) => ( <li key={index}> {p} </li> ) ) }</ul></p>
                                <p><span className="font-bold">Total Price:</span> ₹{o.totalPrice}</p>
                            </li> 
                        </ul> ) ) }
                </div> )
            }
        </div>
    </>
}

export default OrdersPage;