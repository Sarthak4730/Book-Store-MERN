import Navbar from "../../components/Navbar";
import { useSelector } from "react-redux";
import { useGetOrdersByEmailQuery } from "../../redux/features/orders/ordersApi";
import { useAuth } from "../../context/AuthContext";

const OrdersPage = () => {
    const cartItems = useSelector(state => state.cart.cartItems);
    const { currentUser, loading } = useAuth();
    // console.log(currentUser);

    if (loading) console.log("Loading User");
    
    const { data, isLoading, isError } = useGetOrdersByEmailQuery(currentUser);
    console.log(data);
    const orders = data?.orders || [];

    if(isLoading) return <h1>isLoading</h1>
    if(isError) return <h1>isError</h1>
    // console.log(orders);

    return <>
        <Navbar count={cartItems.length} />
        
        <div className="container mt-[10vh] flex justify-center w-[50vw] h-[75vh] border-2 border-black mx-auto">
            <p className="text-2xl font-bold">Your Orders</p>
            {
                orders.length === 0 
                ? (<p className="text-xl font-semibold">No orders yet.</p>)
                : (<ul>
                    { orders.map( (o, index) => ( <li key={index}>
                        <p>OrderId: {o._id}</p>
                        <p>Name: {o.name}</p>
                        <p>Email: {o.email}</p>
                        <p>Phone Number: {o.phoneNumber}</p>
                        <p>Address: {o.address}</p>
                        <p>Product IDs: {o.productIds}</p>
                        <p>Total Price: {o.totalPrice}</p>
                    </li> ) ) }
                </ul>)
            }
        </div>
    </>
}

export default OrdersPage;