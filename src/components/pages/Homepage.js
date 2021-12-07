import React, { useState, useEffect } from 'react'
import Navbar from '../layouts/Navbar'
import Card from './Card'
import { getProducts } from './uiApi'
import Style from '../../Style.css'

const Homepage = () => {
    const [productsByArrival, setProductsByArrival] = useState([])
    const [error, setError] = useState(false)

    const loadProductsByArrival = () => {
        getProducts('createdAt').then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setProductsByArrival(data)
            }
        })
    }
    useEffect(() => {
        loadProductsByArrival()
    }, []
    )

    return (
        <>
            <Navbar />
            <div class="product">
                <div class="container">
                    <div class="spec ">
                        <h3 className = "newArrival">New Arrival</h3>
                        <div class="ser-t">
                            <span><i></i></span>
                            <b class="line"></b>
                        </div>
                    </div>
                    <br/>
                    <br/>
                    <div class=" con-w3l">
                        {productsByArrival.map((product, i) => (
                            <Card key={i} product={product} />
                        ))}

                    </div>
                </div>
            </div>
        </>
    )
}

export default Homepage

