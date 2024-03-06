import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFirebase } from '../context/firebase';

export default function BookDetail() {
    const params = useParams();
    const firebase = useFirebase();
    const [book, setBook] = useState(null);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const bookData = await firebase.getBookById(params.id); // Access params.id instead of params.bookid
                setBook(bookData.data()); // Assuming the book data is stored under the `data` property of the result
            } catch (error) {
                console.error("Error getting document: ", error);
            }
        };

        fetchBook();
    }, [params.id]); // Include params.id in the dependency array to refetch the book when the ID changes

    console.log(params.id);
    console.log(book);

    return (
        <div>BookDetail</div>
    );
}
