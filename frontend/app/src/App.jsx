import './App.css'
import { useEffect, useState } from 'react'

function App() {
const [books,setBooks]= useState([]);
const [bookTitle, setBookTitle] = useState('');
const [releaseYear, setReleaseYear] = useState(0);
const [newTitle, setNewTitle] = useState('');

useEffect(()=>{
  fetchBooks();
},[]);

const editTitle =async (pk,releaseYear) => {
    const bookData={
    bookTitle: newTitle,
    releaseYear: releaseYear
  };
  try{
    const response =await fetch(`http://127.0.0.1:8000/app/books/${pk}/`,{
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookData),
  });

  const data = await response.json();
  setBooks((prev) => prev.map(book => {
    if (book.id == pk){
      return data;
    }
    else{
      return book;
    }
  })); // <-- Fixed: closed map callback and setBooks call

  }catch(err){
    console.log(err);
  }
};

const deleteBook = async (pk) => {
    const bookData={
    bookTitle: bookTitle,
    releaseYear: releaseYear
  };
  try{
    const response =await fetch(`http://127.0.0.1:8000/app/books/${pk}/`,{
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookData),
  });

   await response.json();
      setBooks((prev) => prev.filter(book => book.id !== pk)); // <-- Fixed: filter out the deleted book
  
    }catch(err){
      console.log(err);
    }
  };

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
        <input type="number" placeholder='release year' onChange={(e)=> setReleaseYear(Number(e.target.value))}/>
        <button onClick={addBook}>Add book</button>
      </div>
      {books.map((book) => (
        <div key={book.id}>
          <p>Title: {book.bookTitle}</p>
          <p>Release Year: {book.releaseYear} </p>
          <input type="text" placeholder='new title?' onChange={(e)=>setNewTitle(e.target.value)} />
          <button onClick={() => editTitle(book.id, book.releaseYear)}>edit title</button>
          <button onClick={() => deleteBook(book.id)}>delete</button>
        </div>
      ))}
    </div>
  )
}

export default App
