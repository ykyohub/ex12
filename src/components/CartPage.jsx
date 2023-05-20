import React, { useState } from 'react'
import { Row, Col, Table, Button } from 'react-bootstrap'
import { app } from '../firebaseInit'
import { getDatabase, ref, onValue, remove, get } from 'firebase/database'

const CartPage = () => {
    const uid = sessionStorage.getItem('uid');
    const db = getDatabase(app);
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const getBooks = () => {
        setLoading(true);
        onValue(ref(db, `cart/${uid}`),(snapshot)=>{
            let rows=[];
            snapshot.forEach(row=>{
                rows.push({key:row.key, ...row.val()});
            });
            console.log(rows);
            setBooks(rows);
            setLoading(false);
        })
    }

    return (
        <Row className='my-5'>
            <Col>
                <h1 className='text-center mb-5'>장바구니</h1>
                <Table>
                    <thead>
                        <tr>
                            <td>제목</td>
                            <td>가격</td>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map(book=>{
                            <tr key={book.key}>
                                <td>{book.title}</td>
                                <td>{book.price}</td>
                            </tr>
                        })}
                    </tbody>
                </Table>
            </Col>
        </Row>
    )
}

export default CartPage