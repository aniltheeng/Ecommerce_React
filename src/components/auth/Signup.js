import React,{useState} from 'react'
import Navbar from '../layouts/Navbar'
import {Link} from 'react-router-dom'
import {signup} from './index'

const Signup = () => {
const [values,setValues] =useState({
	First_Name:'',Last_Name:'',email:'',password:'',error:'',success:false
})
const {First_Name,Last_Name,email,password,error,success}=values

const handleChange=name=>event=>{
	setValues({...values,[name]:event.target.value})
}
const clickSubmit=event=>{
	event.preventDefault()
	setValues({...values,error:false})
	signup({First_Name,Last_Name,email,password})
	.then(data=>{
		if(data.error){
			setValues({...values,error:data.error,success:false})
		}
		else{
			setValues({...values,name:'',email:'',password:'',error:'',success:true})
		}
	})
}
//to show success message
const showSuccessMsg=()=>(
	<div className="alert alert-success" style={{display:success?'':'none'}}>
	<h5>Account has been created, verify your accouny before login</h5>
	</div>
)

//to show error message
const showErrorMsg=()=>(
	<button className="alert alert-warning" style={{display:error?'':'none'}}>
		{error}
	</button>
)
    return (
        <>
            <Navbar/>
			<div className="breadcrumbs">
		<div className="container">
			<ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
				<li><Link to="/"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
				<li className="active">Register Page</li>
			</ol>
		</div>
	</div>
	<div className="register">
		<div classNameName="container">
			<h3 className="animated wow zoomIn" data-wow-delay=".5s">Register Here</h3>
			<div className="login-form-grids  registerBx" style = {{width:"400px"}}>
				<h5 className="animated wow slideInUp" data-wow-delay=".5s">profile information</h5>
				{showErrorMsg()}
				{showSuccessMsg()}
				<form className="animated wow slideInUp" data-wow-delay=".5s">
					<input type="text" name = "first_name" onChange = {handleChange('First_Name')} value = {First_Name} placeholder="First Name..." required=" " />
					<input type="text" name = "last_name" onChange = {handleChange('Last_Name')} value = {Last_Name} placeholder="Last Name..." required=" " />
				</form>
				<h6 className="animated wow slideInUp" data-wow-delay=".5s">Login information</h6>
				<form className="animated wow slideInUp" data-wow-delay=".5s">
					<input type="email" name = "email" onChange = {handleChange('email')} value = {email} placeholder="Email Address" required=" " />
					<input type="password" name = "password" onChange = {handleChange('password')} value = {password} placeholder="Password" required=" " />
					<input type="password" placeholder="Password Confirmation" required=" " />
					<input type="submit" onClick = {clickSubmit} value="Register"/>
				</form>
			</div>
			<div className="register-home animated wow slideInUp" data-wow-delay=".5s">
				<Link to="/">Home</Link>
			</div>
		</div>
	</div>
	</>
    )
}

export default Signup
