import React, { useState } from 'react'
import './Login.css'

export const Login = () => {

  const [action, setAction] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  })

  const changeHandler = (e) => {
    setFormData({...formData,[e.target.name]: e.target.value});
  }

  const loggin = async () => {
    console.log("Login function executed", formData);
    let responseData;
    await fetch('http://localhost:8888/api/auth/login',{
      method: 'POST',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Referrer-Policy': 'no-referer-when-downgrade'
      },
      body: JSON.stringify(formData),
    }).then((response)=>response.json()).then((data)=>responseData=data)

    if(responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("/");
    }
    else{
      alert(responseData.errors);
    }
    
  }

  const signup = async () => {
    console.log("Signup function executed", formData);
    let responseData;
    await fetch('http://localhost:8888/api/auth/signup',{
      method: 'POST',
      headers:{
        Accept: 'application/from-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then((response)=>response.json()).then((data)=>responseData=data)

    if(responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("/");
    }
    else{
      alert(responseData.errors);
    }
  }

  return (
    <div className='login'>
        <div className="login-container">
            <h1>{action}</h1>
            <div className="login-fields">
                {action==='Sign up'?<input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Twoję Imię'/>:<></>}
                <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Adres Email'/>
                <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Hasło'/>
            </div>
            <button onClick={()=>{action==='Login'?loggin():signup()}}>Kontynuuj</button>
            {action==='Sign up'?
            <p className="login-have">Masz już konto?<span onClick={()=>{setAction('Login')}}> Zaloguj się tutaj.</span> <hr/></p>:
            <p className="login-have">Nie masz konta?<span onClick={()=>{setAction('Sign up')}}> Zarejestruj się tutaj.</span> <hr/></p>}
            <div className="login-agree">
                <input type="checkbox" name='' id=''/>
                <p>Wyrażam zgodę na przetwarzanie moich danych.</p>
            </div>
        </div>
    </div>
  )
}

