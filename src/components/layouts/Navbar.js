import React, {Fragment} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {signout,isAuthenticated} from '../auth';
import { emptyCart, itemTotal } from '../pages/cartApi';
import Search from '../pages/Search';
import Style from '../../Style.css'



const Navbar=({history})=> {
    return (
        <>
           <div className="header ">
		   <div className="logo-nav homeBar">
				<div className="logo-nav-left animated wow zoomIn" data-wow-delay=".5s">
				</div>
				<div className="logo-nav-left1">
					<nav className="navbar navbar-default">
					<div className="collapse navbar-collapse" id="bs-megadropdown-tabs">
						<ul className="nav navbar-nav homeProduct">
							<li className="active home"><Link to="/" className="act">Home <i className="fa fa-home" aria-hidden="true"></i></Link></li>	
						</ul>
					</div>
					</nav>
				</div>
				<div className="header-right">
					<div className="cart box_1 cartBx">
						<Link to = "/cart">
							<h3>
							 <div className="total itemCountBx numberBadge">
								<Link  to="/cart"><span className="badge badge-notify " >{itemTotal()}</span></Link>
							 </div>
								 <i class="fa fa-shopping-cart cart" aria-hidden="true"></i>
							</h3>
						</Link>
						<div className="clearfix"> </div>
					</div>	
				</div>
				<div className="clearfix"> </div>
			</div>
		<div className="container">
			<div className="header-grid ">
				<div className="header-grid-left animated wow slideInLeft signInUp" data-wow-delay=".5s">
					<ul>
                        {!isAuthenticated() &&(
                        <Fragment>
                            <li ><Link to="/signin" ><i className="fa fa-sign-in signUpIn" aria-hidden="true"></i> Login</Link></li>
                            <li><Link to="/signup" ><i className="fa fa-user-plus signUpIn" aria-hidden="true"></i> Register</Link></li>
                        </Fragment>
                        )}

                        {isAuthenticated() && isAuthenticated().user.role===0 && (
                            <li className = "adminSignOut">
                                <Link to="/user/dashboard"><i className="fa fa-user" aria-hidden="true"></i> Profile
                                </Link>
                            </li>
                        )}
                        {isAuthenticated() && isAuthenticated().user.role===1 &&(
                            <li className = "adminSignOut">
                                <Link to="/admin/dashboard">
                                <i className="fa fa-user" aria-hidden="true"></i>
                                Admin dashboard
                                </Link>
                            </li>
                        )}
                        
                        {isAuthenticated()&&(
                            <Fragment>
                                <li className = "adminSignOut">
                                <Link style={{cursor:'pointer', border:'none', outline:'none'}}
                                onClick={()=>signout(()=>{
                                    history.push('/');
                                })}>
                                <i className="fa fa-sign-out" aria-hidden="true"></i>
                                Sign Out</Link>
                                </li>
                            </Fragment>
                        )}
					</ul>
				</div>
				<div className="header-grid-right animated wow slideInRight socialMedia" data-wow-delay=".5s">
					<ul className="social-icons ">
						<li><a href="https://www.facebook.com/profile.php?id=100012221858170"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
						<li><a href="https://www.instagram.com/aniltheeng7777777/"><i className="fa fa-instagram" aria-hidden="true"></i></a></li>
						<li><a href="https://www.twitter.com/anitheeng4"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
						<li><Link to="#"><i className="fa fa-youtube" aria-hidden="true"></i></Link></li>
					</ul>
				</div>
				<div className="clearfix"></div>
			</div>
			
		</div>
	</div>
                        <Search/>
        </>
    )
}

export default withRouter(Navbar)
