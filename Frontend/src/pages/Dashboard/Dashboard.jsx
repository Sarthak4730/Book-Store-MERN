import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router";
import { useDeleteBookMutation, useFetchAllBooksQuery } from "../../redux/features/books/booksApi";
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [data, setData] = useState("nothing yet");
    const [loading, setLoading] = useState(true);

    let { data: books, refetch } = useFetchAllBooksQuery();
    books = books?.books || [];
    const [ deleteBook ] = useDeleteBookMutation();
    const navigate = useNavigate();
    
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

    const handleDelete = async (id) => {
        try {
            await deleteBook(id).unwrap();
            alert("Book successfully deleted");
            refetch();
        } catch (error) {
            console.error("Failed to delete book", error);
            alert("Failed to delete book, try again");
        }
    }
    const handleEdit = (id) => {
        navigate(`/dashboard/edit-book/${id}`);
    }

    return <div className="w-[75vw] border-2 rounded-md mx-auto my-[10vh] flex flex-col justify-evenly items-center">
        <h1 className="text-3xl my-6">Dashboard</h1>
        
        <div className="stats text-lg flex w-[70vw] justify-between">
            <p><span className="font-bold">Total Orders</span> = {data.totalOrders}</p>
            <p><span className="font-bold">Total Book Valuation</span> = ₹{data.totalValue}</p>
            <p><span className="font-bold">Total Books</span> = {data.totalBooks}</p>
        </div>

        <div className="manage w-[70vw] my-6">
            <ul className="column-headings flex justify-between font-bold text-lg">
                <li>Title</li>
                <li>Category</li>
                <li>Price</li>
                <li>Actions</li>
            </ul>

            <ul className="book-rows flex flex-col gap-4">
            { books && books.map( (b,index) => (
                <li className="flex justify-between" key={index}>
                    <p>{b.title}</p>
                    <p>{b.genre}</p>
                    <p>{b.price}</p>
                    <div className="buttons flex w-[12vw] justify-evenly">
                        <button onClick={() => handleEdit(b._id)} className="cursor-pointer bg-blue-500 w-[5vw] h-[3vh] text-white font-bold rounded-md flex justify-center items-center hover:scale-110">Edit</button>
                        <button onClick={() => handleDelete(b._id)} className="cursor-pointer bg-red-500 w-[5vw] h-[3vh] text-white font-bold rounded-md flex justify-center items-center hover:scale-110">Delete</button>
                    </div>
                </li>
            ) ) }
            </ul>
        </div>

        <Link to="/">
            <div className="w-[12vw] h-[5vh] bg-yellow-400 text-xl font-semibold flex justify-center items-center rounded-md py-1 hover:scale-110 my-6">
                Go to Homepage
            </div>
        </Link>
    </div>
}

export default Dashboard;