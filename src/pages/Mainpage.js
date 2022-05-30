import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css'
import Graphic from '../graph/Graphic';
import Wallet from './Wallet';
import { Link, useNavigate } from 'react-router-dom' 

export default function Mainpage() {
    const [coin, setCoin] = useState(true)
    const [response, setResponse] = useState()
    const baseUrl = 'https://min-api.cryptocompare.com/data/v2/histoday?'

    useEffect(() => {
        const getData = async () => {
            if (coin === true) {
                const setData = await axios.get(baseUrl + 'fsym=BTC&tsym=ETH&limit=13')
                setResponse(setData.data.Data)
            }
            else {
                const setData = await axios.get(baseUrl + 'fsym=ETH&tsym=BTC&limit=13')
                setResponse(setData.data.Data)
            }
        }
        getData()
        // console.log(response);
    }, [coin])

    const ratio = response?.Data[13]?.high - response?.Data[12]?.high
    const percent = ratio / (response?.Data[13]?.high / 100)

    return (
        <>
            <div className='mainPage'>
                <div className='container'>
                    <div className='col-lg-18'>
                        <div className='row'>

                            <div className='contFlex'>
                                <div className='textBlock'>
                                    <div className='mainText'>
                                        Buy Bitcoin or Ethereum
                                    </div>
                                    <div className='medText'>
                                        check prices for the most <br />popular crypto-tokens, or buy them at a price without margin.
                                    </div>
                                    <div className='buttonMain'>
                                        <div className='wBh'>
                                            <Link to={'/wallet'} style={{ textDecoration: 'none', color: 'inherit' }}>Buy coins now</Link></div>
                                    </div>

                                </div>
                                <div className='graph'>
                                    <div className='graphRow'>
                                        <div className='nameText'>
                                            {coin ? 'BTC/ETH' : 'ETH/BTC'}
                                            <div className='bChange' onClick={() => setCoin(!coin)} />
                                        </div>
                                        <div className='nameText'>
                                            {ratio > 0 ? '+' + ratio.toFixed(4) + ' ( ' : ratio.toFixed(4) + ' ( '}
                                            {percent > 0 ? '+' + percent.toFixed(2) + '% )' : percent.toFixed(2) + '% )'}
                                        </div>
                                    </div>

                                    <div className='axes'>
                                        <Graphic data={response} coin={coin} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </>
    )
}