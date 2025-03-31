import Navbar from "../../components/Navbar";
import { useSelector } from "react-redux";

const CartPage = () => {
    const cartItems = useSelector(state => state.cart.cartItems);

    function removeRupeeTotal(){
        const rupeeRemoved = cartItems.map(item => {
            return parseInt( item.price.replace('₹', '') )
        });
        return rupeeRemoved.reduce( (sum, i) => sum + i, 0 );
    }

    return <>
        <Navbar count={cartItems.length} />
        
        <div className="container mt-[15vh] flex justify-evenly">
            <div className="top">
                <p className="text-2xl font-bold">Cash On Delivery</p>
                <p className="text-lg">Total Price: ₹{ removeRupeeTotal() }</p>
                <p className="text-lg">Items: {cartItems.length}</p>
            </div>
            
            <form className="bottom w-[50vw] h-[75vh] border-2 border-black flex flex-col justify-evenly items-center text-lg">
                <p className="text-2xl font-bold">Personal Details</p>
                
                <div className="input-div w-[25vw] flex justify-between">
                    <label htmlFor="fullname">Full Name</label>
                    <input className="pl-3 border-2 border-black w-[15vw] rounded-lg" type="text" id="fullname"/>
                </div>

                <div className="input-div w-[25vw] flex justify-between">
                    <label htmlFor="email">Email</label>
                    <input className="pl-3 border-2 border-black w-[15vw] rounded-lg" type="email" id="email"/>
                </div>
                
                <div className="input-div w-[25vw] flex justify-between">
                    <label htmlFor="phonenumber">Phone Number</label>
                    <input className="pl-3 border-2 border-black w-[15vw] rounded-lg" type="number" id="phonenumber"/>
                </div>
                
                <div className="input-div w-[25vw] flex justify-between">
                    <label htmlFor="address">Address</label>
                    <input className="pl-3 border-2 border-black w-[15vw] rounded-lg" type="text" id="address"/>
                </div>
                
                <div className="input-div w-[25vw] flex justify-between">
                    <label htmlFor="city">City</label>
                    <input className="pl-3 border-2 border-black w-[15vw] rounded-lg" type="text" id="city"/>
                </div>
                
                <div className="input-div w-[25vw] flex justify-between">
                    <label htmlFor="state">State</label>
                    <select className="pl-3 border-2 border-black w-[15vw] rounded-lg" id="state">
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
                
                <div className="input-div w-[25vw] flex justify-between">
                    <label htmlFor="pincode">Pincode</label>
                    <input className="pl-3 border-2 border-black w-[15vw] rounded-lg" type="number" id="pincode"/>
                </div>
                
                <button className="cursor-pointer hover:scale-110 bg-blue-500 w-[7.5vw] h-[5vh] text-white font-bold rounded-md my-4" type="submit">Place Order</button>
            </form>
        </div>
    </>
}

export default CartPage;