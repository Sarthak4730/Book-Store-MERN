import Navbar from "../../components/Navbar";
import { useSelector } from "react-redux";
import { useGetOrdersByEmailQuery } from "../../redux/features/orders/ordersApi";

const OrdersPage = () => {
    const cartItems = useSelector(state => state.cart.cartItems);
    const { data: orders=[], isLoading, isError } = useGetOrdersByEmailQuery();
    console.log(orders);

    return <>
        <Navbar count={cartItems.length} />
        
        {/* <ul>
            { orders.map( (o, index) => {
                return <li key={index}> {o} </li>
            }) }
        </ul> */}
        hello orders
    </>
}

export default OrdersPage;