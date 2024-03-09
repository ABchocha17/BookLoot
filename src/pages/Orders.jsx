import React, { useEffect, useState } from 'react';
import { useFirebase } from '../context/firebase';
import { Col, Row } from 'react-bootstrap';
import BookCard from '../components/BookCard';

export default function Orders() {
    const Firebase = useFirebase();
    const [books,setBooks] = useState(null)

    useEffect(() => {
        if(Firebase.isLoggedIn){
            Firebase.fetchBooks(Firebase.user.uid)?.then((items) => {
                setBooks(items.docs.map(doc =>({
                    id: doc.id,
                    ...doc.data()
                })));
            }).catch(error => {
                console.error('Error fetching orders:', error);
            });
        }
    }, [Firebase]);

    console.log(books);

    return (
        <div className='container py-5'>
            {Firebase.isLoggedIn ? (
                <Row className="book_otr">
                    {books && books.map(book => (
                        <Col lg={3} key={book.id}>
                            <BookCard {...book} link={`/books/orders/${book.id}`} />
                        </Col>
                    ))}
                </Row>
            ) : (
                <h1>Please login</h1>
            )}
        </div>
    );
}
