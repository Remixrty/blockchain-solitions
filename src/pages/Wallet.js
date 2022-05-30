import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Wallet() {
    const baseUrl = 'https://min-api.cryptocompare.com/data/price?'
    const [btcusd, setBtcusd] = useState(0)
    const [btceth, setBtceth] = useState(0)
    const [ethusd, setEthusd] = useState(0)
    const [ethbtc, setEthbtc] = useState(0)
    const [btc, setBtc] = useState(localStorage.getItem('USD') ? parseFloat(localStorage.getItem('USD')) : 0)
    const [usd, setUsd] = useState(localStorage.getItem('BTC') ? parseFloat(localStorage.getItem('BTC')) : 0)
    const [eth, setEth] = useState(localStorage.getItem('ETH') ? parseFloat(localStorage.getItem('ETH')) : 0)
    const [currentCoin, setCurrentCoin] = useState(0)
    const [targetCoin, setTargetCoin] = useState(0)
    const [currentValue, setCurrentValue] = useState(0)
    const [receiveValue, setReceiveValue] = useState(0)
    const [drop, setDrop] = useState('USD')
    const [dropdown, setDropdown] = useState('BTC')
    const [changeState, setChangeState] = useState(false)

    useEffect(() => {

        if (currentValue > currentCoin) {
            document.getElementById('spend').style.borderColor = 'red'
            console.log(currentValue, currentCoin);
        }
        else {
            document.getElementById('spend').style.borderColor = 'black'
        }
    }, [currentValue, currentCoin])



    // useEffect(() => {
    //     if (localStorage.getItem('USD') && localStorage.getItem('USD') !== usd) { localStorage.setItem('USD', usd) }
    //     if (localStorage.getItem('BTC') && localStorage.getItem('BTC') !== btc) { localStorage.setItem('BTC', btc) }
    //     if (localStorage.getItem('ETH') && localStorage.getItem('ETH') !== eth) { localStorage.setItem('ETH', eth) }
    // }, [usd, btc, eth])

    useEffect(() => {
        console.log(usd, btc, eth);
    }, [usd, btc, eth])

    useEffect(() => {
        const getData = async () => {
            const Btcusd = await axios.get(baseUrl + 'fsym=BTC&tsyms=USD')
            const Btceth = await axios.get(baseUrl + 'fsym=BTC&tsyms=ETH')
            const Ethusd = await axios.get(baseUrl + 'fsym=ETH&tsyms=USD')
            const Ethbtc = await axios.get(baseUrl + 'fsym=ETH&tsyms=BTC')
            setBtcusd(Btcusd.data?.USD)
            setBtceth(Btceth.data?.ETH)
            setEthusd(Ethusd.data?.USD)
            setEthbtc(Ethbtc.data?.BTC)
        }

        getData()
    }, [])

    useEffect(() => {
        // console.log(btcusd, btceth, ethusd);
    }, [btcusd, btceth, ethusd])

    useEffect(() => {
        const lsUsd = parseFloat(localStorage.getItem('USD'))
        const lsBtc = parseFloat(localStorage.getItem('BTC'))
        const lsEth = parseFloat(localStorage.getItem('ETH'))
        // console.log(lsUsd, lsBtc, lsEth);
        lsUsd > 0 ? setUsd((lsUsd)) : localStorage.setItem('USD', 4274.21)
        lsBtc > 0 ? setBtc((lsBtc)) : localStorage.setItem('BTC', 0.2129)
        lsEth > 0 ? setEth((lsEth)) : localStorage.setItem('ETH', 4.21)

    }, [])


    useEffect(() => {
        if (drop == 'USD' && dropdown == 'BTC') { setReceiveValue(parseFloat(currentValue) / parseFloat(btcusd)); setCurrentCoin(usd) }
        if (drop == 'USD' && dropdown == 'ETH') { setReceiveValue(parseFloat(currentValue) / parseFloat(ethusd)); setCurrentCoin(usd) }
        if (drop == 'BTC' && dropdown == 'ETH') { setReceiveValue(parseFloat(currentValue) / parseFloat(ethbtc));setCurrentCoin(btc) }
        if (drop == 'BTC' && dropdown == 'USD') { setReceiveValue(parseFloat(currentValue) * parseFloat(btcusd));setCurrentCoin(btc) }
        if (drop == 'ETH' && dropdown == 'BTC') { setReceiveValue(parseFloat(currentValue) * parseFloat(ethbtc));setCurrentCoin(eth) }
        if (drop == 'ETH' && dropdown == 'USD') { setReceiveValue(parseFloat(currentValue) * parseFloat(ethusd));setCurrentCoin(eth) }
        if (drop === dropdown) { setReceiveValue(parseFloat(currentValue)) }

    }, [currentValue])

    useEffect(() => {
        if (drop == 'USD' && dropdown == 'BTC') { setCurrentValue(parseFloat(receiveValue) * parseFloat(btcusd)); setTargetCoin(btc) }
        if (drop == 'USD' && dropdown == 'ETH') { setCurrentValue(parseFloat(receiveValue) * parseFloat(ethusd)); setTargetCoin(eth) }
        if (drop == 'BTC' && dropdown == 'ETH') { setCurrentValue(parseFloat(receiveValue) * parseFloat(ethbtc)); setTargetCoin(eth) }
        if (drop == 'BTC' && dropdown == 'USD') { setCurrentValue(parseFloat(receiveValue) / parseFloat(btcusd)); setTargetCoin(usd) }
        if (drop == 'ETH' && dropdown == 'BTC') { setCurrentValue(parseFloat(receiveValue) / parseFloat(ethbtc)); setTargetCoin(btc) }
        if (drop == 'ETH' && dropdown == 'USD') { setCurrentValue(parseFloat(receiveValue) / parseFloat(ethusd)); setTargetCoin(usd) }
        if (drop === dropdown) { setCurrentValue(parseFloat(receiveValue)) }

    }, [receiveValue])

    useEffect(() => {
        if (dropdown === 'USD') {
            setTargetCoin(usd)
        }
        if (dropdown === 'BTC') {
            setTargetCoin(btc)
        }
        if (dropdown === 'ETH') {
            setTargetCoin(eth)
        }
    }, [dropdown])

    useEffect(() => {
        if (drop === 'USD') {
            setCurrentCoin(usd)
        }
        if (drop === 'BTC') {
            setCurrentCoin(btc)
        }
        if (drop === 'ETH') {
            setCurrentCoin(eth)
        }
    }, [drop])

    useEffect(() => {
        if (changeState) {
            localStorage.setItem('BTC', btc)
            localStorage.setItem('ETH', eth)
            localStorage.setItem('USD', usd)
            setChangeState(false)
        }
    }, [changeState])

    function checkData() {
        if (currentValue < currentCoin && receiveValue !== '0.00') {
            setCurrentCoin(currentCoin - currentValue)
            setTargetCoin(targetCoin + receiveValue)
            console.log(currentCoin, targetCoin);
            if (drop == 'USD') { setUsd(currentCoin - currentValue) }
            if (drop == 'BTC') { setBtc(currentCoin - currentValue) }
            if (drop == 'ETH') { setEth(currentCoin - currentValue) }
            if (dropdown == 'USD') { setUsd(targetCoin + receiveValue) }
            if (dropdown == 'BTC') { setBtc(targetCoin + receiveValue) }
            if (dropdown == 'ETH') { setEth(targetCoin + receiveValue) }
            setChangeState(true)
            setCurrentValue(0)
            setReceiveValue(0)
            // console.log(currentValue, receiveValue);
        }
    }

    return (
        <>
            <div className='mainPage'>
                <div className='container'>
                    <div className='col-lg-18'>
                        <div className='row'>
                            <div className='mainField'>
                                <div className='columnOne'>
                                    <div className='prices'>
                                        <div className='price'>
                                            1 BTC = <div className='ciphr'>{btcusd.toFixed(2)}</div> USD
                                        </div><br />
                                        <div className='price'>
                                            1 ETH = <div className='ciphr'>{ethusd.toFixed(2)}</div> USD
                                        </div>

                                    </div>
                                    <div className='exchange'>
                                        <div className='spend' id='spend'>
                                            Spend:<br />
                                            <input type='number' step='0.01' className='superInput' onChange={e => setCurrentValue(e.target.value)} placeholder={currentValue > 0 ? currentValue : '0.00-' + currentCoin.toFixed(2)} />
                                            <div className="dropdown">
                                                <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                    {drop}
                                                </button>
                                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                    <li><a className="dropdown-item" onClick={() => setDrop('USD')}>USD</a></li>
                                                    <li><a className="dropdown-item" onClick={() => setDrop('BTC')}>BTC</a></li>
                                                    <li><a className="dropdown-item" onClick={() => setDrop('ETH')}>ETH</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className='spend'>
                                            Receive:<br />
                                            <input type='number' step='0.01' className='superInput' onChange={e => setReceiveValue(e.target.value)} placeholder={receiveValue > 0 ? receiveValue : '0.00'} />
                                            <div className="dropdown">
                                                <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                    {dropdown}
                                                </button>
                                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                    <li><a className="dropdown-item" onClick={() => setDropdown('USD')}>USD</a></li>
                                                    <li><a className="dropdown-item" onClick={() => setDropdown('BTC')}>BTC</a></li>
                                                    <li><a className="dropdown-item" onClick={() => setDropdown('ETH')}>ETH</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className='columnTwo'>
                                    <div className='walletBalance'>
                                        <div className='priceW'>Wallet balance:</div>
                                        <div className='priceWallet'>
                                            <div className='ciphrW'>{usd.toFixed(2)}</div> USD
                                        </div><br />
                                        <div className='priceWallet'>
                                            <div className='ciphrW'>{btc.toFixed(8)}</div> BTC
                                        </div><br />
                                        <div className='priceWallet'>
                                            <div className='ciphrW'>{eth.toFixed(8)}</div> ETH
                                        </div><br />
                                    </div>
                                    <div className='buttonChange' onClick={() => checkData()}>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div></div></div>
        </>
    )
}