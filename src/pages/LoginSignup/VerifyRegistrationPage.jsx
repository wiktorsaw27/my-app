import React, { useState } from 'react'


export const VerifyRegistrationPage = () => {
  const verifyRegistration = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    console.log(token)
    if(!token) {
      console.error('No token found in URL')
      alert("No token found in URL")
      window.location.href = '/';
      return;
    }
    let httpResponse;
    await fetch(`http://localhost:8888/api/auth/verifyRegistration?token=${token}`, {
      method: 'GET',
      headers: {
        'Referrer-Policy': 'no-referer-when-downgrade'
      },
    }).then((response)=>httpResponse=response)

    if (httpResponse.ok) {
      console.log("Verification successful")
    } else if (httpResponse.data.message) {
      alert(httpResponse.data.message)
    } else {
      alert("500 Internal Server Error"); 
    }
      window.location.href = '/'
    }
  verifyRegistration();
  return <div>Verifying registration...</div>
};

export default VerifyRegistrationPage;
