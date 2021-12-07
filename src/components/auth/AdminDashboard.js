import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../layouts/Navbar'
import { isAuthenticated } from './index'
import Style from '../../Style.css'

const AdminDashboard = ({category}) => {

    const { user: { First_Name,Last_Name, email, role } } = isAuthenticated()

    return (
        <>
            <Navbar/>
            <br />
            <br />
            <div className="breadcrumbs">
                <div className="container" style = {{color:"#000"}}>
                    <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                        <li><Link to="/"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
                        <li className="active">Admin Page</li>
                    </ol>
                </div>
	        </div>
            <br />
            <div className="container">
                <div className="row">
                    <div className="checkout">
                        <div className="container TextBlack" style = {{width:"400px"}}>
                            <div className="checkout-right animated wow slideInUp"   data-wow-delay=".5s">
                                <h4 className="card-header" style={{ fontFamily: 'Helvetica', textAlign: 'center' }}><b>Admin Links</b></h4>
                                <br/>
                                <table className="timetable_sub">
                                    <thead className = "textBlack">
                                    <tr>
                                            <td className="invert">Items</td>
                                            <td className="invert">Links</td>
                                        </tr>
                                        <tr>
                                            <td className = "invert">Category</td>
                                            <td  className = "invert"><Link to = "/create/category">Create Category</Link></td>
                                        </tr>
                                        <tr>
                                            <td  className = "invert">Product</td>
                                            <td  className = "invert"><Link to = "/create/product">Create Product</Link></td>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
             </div>

     <div className="login">
		<div className="container">
			<h3 className="animated wow zoomIn" data-wow-delay=".5s">User Information</h3>
			<div className="login-form-grids animated wow slideInUp categoryFillBx" style = {{width:"400px"}}>
                <table className="timetable_sub textBlack">
					<thead className = "textBlack">
                       <tr>
						    <td className="invert">First_Name</td>
						    <td className="invert">{First_Name}</td>
						</tr>
                        <tr>
						    <td className="invert">Last_Name</td>
						    <td className="invert">{Last_Name}</td>
						</tr>
                        <tr>
						    <td className="invert">Email</td>
						    <td className="invert">{email}</td>
						</tr>
                        <tr>
							<td  className = "invert">Role</td>
                            <td  className = "invert">`{isAuthenticated().user.role === 1 ? 'Admin':'User'}`</td>
						</tr>
					</thead>
				</table>
			</div>
		</div>
	</div>
        </>
    )
}

export default AdminDashboard
