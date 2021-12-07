import React, { useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../layouts/Navbar'
import Card from './Card'
import { read, listRelated } from './uiApi'
import Style from '../../Style.css'

const ProductDetails = (props) => {
    const [product, setProduct] = useState({})
    const [error, setError] = useState(false)
    const [relatedProduct, setRelatedProduct] = useState([])

    const loadSingleProduct = productId => {
        read(productId).then(data => {
            if (data.error) {
                setError(data.error)
            }
            else {
                setProduct(data)

                //after fetching single product fetch related products
                listRelated(data._id).then(data => {
                    if (data.error) {
                        setError(data.error)
                    }
                    else {
                        setRelatedProduct(data)
                    }
                })
            }
        })
    }

    useEffect(() => {
        const productId = props.match.params.productId
        loadSingleProduct(productId)
    }, [props])
    return (
        <>
            <Navbar />
            <br />
            <div className="breadcrumbs">
		<div className="container">
        <h4  className="glyphicon glyphicon-home"  aria-hidden="true"><Link to="/">Home</Link><label>/</label> Product Details</h4>
		</div>
	</div>

            <div className="single">
                <div className="container detailsBx">
                    <div className="single-top-main">
                        <div className="col-md-5 single-top">
                            <div className="single-w3agile">
                                <div id="picture-frame ">
                                    <img src={`http://localhost:5000/${product.product_image}`} alt="" className="img-responsive" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-7 single-top-left ">
                            <div className="single-right">
                                <h3 style = {{color:"#274961"}}>{product.product_name}</h3>
                                <br/>
                                <div className="pr-single">
                                    <p className="reduced ">Rs. {product.product_price}</p>
                                </div>
                                <div className="block block-w3">
                                    <div className="starbox small ghosting"> </div>
                                </div>
                                <p className="in-pa">{product.product_description} </p>
                                <br/>
                                <div className = "listStyle">
                                    <ul className="social-top">
                                        <li><Link to="https://www.facebook.com/profile.php?id=100012221858170" className="icon facebook"><i className="fa fa-facebook" aria-hidden="true"></i><span></span></Link></li>
                                        <li><Link to="https://www.twitter.com/anitheeng4" className="icon twitter"><i className="fa fa-twitter" aria-hidden="true"></i><span></span></Link></li>
                                        <li><Link to="https://www.instagram.com/aniltheeng7777777/" className="icon pinterest"><i className="fa fa-instagram" aria-hidden="true"></i><span></span></Link></li>
                                    </ul>
                                </div>
                                <div className="clearfix"> </div>
                            </div>
                        </div>
                        <div className="clearfix"> </div>
                    </div>


                </div>
            </div>
            {relatedProduct.length > 0 && (
                <Fragment>
                    <div class="content-top offer-w3agile">
                        <div className="container ">
                            <div class="spec ">
                                <h3>Related Products</h3>
                                <div className="ser-t">
                                    <b></b>
                                    <span><i></i></span>
                                    <b className="line"></b>
                                </div>
                            </div>
                            <div className="col-w31 wthree-of">


                                {relatedProduct.map((product, i) => (
                                    <Card key={i} product={product} />
                                ))}
                            </div>


                        </div>
                    </div>

                </Fragment>
            )}
        </>
    )
}

export default ProductDetails
