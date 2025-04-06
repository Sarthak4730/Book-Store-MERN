import { useForm } from "react-hook-form";
import { useAddBookMutation } from "../../redux/features/books/booksApi";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const AddNewBook = () => {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    const [ addBook ] = useAddBookMutation();

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

    const onSubmit = async (data) => {
        console.log("data:", data);
        
        try {
            await addBook(data).unwrap();
            Toast.fire({
                icon: "success",
                title: "New Book Added Successfully"
            });
            navigate("/dashboard");            
        } catch (err) {
            console.error("Failed to add book:", err);
            alert("token expired, log in again");
            navigate("/admin");
        }
    }

    return <form onSubmit={handleSubmit(onSubmit)} className="mt-[10vh] mx-auto w-[75vw] h-[75vh] border-2 border-black flex flex-col justify-evenly items-center text-lg">
        <p className="text-2xl font-bold">Add New Book</p>
        
        <div className="input-div w-[60vw] flex justify-between">
            <label htmlFor="title">Title</label>
            <input {...register("title", { required: true })} className="pl-3 border-2 border-black w-[30vw] rounded-lg" type="text" id="title"/>
        </div>

        <div className="input-div w-[60vw] flex justify-between">
            <label htmlFor="author">Author</label>
            <input {...register("author", { required: true })} className="pl-3 border-2 border-black w-[30vw] rounded-lg" type="text" id="author"/>
        </div>

        <div className="input-div w-[60vw] flex justify-between">
            <label htmlFor="originalLanguage">Original Language</label>
            <input {...register("originalLanguage", { required: true })} className="pl-3 border-2 border-black w-[30vw] rounded-lg" type="text" id="originalLanguage"/>
        </div>
        
        <div className="input-div w-[60vw] flex justify-between">
            <label htmlFor="firstPublished">First Published</label>
            <input {...register("firstPublished", { required: true })} className="pl-3 border-2 border-black w-[30vw] rounded-lg" type="number" id="firstPublished"/>
        </div>
        
        <div className="input-div w-[60vw] flex justify-between">
            <label htmlFor="approximateSales">Approximate Sales</label>
            <input {...register("approximateSales", { required: true })} className="pl-3 border-2 border-black w-[30vw] rounded-lg" type="text" id="approximateSales"/>
        </div>
        
        <div className="input-div w-[60vw] flex justify-between">
            <label htmlFor="genre">Genres (lowercase & comma-separated)</label>
            <input {...register("genre", { required: true })} className="pl-3 border-2 border-black w-[30vw] rounded-lg" type="text" id="genre"/>
        </div>

        <div className="input-div w-[60vw] flex justify-between">
            <label htmlFor="image">Image URL Link</label>
            <input {...register("image", { required: true })} className="pl-3 border-2 border-black w-[30vw] rounded-lg" type="url" id="image"/>
        </div>

        <div className="input-div w-[60vw] flex justify-between">
            <label htmlFor="price">Price (starting with ₹ symbol)</label>
            <input {...register("price", { required: true })} className="pl-3 border-2 border-black w-[30vw] rounded-lg" type="text" id="price"/>
        </div>
        
        <button className="cursor-pointer hover:scale-110 bg-blue-500 w-[7.5vw] h-[5vh] text-white font-bold rounded-md my-4" type="submit">Add Book</button>
    </form>
};

export default AddNewBook;