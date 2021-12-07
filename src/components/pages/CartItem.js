import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { removeItem, updateItem } from './cartApi'

const CartItem = ({ product,
    cartUpdate = false,
    setRun = f => f,
    run = undefined }) => {
    const [count, setCount] = useState(product.count);


    const handleChange = productId => event => {
        setRun(!run); // run useEffect in parent Cart
        setCount(event.target.value < 1 ? 1 : event.target.value);
        if (event.target.value >= 1) {
            updateItem(productId, event.target.value);
        }
    };

    const showCartUpdateOptions = cartUpdate => {
        return (
            cartUpdate && (
                <div classNameName="mb-2">

                    <span classNameName="input-group-text">Quantity</span>

                    <input type="number" value={count} onChange={handleChange(product._id)} />

                </div>
            )
        );
    };
    return (
        <>
	<div className="checkout">
		<div className="container">
			<div className="checkout-right animated wow slideInUp" data-wow-delay=".5s">
				<table className="timetable_sub">
					<thead>
						<tr>
							<th>Product</th>
							<th>Quantity</th>
							<th>Product Name</th>
							<th>Price</th>
							<th>Remove</th>
						</tr>
					</thead>
					<tr className="rem1">
						<td className="invert-image"><Link to={`/productdetails/${product._id}`}><img src={`http://localhost:5000/${product.product_image}`} style={{ height: '180px', width: '200px' }} className="img-responsive" alt="" /></Link></td>
						<td className="invert">
                        <div classNameName="item-info-product ">
                            {showCartUpdateOptions(cartUpdate)}
                        </div>
						</td>
						<td className="invert"><Link to={`/productdetails/${product._id}`}>{product.product_name}</Link></td>
						<td className="invert">Rs.{product.product_price}</td>
						<td className="invert">
                                <button classNameName="btn btn-danger" onClick={() => {
                                    removeItem(product._id);
                                    setRun(!run); // run useEffect in parent Cart
                                    }} >Remove from cart 
                                    </button>
						</td>
					</tr>
				</table>
			</div>
		</div>
	</div>

        </>
    )
}

export default CartItem