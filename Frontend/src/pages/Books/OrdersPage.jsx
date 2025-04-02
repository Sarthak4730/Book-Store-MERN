import Navbar from "../../components/Navbar";
import { useSelector } from "react-redux";
import { useGetOrdersByEmailQuery } from "../../redux/features/orders/ordersApi";
import { useAuth } from "../../context/AuthContext";

const OrdersPage = () => {
    const cartItems = useSelector(state => state.cart.cartItems);
    const { currentUser, loading } = useAuth();
    // console.log("currentUser: ", currentUser);
    
    const { data, isLoading, isError } = useGetOrdersByEmailQuery(currentUser.email);
    // console.log("data", data);
    const orders = data?.orders || [];
    // console.log("orders", orders);

    if(isLoading) return <h1>isLoading</h1>
    if(isError) return <h1>isError</h1>

    return <>
        <Navbar count={cartItems.length} />
        
        <div className="container my-[10vh] flex flex-col items-center w-[70vw] mx-auto border-2 border-black">
            <p className="text-2xl font-bold my-[3vh]">Your Orders</p>
            {
                orders.length === 0 
                ? (<p className="text-xl font-semibold">No orders yet.</p>)
                : (<div className="div-of-uls w-full my-[3vh] flex flex-wrap justify-evenly gap-4">
                        { orders.map( (o, index) => ( <ul className="bg-yellow-400 w-[20vw] flex justify-center py-4 rounded-lg">
                            <li key={index}>
                                <p><span className="font-bold">OrderId:</span> {o._id}</p>
                                <p><span className="font-bold">Name:</span> {o.name}</p>
                                <p><span className="font-bold">Email:</span> {o.email}</p>
                                <p><span className="font-bold">Phone Number:</span> {o.phoneNumber}</p>
                                <p><span className="font-bold">Address:</span> <div>{o.address.area} <br /> {o.address.city} - {o.address.pincode} <br /> {o.address.state}</div></p>
                                <p><span className="font-bold">Product IDs:</span> <ul>{ o.productIds.map( (p, index) => ( <li key={index}> {p} </li> ) ) }</ul></p>
                                <p><span className="font-bold">Total Price:</span> {o.totalPrice}</p>
                            </li> 
                        </ul> ) ) }
                </div>)
            }
        </div>
    </>
}

export default OrdersPage;