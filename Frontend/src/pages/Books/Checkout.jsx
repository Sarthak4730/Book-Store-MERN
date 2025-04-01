import Navbar from "../../components/Navbar";
import { useSelector } from "react-redux";

import { useAuth } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import { useCreateOrderMutation } from "../../redux/features/orders/ordersApi";
import Swal from 'sweetalert2';

const CartPage = () => {
    const cartItems = useSelector(state => state.cart.cartItems);
    
    const { currentUser } = useAuth(null);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const [ createOrder, {isLoading, error} ] = useCreateOrderMutation();

    const rupeeRemovedTotal = () => {
        const rupeeRemoved = cartItems.map(item => {
            return parseInt( item.price.replace('₹', '') )
        });
        return rupeeRemoved.reduce( (sum, i) => sum + i, 0 );
    }
    
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
    });

    const onSubmit = async (data) => {
        const newOrder = {
            name: data.fullname,
            email: currentUser.email,
            phoneNumber: data.phonenumber,
            address: {
                area: data.area,
                city: data.city,
                state: data.state,
                pincode: data.pincode
            },
            productIds: cartItems.map(item => item._id),
            totalPrice: rupeeRemovedTotal()
        };

        try {
            await createOrder(newOrder).unwrap();
            // alert("Success in placing order");
            Toast.fire({
                icon: "success",
                title: `Success in placing order`
            });
        } catch (error) {
            console.error("Error sending newOrder to backend\n", error);
            // alert("Failed to place order");
            Toast.fire({
                icon: "error",
                title: `Failed to place order`
            });
        }
    }

    return <>
        <Navbar count={cartItems.length} />
        
        <div className="container mt-[15vh] flex justify-evenly">
            <div className="top">
                <p className="text-2xl font-bold">Cash On Delivery</p>
                <p className="text-lg">Total Price: ₹{ rupeeRemovedTotal() }</p>
                <p className="text-lg">Items: {cartItems.length}</p>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="bottom w-[50vw] h-[75vh] border-2 border-black flex flex-col justify-evenly items-center text-lg">
                <p className="text-2xl font-bold">Personal Details</p>
                
                <div className="input-div w-[40vw] flex justify-between">
                    <label htmlFor="fullname">Full Name</label>
                    <input {...register("fullname", { required: true })} className="pl-3 border-2 border-black w-[30vw] rounded-lg" type="text" id="fullname"/>
                </div>

                <div className="input-div w-[40vw] flex justify-between">
                    <label htmlFor="email">Email</label>
                    {/* <input {...register("email", { required: true })} className="pl-3 border-2 border-black w-[30vw] rounded-lg" type="email" id="email"/> */}
                    <div className="email-div bg-gray-400 text-gray-800 pl-3 border-2 border-black w-[30vw] rounded-lg">{ currentUser.email }</div>
                </div>
                
                <div className="input-div w-[40vw] flex justify-between">
                    <label htmlFor="phonenumber">Phone Number</label>
                    <input {...register("phonenumber", { required: true })} className="pl-3 border-2 border-black w-[30vw] rounded-lg" type="number" id="phonenumber"/>
                </div>
                
                <div className="input-div w-[40vw] flex justify-between">
                    <label htmlFor="area">Area</label>
                    <input {...register("area", { required: true })} className="pl-3 border-2 border-black w-[30vw] rounded-lg" type="text" id="area"/>
                </div>
                
                <div className="input-div w-[40vw] flex justify-between">
                    <label htmlFor="city">City</label>
                    <input {...register("city", { required: true })} className="pl-3 border-2 border-black w-[30vw] rounded-lg" type="text" id="city"/>
                </div>
                
                <div className="input-div w-[40vw] flex justify-between">
                    <label htmlFor="state">State</label>
                    <select {...register("state", { required: true })} className="pl-3 border-2 border-black w-[30vw] rounded-lg" id="state">
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                        <option value="Assam">Assam</option>
                        <option value="Bihar">Bihar</option>
                        <option value="Chhattisgarh">Chhattisgarh</option>
                        <option value="Goa">Goa</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Himachal Pradesh">Himachal Pradesh</option>
                        <option value="Jharkhand">Jharkhand</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Kerala">Kerala</option>
                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Manipur">Manipur</option>
                        <option value="Meghalaya">Meghalaya</option>
                        <option value="Mizoram">Mizoram</option>
                        <option value="Nagaland">Nagaland</option>
                        <option value="Odisha">Odisha</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Sikkim">Sikkim</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Telangana">Telangana</option>
                        <option value="Tripura">Tripura</option>
                        <option value="Uttarakhand">Uttarakhand</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="West Bengal">West Bengal</option>
                        <option value="Andaman Nicobar">Andaman Nicobar</option>
                        <option value="Chandigarh">Chandigarh</option>
                        <option value="Daman Diu">Daman Diu</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Jammu Kashmir">Jammu Kashmir</option>
                        <option value="Ladakh">Ladakh</option>
                        <option value="Lakshadweep">Lakshadweep</option>
                        <option value="Puducherry">Puducherry</option>
                    </select>
                </div>
                
                <div className="input-div w-[40vw] flex justify-between">
                    <label htmlFor="pincode">Pincode</label>
                    <input {...register("pincode", { required: true })} className="pl-3 border-2 border-black w-[30vw] rounded-lg" type="number" id="pincode"/>
                </div>
                
                <button className="cursor-pointer hover:scale-110 bg-blue-500 w-[7.5vw] h-[5vh] text-white font-bold rounded-md my-4" type="submit">Place Order</button>
            </form>
        </div>
    </>
}

export default CartPage;