import React from 'react';
import './App.css'
import { Link } from 'react-router-dom'

export default function Header() {

    return (
        <><div className='header'>

            <Link to={'/'} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className='logo'>
                    BS.WORLD
                </div>
            </Link>
            <Link to={'/wallet'} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className='button'>
                    <div className='wBh'>
                        Wallet
                    </div>
                </div >
            </Link>
        </div>

        </>
    )
}