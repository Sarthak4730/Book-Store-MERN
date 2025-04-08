import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import { useFetchOneBookQuery, useUpdateBookMutation } from "../../redux/features/books/booksApi";
import { useEffect } from "react";
import Loader from "../../components/Loader";

const EditBook = () => {
    const { id } = useParams();
    const { data, isLoading, error } = useFetchOneBookQuery(id);
    const oldData = data?.book;
    const [ updateBook ] = useUpdateBookMutation();
    
    const navigate = useNavigate();
    
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: "",
            author: "",
            original_language: "",
            first_published: "",
            approximate_sales: "",
            genre: "",
            image: "",
            price: "",
        },
        shouldUnregister: true
    });
    
    useEffect( () => {
        if( oldData ) {
            reset({
                title: oldData.title,
                author: oldData.author,
                original_language: oldData.original_language,
                first_published: oldData.first_published,
                approximate_sales: oldData.approximate_sales,
                genre: oldData.genre,
                image: oldData.image,
                price: oldData.price
            });
            console.log(oldData);
        }
    }, [ oldData, reset ] );
    
    if( isLoading ) return <Loader />

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
        try {
            await updateBook( { id, data } ).unwrap();
            Toast.fire({
                icon: "success",
                title: `Book Updated Successfully`
            });
            navigate('/dashboard');           
        } catch (error) {
            console.log("Failed to update book");
            alert("Failed to update book");
        }
    }

    return <form onSubmit={handleSubmit(onSubmit)} className="mt-[10vh] mx-auto w-[75vw] h-[75vh] border-2 border-black flex flex-col justify-evenly items-center text-lg">
        <p className="text-2xl font-bold">Edit Book</p>
        
        <div className="input-div w-[60vw] flex justify-between">
            <label htmlFor="title">Title</label>
            <input {...register("title", { required: true })} className="pl-3 border-2 border-black w-[30vw] rounded-lg" type="text" id="title"/>
        </div>

        <div className="input-div w-[60vw] flex justify-between">
            <label htmlFor="author">Author</label>
            <input {...register("author", { required: true })} className="pl-3 border-2 border-black w-[30vw] rounded-lg" type="text" id="author"/>
        </div>

        <div className="input-div w-[60vw] flex justify-between">
            <label htmlFor="original_language">Original Language</label>
            <input {...register("original_language", { required: true })} className="pl-3 border-2 border-black w-[30vw] rounded-lg" type="text" id="original_language"/>
        </div>
        
        <div className="input-div w-[60vw] flex justify-between">
            <label htmlFor="first_published">First Published</label>
            <input {...register("first_published", { required: true })} className="pl-3 border-2 border-black w-[30vw] rounded-lg" type="number" id="first_published"/>
        </div>
        
        <div className="input-div w-[60vw] flex justify-between">
            <label htmlFor="approximate_sales">Approximate Sales</label>
            <input {...register("approximate_sales", { required: true })} className="pl-3 border-2 border-black w-[30vw] rounded-lg" type="text" id="approximate_sales"/>
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
        
        <button className="cursor-pointer hover:scale-110 bg-blue-500 w-[7.5vw] h-[5vh] text-white font-bold rounded-md my-4" type="submit">Update Book</button>
    </form>
};

export default EditBook;