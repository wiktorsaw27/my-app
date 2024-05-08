import React from 'react'
import './Login.css'

export const Login = () => {
  return (
    <div className='login'>
        <div className="login-container">
            <h1>Zarejestruj się</h1>
            <div className="login-fields">
                <input type="text" placeholder='Twoję Imię'/>
                <input type="email" placeholder='Adres Email'/>
                <input type="password" placeholder='Hasło'/>
            </div>
            <button>Kontynuuj</button>
            <p className="login-have">Masz już konto?<span> Zaloguj się tutaj.</span> <hr/></p>
            <div className="login-agree">
                <input type="checkbox" name='' id=''/>
                <p>Wyrażam zgodę na przetwarzanie moich danych.</p>
            </div>
        </div>
    </div>
  )
}

