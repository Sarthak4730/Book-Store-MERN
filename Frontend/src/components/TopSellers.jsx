import { useState, useMemo } from "react";
import { BookCard } from '../pages/Books/BookCard'
import { useFetchAllBooksQuery } from "../redux/features/books/booksApi";

const TopSellers = () => {
  const [selectedCategory, setSelectedCategory] = useState("Choose a category");
  const [sortFilter, setSortFilter] = useState("Choose sort type");
  // const [sortedBooks, setSortedBooks] = useState([]);

  const { data } = useFetchAllBooksQuery();
  const books = data?.books || [];
  // console.log(books);
  
  const categories = ["Choose a category", "absurdist", "adventure", "anthropology", "astrophysics", "autobiography", "bildungsroman", "children", "coming of age", "cosmology", "essay", "fantasy", "family saga", "fiction", "gothic", "history", "horror", "jewish", "literature", "magic", "manual", "memoir", "mystery", "non fiction", "novel", "novella", "philosophy", "realism", "realist", "romance", "romantic", "science", "self help", "socialist", "thriller", "war", "young adult"];

  const sortFiltersOptions = ["Choose sort type", "Price: Low to high", "Price: High to low", "Year: New to old", "Year: Old to new"];

  
  const sortedBooks = useMemo(() => {
    let filtered = selectedCategory === "Choose a category" ? books : books.filter( b => b.genre.includes(selectedCategory) );

    let categoryFiltered = [...filtered];

    if(sortFilter === "Price: Low to high"){
      categoryFiltered.sort((a, b) => {
        const priceA = parseInt(a.price.replace("₹", ""), 10);
        const priceB = parseInt(b.price.replace("₹", ""), 10);
        return priceA - priceB;
      } );
    }
    else if(sortFilter === "Price: High to low"){
      categoryFiltered.sort((a, b) => {
        const priceA = parseInt(a.price.replace("₹", ""), 10);
        const priceB = parseInt(b.price.replace("₹", ""), 10);
        return priceB - priceA;
      } );
    }
    else if(sortFilter === "Year: Old to new"){
      categoryFiltered.sort((a, b) => {
        const priceA = parseInt(a.first_published, 10);
        const priceB = parseInt(b.first_published, 10);
        return priceA - priceB;
      } );
    }
    else if(sortFilter === "Year: New to old"){
      categoryFiltered.sort((a, b) => {
        const priceA = parseInt(a.first_published, 10);
        const priceB = parseInt(b.first_published, 10);
        return priceB - priceA;
      } );
    }

    return categoryFiltered;
  }, [books, selectedCategory, sortFilter]);

  return (
    <div className='w-[94vw] mx-auto flex flex-col items-center'>
      <h1 className='text-3xl font-semibold'>Top Sellers</h1>
      
      <div className="filters flex gap-4">
        <select onChange={ e => setSelectedCategory(e.target.value) } className="w=[20vw] bg-yellow-300 my-2.5 p-2 rounded-xl font-semibold cursor-pointer hover:bg-black hover:text-yellow-300">
          {
            categories.map((c, index) => {
              return <option className="bg-white text-black" key={index} value={c}>{ c[0].toUpperCase() + c.slice(1) }</option>
            } )
          }
        </select>
          
        <select onChange={ e => setSortFilter(e.target.value) } className="w=[20vw] bg-yellow-300 my-2.5 p-2 rounded-xl font-semibold cursor-pointer hover:bg-black hover:text-yellow-300">
          {
            sortFiltersOptions.map((x, index) => {
              return <option className="bg-white text-black" key={index} value={x}>{ x }</option>
            } )
          }
        </select>
      </div>

      <div className="books-div flex flex-wrap">
        {
          sortedBooks.map( (b, index) => {
            return <BookCard key={index} book={b}/>
          } )
        }
      </div>
    </div>
  )
}

export default TopSellers;