import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Mainpage from './pages/Mainpage';
import Wallet from './pages/Wallet';
import Header from './Header';

export default function Router() {

    return(
        <>
            <BrowserRouter>
            <Header/>
            <Routes>
                <Route path='/' element={<Mainpage/>}/>
                <Route path='/wallet' element={<Wallet/>}/>
            </Routes>
            </BrowserRouter>
        </>
    )
}