import React from 'react';
import './App.css'
import { Link } from 'react-router-dom'

export default function Header() {

    return (
        <>
            <div className='header'>
                <div className='logo'><Link to={'/'} style={{ textDecoration: 'none', color: 'inherit' }}>BS.WORLD</Link></div>
                <div className='button'>
                    <div className='wBh'><Link to={'/wallet'} style={{ textDecoration: 'none', color: 'inherit' }}>Wallet</Link></div>
                </div>
            </div>
        </>
    )
}