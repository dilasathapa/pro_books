import React, { useEffect, useState } from "react";
import axios from "axios"

function Books(){
    const [booksData, setBooksData] = useState([])
    const [errors, setErrors] = useState()

    useEffect(()=>{
        axios.get("https://reactnd-books-api.udacity.com/bos",{ 
            headers: { 'Authorization': 'whatever-you-want' }
        })
        .then((response)=>{
            console.log(response.data.books)
            setBooksData(response.data.books)
        })
        .catch((error)=>{
            console.log(error)
            if(error.response.status == 404){
                console.log("Status code : 404")
                console.log("Website not found")
                setErrors(error.message)
            }
        })
    }, [])

    console.log("state", booksData)
  return (
    <>
        {errors && <h1>{errors}</h1>}
        <div>
            {
                booksData.map((book, index)=>(
                    <div key={index}>
                        <h3>{book.title}</h3>
                        <div style={{display : "flex"}}>
                            <img src={book.imageLinks.smallThumbnail} alt="book image" />
                            <p>{book.description}</p>
                        </div>
                        <h5>{book.authors.join(" ")}</h5>
                        
                        <hr />
                    </div>
                ))
            }
        </div>
    </>
  )
}

export default Books;