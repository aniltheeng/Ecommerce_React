import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../layouts/Navbar'
import { isAuthenticated } from './index'

const UserDashboard = () => {

    const { user: {First_Name, Last_Name,email, role } } = isAuthenticated()
    return (
        <>
            <Navbar />
            <br/>
            <br />
            <div className="breadcrumbs">
		<div className="container">
			<ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
				<li><Link to="/"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
				<li className="active">User Page</li>
			</ol>
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
                            <td  className = "invert">`{isAuthenticated().user.role === 1 ? 'Admin' : 'user'}` </td>
						</tr>
					</thead>
				</table>
			</div>
		</div>
	</div>
        </>
    )
}

export default UserDashboard
