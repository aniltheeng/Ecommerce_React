import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth'
import Navbar from '../layouts/Navbar'
import { createCategory } from './apiAdmin'

const AddCategory = () => {

	const [category_name, setName] = useState('')
	const [error, setError] = useState(false)
	const [success, setSuccess] = useState(false)

	//destructure user and token from localstorage
	const { user, token } = isAuthenticated()


	const handleChange = (e) => {
		setError('')
		setName(e.target.value)

	}

	const clickSubmit = (e) => {
		e.preventDefault()
		setError('')
		setSuccess(false)
		//make request to api to create category
		createCategory(user._id, token, { category_name })
			.then(data => {
				if (data.error) {
					setError(data.error);
				}
				else {
					setError("");
					setSuccess(true);
				}
			})

	}

	const showSuccess=()=>{
		if(success){
		   return <h5 align="center" className="alert alert-success">Category is Added</h5> 
		}
	}

	const showError=()=>(
		<button classNameName="alert alert-warning mb-3" style={{display:error?'':'none',color:"success"}}>
			{error}
		</button>
	);

	return (
		<>
			<Navbar />
			<br />
            <div className="breadcrumbs">
		<div className="container">
			<ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
				<li><Link to="/"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
				<li className="active">Add Category</li>
			</ol>
		</div>
	</div>
    <div className="login">
		<div className="container">
			<h3 className="animated wow zoomIn" data-wow-delay=".5s">Add Category</h3>
			<div className="login-form-grids animated wow slideInUp categoryFillBx" style = {{width:"400px"}}>
				{showError()}
                {showSuccess()}
				<form>
                    <input type="text" name="category" required="" placeholder="CategoryName" onChange={handleChange}  value={category_name} />
					<br/>
                    <button className="btn btn-success" onClick={clickSubmit}>Add</button>
				</form>
			</div>
		</div>
	</div>
		</>
	)
}

export default AddCategory
