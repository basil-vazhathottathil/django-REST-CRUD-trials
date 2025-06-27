import './App.css'
import { useEffect, useState } from 'react'

function App() {
const [books,setBooks]= useState([]);
const [bookTitle, setBookTitle] = useState('');
const [releaseYear, setReleaseYear] = useState(0);

useEffect(()=>{
  fetchBooks();
},[]);

const addBook = async () => {
  const bookData={
    bookTitle: bookTitle,
    releaseYear: releaseYear
  };
  try{
    const response =await fetch('http://127.0.0.1:8000/app/books/create/',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookData),
  });

  const data = await response.json();
  setBooks((prevBooks) => [...prevBooks, data]); // <-- Add this line

  }catch(err){
    console.log(err);
  }
};

const fetchBooks= async()=>{
  try{
    const response = await fetch('http://127.0.0.1:8000/app/books/');
    const data = await response.json();
    setBooks(data); // <-- Add this line
    console.log(data);
  }
  catch(err){
    console.log(err);
  }
}

  return (
    <div className="center-container">
      <h1>Book website</h1>

      <div>
        <input type="text" placeholder='Book Title' onChange={(e) => setBookTitle(e.target.value)}/>
        <input type="number" placeholder='release year' onChange={(e)=> setReleaseYear(e.target.value)}/>
        <button onClick={addBook}>Add book</button>
      </div>
      {books.map((book) => (
        <div>
          <p>Title: {book.bookTitle}</p>
          <p>Release Year: {book.releaseYear} </p>
          <input type="text" placeholder='new title?' />
          <button>edit title</button>
        </div>
      ))}
    </div>
  )
}

export default App
