import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../layouts/Navbar';
import { getCart } from './cartApi';
import CartItem from './CartItem';
import Style from '../../Style.css'

const Cart=()=> {
    const [items, setItems] = useState([]);
    const [run, setRun] = useState(false);

    useEffect(() => {
        setItems(getCart());
    }, [run]);
    const showItems = items => {
        return (
            <div>
                <h2>Your cart has {`${items.length}`} items</h2>
                <hr />
                {items.map((product, i) => (
                    <CartItem
                        key={i}
                        product={product}
                        cartUpdate={true}
                        setRun={setRun}
                        run={run}
                        
                    />
                ))}
            </div>
        );
    };

    const noItemsMessage = () => (
        <h2>
           <span className = "emptyMsg"><b>Your TailShop cart is empty.</b></span> <br/> <br /> <Link to="/products"><span className = "continueShopping">Continue shopping</span> <i class="fa fa-shopping-basket baskets" aria-hidden="true"></i>
</Link>
        </h2>
    );
    return (
        <>
        <Navbar/>
        {items.length > 0 ? showItems(items) : noItemsMessage()}
            
        </>
    )
}

export default Cart