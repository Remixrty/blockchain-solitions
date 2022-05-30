import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, Tooltip, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
    CategoryScale,
    LineElement,
    LinearScale,
    PointElement,
    Tooltip
)

const Graphic = (props) => {
    const array = props.data
    const coin = props.coin
    console.log(array);
    const data = {
        labels: ['14', '13', '12', '11', '10', '9', '8', '7', '6', '5', '4', '3', '2', '1', '0'],
        datasets: [{
            label: coin ? 'BTC/ETH' : 'ETH/BTC',
            data: array?.Data?.map(x => x.high),
            backgroundColor: '#ffffff',
            borderColor: 'rgba(0, 0, 0, 0.5)',
            fill: false,
            borderWidth: 2,
            tension: 0.2
        }]
    }
    const options = {
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: false
            }
        },
        plugins: {
            tooltip: {
                // enabled: true,
                mode: 'index',
                intersect: false,
                caretSize: 3,

                callbacks: {
                    title() {
                        return ''
                    }
                }
            },
        },
        
        legend: {
            display: false,
        }
    }

    return (
        <>
            <Line
                data={data}
                options={options}
            />
        </>
    )
}

export default Graphic