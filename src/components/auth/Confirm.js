import React,{useState,useEffect} from 'react'
import { Link,Redirect } from 'react-router-dom';
import { authenticate, isAuthenticated, signin } from '.';
import Navbar from '../layouts/Navbar';

// import Signin from './Signin'

const Confirm=({match})=> {
    const [values, setValues] = useState({
     email:'',password:'',error: '', success: false,loading:false,redirectToReferrer:false
    });

    const {email,password,success, error,loading,redirectToReferrer} = values;

    const {user} = isAuthenticated()
    useEffect(()=>{

        const token = match.params.token
      console.log(token)
    fetch(`http://localhost:5000/api/confirmation/${token}`,{
        method:"POST",
     headers:{
         Accept:'application/json',
         "Content-Type":"application/json"
     }
    })
    .then(res => res.json())
      .then(data => {

        if (data.error) {
            setValues({ ...values, error: data.error, success: false })
        }
        else {
            setValues({
                ...values,
                error: '', success: true
            })
        }

        
      })
      .catch(err => console.log(err))
    },[match.params.token,values])

    const handleChange=name=>event=>{
        setValues({...values,error:false,[name]:event.target.value});
      }
    
      const clickSubmit=(event)=>{
          event.preventDefault();
          setValues({...values,error:false,loading:true});
          signin({email,password})
          .then(data=>{
              if(data.error){
                  setValues({...values,error:data.error,loading:false})
              }
              else{
                  authenticate(data,()=>{
                   setValues({
                       ...values,
                      redirectToReferrer:true
                    });
               });
              }
          });
      };
          const showError=()=>(
        
        <div className="alert alert-danger" style={{display:error?'':'none'}}>
            {error}
        </div>
       
    );

    const redirectUser=()=>{
        if(redirectToReferrer){
           if(user && user.role===1){
               return <Redirect to="/admin/dashboard" />
           } else{
               return <Redirect to="/user/dashboard" /> 
           }
        }
        if(isAuthenticated()){
            return <Redirect to="/" /> 
        }
    }

    const showLoading=()=>
    loading&&(<div classNameName="alert alert-info">
        <h2>Loading....</h2>
    </div>
    );    
   
    const showSuccess=()=>(
     
        <div className="alert alert-success" style={{display:success?'':'none'}}>
            Congrats your Account is verified you can sign in to continue .......
        </div>
     
    );

    return (
        <>
            <Navbar/>

            <div className="breadcrumbs">
		<div className="container">
			<ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
				<li><Link to="/"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
				<li className="active">Login Page</li>
			</ol>
		</div>
	</div>
	<div className="login">
		<div className="container">
			<h3 className="animated wow zoomIn" data-wow-delay=".5s">Login Form</h3>
			<p className="est animated wow zoomIn" data-wow-delay=".5s">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
				deserunt mollit anim id est laborum.</p>
			<div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
				{showError()}
				{showLoading()}
				{redirectUser()}
                {showSuccess()}
				<form>
					<input type="email" name = "email" onChange = {handleChange('email')} value = {email} placeholder="Email Address" required=" " />
					<input type="password" name = "password" onChange = {handleChange('password')} value = {password} placeholder="Password" required=" " />
					<div className="forgot">
						<Link to="/forget/password">Forgot Password?</Link>
					</div>
					<input type="submit" onClick = {clickSubmit} value="Login"/>
				</form>
			</div>
			<h4 className="animated wow slideInUp" data-wow-delay=".5s">For New People</h4>
			<p className="animated wow slideInUp" data-wow-delay=".5s"><Link to="/signup">Register Here</Link> (Or) go back to <Link to="/">Home<span className="glyphicon glyphicon-menu-right" aria-hidden="true"></span></Link></p>
		</div>
	</div>
        </>
    )
}

export default Confirm