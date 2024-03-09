import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFirebase } from '../context/firebase';
import { Form, Placeholder } from 'react-bootstrap';


export default function BookDetail() {
    const params = useParams();
    const firebase = useFirebase();
    const [book, setBook] = useState(null);
    const [url, setUrl] = useState(null);
    const [qty,setQty] = useState(0);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setQty(value);
    };
    useEffect(() => {
        const fetchBook = async () => {
            try {
                const bookData = await firebase.getBookById(params.bookId); 
                setBook(bookData.data()); 
            } catch (error) {
                console.error("Error getting document: ", error);
            }
        };
        fetchBook();
    }, [params.bookId]); 

    useEffect(() => {
        if(book){
            const imgUrl = book.bookImgUrl;
            firebase.getImageUrl(imgUrl).then(url => setUrl(url));
        }
    },[book]); 

    const Placeholder = async () =>{
        const result = await firebase.placeOrder(params.bookId,qty);
        console.log(result);
    }

    return (
        <div className='container py-5'>
            {book === null && <h1>Lading.....</h1> }
            {book && <>
                <div className="book_detail clearfix">
                    <div className="book_detail_img col2 fl left_img">
                        <img src={url} alt="" style={{borderRadius:"10px"}} />
                    </div>
                    <div className="book_detail_text">
                        {/* <h1>details</h1> */}
                        <h3>book name : {book.bookname}</h3>
                        <p>book price : ₹{book.price}</p>
                        <p>book ISBN number : {book.ISBN}</p>
                        <h3>Owner details</h3>
                        <p>name : {book.userName}</p>
                        <p style={{textTransform:"none"}}>email : {book.userEmail}</p>
                        <Form className='book_de_form'>
                            <Form.Group className='mb-4'>
                                <Form.Label>qty</Form.Label>
                                <Form.Control style={{width:"max-content"}} type="number" name="qty" value={qty} onChange={handleChange} />
                            </Form.Group>
                        </Form>
                        <div className="a_btn">
                            <a href="#." onClick={Placeholder} >Add to cart</a>
                        </div>
                    </div>
                </div>
            </>}
        </div>
    );
}
