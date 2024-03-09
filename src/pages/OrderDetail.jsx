import React, { useEffect, useState } from 'react';
import { useFirebase } from '../context/firebase';
import { useParams } from 'react-router-dom';

export default function OrderDetail() {
    const Params = useParams();
    const Firebase = useFirebase();
    const [orders, setOrders] = useState(null);

    useEffect(() => {
        Firebase.getOrders(Params.bookId).then((book) => setOrders(book.docs));
    }, [Firebase, Params.bookId]);

    console.log(orders);

    return (
        <div className='container mt-5'>
            <h1>Orders</h1>
            {!orders ? (
                <h2>No orders...</h2>
            ) : (
                <>
                    {orders.map((order) => {
                        const data = order.data();
                        return (
                            <div className="mt-5" key={order.id}>
                                <h4>Order By: {data.userName}</h4>
                                <h5>Qty: {data.qty}</h5>
                                <h5>Email: {data.userEmail}</h5>
                            </div>
                        );
                    })}
                </>
            )}
        </div>
    );
}
