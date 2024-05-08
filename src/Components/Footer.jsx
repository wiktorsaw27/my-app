import React from 'react'
import './Footer.css'
import {InstagramLogo} from 'phosphor-react'
import {Copyright} from 'phosphor-react'
import {LinkedinLogo} from 'phosphor-react'
import {FacebookLogo} from 'phosphor-react'
import {TwitterLogo} from 'phosphor-react'


export const Footer = () => {
  return (
    <div className='footer'>
        <div className="socials-logo">
            <InstagramLogo size={33}/>
            <FacebookLogo size={33}/>
            <LinkedinLogo size={33}/>
            <TwitterLogo size={33}/>
        </div>
        
        <div className="copyrights">
        <Copyright size={28}/>
        <p>Copyright 2001 - 2024 IFIRMA SA spółka notowana na GPW</p>
        </div>
    </div>
  )
}
