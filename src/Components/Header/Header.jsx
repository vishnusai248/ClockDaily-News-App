import React, { useContext, useState } from 'react'
import './Header.scss'
import { ThemeContext } from '../../App'


export default function Header(props) {
  const setdarkmode=props.setdarkmode
  const isdarkmode=useContext(ThemeContext)

  const switchtheme=()=>{
    setdarkmode(!isdarkmode)
  }
  
  return (
    <div className={`header d-flex justify-content-between px-2 ${isdarkmode ? 'dark-theme' : 'light-theme'} `}>
        <h2 className='text-right'>ClockDaily News</h2> 
        <div className='form-check form-switch d-flex align-items-center gap-1'>
          <input role='switch' className='form-check-input themebutton' type='checkbox' id="switch" onClick={switchtheme} title='switch theme'/>
          <label htmlFor='switch' className='form-check-label themefont'>{isdarkmode?'Dark Theme':'Light Theme'}</label>
        </div>
    </div>
  )
}
