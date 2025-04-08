import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router";
import { useDeleteBookMutation, useFetchAllBooksQuery } from "../../redux/features/books/booksApi";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

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

    const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
    });

    const handleDelete = async (id) => {
        try {
            await deleteBook(id).unwrap();
            // alert("Book successfully deleted");
            Toast.fire({
                icon: "success",
                title: "Book successfully deleted"
            });
            refetch();
        } catch (error) {
            console.error("Failed to delete book", error);
            alert("Failed to delete book, try again");
        }
    }
    const handleEdit = (id) => {
        navigate(`/dashboard/edit-book/${id}`);
    }

    return <div className="w-[75vw] border-2 rounded-md mx-auto my-[5vh] flex flex-col justify-evenly items-center">
        <div className="first-line w-[70vw] flex justify-between my-6">
            <h1 className="text-3xl decoration-4 underline underline-offset-4 decoration-yellow-400">Dashboard</h1>
            
            <div className="buttons flex justify-between items-center w-[21.5vw]">
                <Link to="/dashboard/add-new-book">
                    <div className="w-[10vw] h-[5vh] bg-yellow-400 text-xl font-semibold flex justify-center items-center rounded-md py-1 hover:scale-110">
                        Add New Book
                    </div>
                </Link>
                <Link to="/">
                    <div className="w-[10vw] h-[5vh] bg-yellow-400 text-xl font-semibold flex justify-evenly items-center rounded-md py-1 hover:scale-110">
                        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24"><g fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}><path strokeDasharray={16} strokeDashoffset={16} d="M5 21h14"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="16;0"></animate></path><path strokeDasharray={14} strokeDashoffset={14} d="M5 21v-13M19 21v-13"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.2s" dur="0.2s" values="14;0"></animate></path><path strokeDasharray={28} strokeDashoffset={28} d="M2 10l10 -8l10 8"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.4s" dur="0.6s" values="28;0"></animate></path></g></svg> 
                        <p>Homepage</p>
                    </div>
                </Link>
            </div>
        </div>
        
        <div className="stats text-lg flex w-[70vw] justify-between">
            <p><span className="font-bold">Total Orders</span> = {data.totalOrders}</p>
            <p><span className="font-bold">Total Book Valuation</span> = ₹{data.totalValue}</p>
            <p><span className="font-bold">Total Books</span> = {data.totalBooks}</p>
        </div>

        <table className="manage w-[70vw] mt-6">
            <thead>
                <tr className="column-headings font-bold text-lg h-[7vh] border-y-4 border-yellow-400">
                    <th className="w-[30vw] text-start">Title</th>
                    <th className="w-[20vw] text-start">Category</th>
                    <th className="w-[9vw] text-start">Price</th>
                    <th  className="w-[11vw] text-start">Actions</th>
                </tr>
            </thead>

            <tbody>
            { books && books.map( (b,index) => (
                <tr key={index} className="book-rows h-[7.5vh]">
                    <td className="w-[30vw]">{b.title}</td>
                    <td className="w-[20vw]">{b.genre}</td>
                    <td className="w-[9vw]">{b.price}</td>
                    <td className="flex w-[11vw] h-[7.5vh] items-center justify-between">
                        <button onClick={() => handleEdit(b._id)} className="cursor-pointer bg-blue-500 w-[5vw] h-[4vh] text-white font-bold rounded-md flex justify-center items-center hover:scale-110">Edit</button>
                        <button onClick={() => handleDelete(b._id)} className="cursor-pointer bg-red-500 w-[5vw] h-[4vh] text-white font-bold rounded-md flex justify-center items-center hover:scale-110">Delete</button>
                    </td>
                </tr>
            ) ) }
            </tbody>
        </table>
    </div>
}

export default Dashboard;