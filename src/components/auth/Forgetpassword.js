import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../layouts/Navbar'

import {forgetpassword} from './index'

const Forgetpassword = () => {

	const[values,setValues]=useState({
        email:'',error:'',loading:false,success:false
       });
       const{email,loading,error,success}=values;
      
       const handleChange=name=>event=>{
         setValues({...values,error:false,[name]:event.target.value});
       }
     
       const clickSubmit=(event)=>{
           event.preventDefault();
           setValues({...values,error:false,loading:true});
           forgetpassword({email})
           .then(data=>{
               if(data.error){
                   setValues({...values,error:data.error,loading:false,success: false})
               }
               else{
                   
                setValues({
                    ...values,
                     email: '',  error: '', success: true
                })
               }
           });
       };

		const showError=()=>(
			<div className="alert alert-danger mb-3" style={{display:error?'':'none'}}>
				{error}
			</div>
		);
		
		const showLoading=()=>
		loading&&(<div className="alert alert-info">
			<h2>Loading....</h2>
		</div>
		);
		const showSuccess=()=>(
		
			<div className="alert alert-success" style={{display:success?'':'none'}}>
			password reset verification link has been sent to your email
			</div>
		
		);

    return (
        <>
<Navbar/>
        <br/>
		<div className="breadcrumbs">
		<div className="container">
			<ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
				<li><Link to="/"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
				<li className="active">Forget Password</li>
			</ol>
		</div>
	</div>
	<div className="login">
		<div className="container">
			<h3 className="animated wow zoomIn" data-wow-delay=".5s">Forget Password</h3>
			<p className="est animated wow zoomIn" data-wow-delay=".5s">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
				deserunt mollit anim id est laborum.</p>
			<div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
					{showLoading()}
					{showSuccess()}
					{showError()}
				<form>
					<input type="email" name = "email" onChange = {handleChange('email')} value = {email} placeholder="Email Address" required=" " /><br/>
					
					<button className="btn btn-success" onClick={clickSubmit} >Send Password Reset Link</button>
				</form>
			</div>
		</div>
	</div>
        </>
    )
}

export default Forgetpassword
