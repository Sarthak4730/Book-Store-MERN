import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/Loader";

const Dashboard = () => {
    const [data, setData] = useState("nothing yet");
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchData = async () => {  
            try {
                const response = await axios.get("http://localhost:3000/api/admin", {
                    headers: {
                        "Authorization": ` Bearer ${ localStorage.getItem("token") } `,
                        "Content-Type": "application/json"
                    }
                });

                setData(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error:", error);
            }
        };
        
        fetchData();
    }, []);

    if(loading) return <Loader />

    return <div className="w-[50vw] h-[50vh] border-2 rounded-md mx-auto mt-[20vh] flex flex-col justify-evenly items-center">
        <h1 className="text-3xl">Dashboard</h1>
        
        <div className="stats text-lg flex w-[45vw] justify-between">
            <p><span className="font-bold">Total Orders</span> = {data.totalOrders}</p>
            <p><span className="font-bold">Total Sales</span> = ₹{data.totalSales}</p>
            <p><span className="font-bold">Total Books</span> = {data.totalBooks}</p>
        </div>
    </div>
}

export default Dashboard;