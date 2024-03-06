import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useFirebase } from '../context/firebase';

export default function List() {
    const firebase = useFirebase(); 
    const [bookData, setBookData] = useState({ bookname:'', isbn:'', price:'', bookimg: null }); 
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'bookimg') {
            if (files.length === 0) {
                setBookData(prevState => ({ ...prevState, [name]: null }));
            } else {
                setBookData(prevState => ({ ...prevState, [name]: files[0] }));
            }
        } else {
            setBookData(prevState => ({ ...prevState, [name]: value }));
        }
    };
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const result = await firebase.addNewBook(bookData.bookname, bookData.isbn, bookData.price, bookData.bookimg); 
            setBookData({ bookname:'', isbn:'', price:'', bookimg: null }); 
            setError(null);
            document.getElementById('bookimg').value = ''; 
        } catch (error) {
            setError(error.message);
        }
    };
    
    return (
        <div className='container py-5'>
            <Form onSubmit={handleSubmit}>
                <Form.Group className='mb-4' >
                    <Form.Label>Book Name</Form.Label>
                    <Form.Control type="text" name="bookname" value={bookData.bookname} onChange={handleChange} />
                </Form.Group>
                <Form.Group className='mb-4' >
                    <Form.Label>ISBN</Form.Label>
                    <Form.Control type="text" name="isbn" value={bookData.isbn} onChange={handleChange} />
                </Form.Group>
                <Form.Group className='mb-4' >
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="text" name="price" value={bookData.price} onChange={handleChange} />
                </Form.Group>
                <Form.Group className='mb-4' >
                    <Form.Label>Book Image</Form.Label>
                    <Form.Control type="file" id='bookimg' name="bookimg" onChange={handleChange} />
                </Form.Group>
                <Button type="submit">Add Book</Button>
                {error && <p className='error text-danger'>{error}</p>}
            </Form>
        </div>
    );
}
