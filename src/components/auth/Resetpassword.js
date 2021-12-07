import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../layouts/Navbar'

const Resetpassword = ({match}) => {

    const [values, setValues] = useState({
        email:'',password:'',cpassword:'',error: '', success: false
       });
   
       const {email,password,cpassword,success, error } = values;
    
       const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    }
    
    const clickSubmit = (event) => {
        event.preventDefault();

        setValues({ ...values, error: false });
        const token = match.params.token
         
       fetch(`http://localhost:5000/api/resetpassword/${token}`,{
           method:"PUT",
        headers:{
            Accept:'application/json',
            "Content-Type":"application/json"
        },
        body:JSON.stringify(values)
       })
       .then(res => res.json())
         .then(data => {
   
           if (data.error) {
               setValues({ ...values, error: data.error, success: false })
           }
           else {
               setValues({
                   ...values,
                   error:'', success: true
               })
           }
         })
         .catch(err => console.log(err))
        
   
    }


    const showError=()=>(
           
        <div className="alert alert-danger" style={{display:error?'':'none'}}>
            {error}
        </div>
       
    );
   
    const showSuccess=()=>(
        <div className="alert alert-success" style={{display:success?'':'none'}}>
           Password has been reset successfully you can login to continue
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
				<li className="active">Reset Password</li>
			</ol>
		</div>
	</div>      
	<div className="login">
		<div className="container">
			<h3 className="animated wow zoomIn" data-wow-delay=".5s">Reset Password</h3>
			<p className="est animated wow zoomIn" data-wow-delay=".5s">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
				deserunt mollit anim id est laborum.</p>
			<div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
                {showSuccess()}
                {showError()}
				<form>
					<input type="email" name = "email" onChange = {handleChange('email')} value = {email} placeholder="Email Address" required=" " />
					<input type="password" name = "password" onChange = {handleChange('password')} value = {password} placeholder="Password" required=" " />
					<input type="password" name = "confirm_password" onChange = {handleChange('cpassword')} value = {cpassword} placeholder="Password" required=" " />
                    <button className="btn btn-primary" onClick={clickSubmit}>Reset Password</button>
				</form>
			</div>
		</div>
	</div>
            
        </>
    )
}

export default Resetpassword
