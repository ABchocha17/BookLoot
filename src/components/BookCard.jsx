import React, { useEffect, useState } from 'react'
import {Button,Card } from 'react-bootstrap';
import {useFirebase} from '../context/firebase';
import { useNavigate } from 'react-router-dom';

export default function BookCard(props) {
    const naviget = useNavigate()
    const firebase = useFirebase();
    const [url,setUrl] = useState(null);
    useEffect(()=>{
        firebase.getImageUrl(props.bookImgUrl).then((url) => {
            setUrl(url);
        })
    },[])
  return (
    <Card style={{marginBottom:"20px"}}>
      <Card.Img variant="top" src={url} style={{height: "145px",objectFit:"cover"}} />
      <Card.Body>
        <Card.Title>{props.bookname}</Card.Title>
        <Card.Text className='capitalise'>
          this book has a title {props.bookname} and thi book is sold by {props.userName} <br /> this book cost: <span>Rs.{props.price}</span>
        </Card.Text>
        <Button variant="primary" style={{width:"100%"}} onClick={e => naviget(`books/${props.id}`)} >Go To Book Summary</Button>
      </Card.Body>
    </Card> 
  )
}
