import { useState } from "react";
import { BookCard } from '../pages/Books/BookCard'
import { useFetchAllBooksQuery } from "../redux/features/books/booksApi";

const TopSellers = () => {
  const [selectedCategory, setSelectedCategory] = useState("Choose a category");
  // const [books, setBooks] = useState([]);

  // async function getBooks(){
  //   let a = await fetch("tenBooks.json");
  //   let b = await a.json();
  //   console.log(b.booksArray);
  //   setBooks(b.booksArray);
  // }
  
  // useEffect(() => { getBooks(); }, []);

  // const { data: books = [] } = useFetchAllBooksQuery();
  const { data } = useFetchAllBooksQuery();
  const books = data?.books || [];

  console.log(books);
  
  const categories = ["Choose a category", "absurdist", "adventure", "anthropology", "astrophysics", "autobiography", "bildungsroman", "children", "coming of age", "cosmology", "essay", "fantasy", "family saga", "fiction", "gothic", "history", "horror", "jewish", "literature", "magic", "manual", "memoir", "mystery", "non fiction", "novel", "novella", "philosophy", "realism", "realist", "romance", "romantic", "science", "self help", "socialist", "thriller", "war", "young adult"];
  
  const filteredBooks = selectedCategory === "Choose a category" ? books : books.filter( b => b.genre.includes(selectedCategory) );

  return (
    <div className='w-[94vw] mx-auto flex flex-col items-center'>
      <h1 className='text-3xl font-semibold'>Top Sellers</h1>
      
      <select onChange={ e => setSelectedCategory(e.target.value) } className="w=[20vw] bg-yellow-300 my-2.5 p-2 rounded-xl font-semibold cursor-pointer hover:bg-black hover:text-yellow-300" name="category" id="category">
        {
          categories.map((c, index) => {
            return <option className="bg-white text-black" key={index} value={c}>{ c[0].toUpperCase() + c.slice(1) }</option>
          } )
        }
      </select>

      <div className="books-div flex flex-wrap">
        {
          filteredBooks.map( (b, index) => {
            return <BookCard key={index} book={b}/>
          } )
        }
      </div>
    </div>
  )
}

export default TopSellers;