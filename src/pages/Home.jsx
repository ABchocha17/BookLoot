import React, { useEffect, useState } from 'react';
import { useFirebase } from '../context/firebase';
import BookCard from '../components/BookCard';
import { Col, Row } from 'react-bootstrap';

export default function Home() {
    const firebase = useFirebase();
    const [books, setBooks] = useState([]);

    useEffect(() => {
        try {
            firebase.getAllBooks().then((snapshot) => {
                setBooks(snapshot.docs.map(doc =>({
                    id: doc.id,
                    ...doc.data()
                    })  
                ));
            });
        } catch (error) {
            console.error("Error getting documents: ", error);
        }
    }, []);


    return (
        <div className='container py-5'>
            <Row className="book_otr" >
                {books && 
                    books.map((book) => ( 
                        <Col lg={3}  key={book.id}>
                            <BookCard {...book} />
                        </Col>
                    ))
                }
            </Row>
        </div>
    );
}
