import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useFirebase } from '../context/firebase';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const firebase = useFirebase(); 
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error,setError] = useState(null);
    const Navigate = useNavigate();


    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const result = await firebase.signUpUserWithEmailAndPassword(formData.email, formData.password); 
            console.log("signUp", result);
            setFormData({ email: "", password: "" });
            setError(null);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    useEffect(() => {
        if(firebase.isLoggedIn){
            Navigate("/")
        }
    }, [firebase,Navigate]);
    return (
        <div className='container py-5'>
            <Form onSubmit={handleSubmit}>
                <Form.Group className='mb-4' >
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className='mb-4' >
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button type="submit">Create Account</Button>
                {error && <p className='error text-danger'>{error}</p>}
            </Form>
        </div>
    );
}
