import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { toyService } from '../services/toy.service'
import { useEffect } from 'react'
import { useState } from 'react'

export function InstockChart() {

    ChartJS.register(ArcElement, Tooltip, Legend)

    const [counters, setCounters] = useState(null)

    useEffect(() => {
        // toyService.getToysInStock().then(toys => setCounter(toyService.getFilteredToysByLabel(toys)))
        toyService.getToysCountPerLabel().then(setCounters)
    }, [])
    // console.log('counter:', counters)
    // console.log('toysByLabelMap:', toysByLabelMap)
    const data = {
        labels: ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor", "Battery Powered"],
        datasets: [
            {
                label: 'Number of Toys',
                data: counters,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(49, 225, 247, 0.2)',
                    'rgb(64, 13, 81, 0.2)'

                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(49, 225, 247, 1)',
                    'rgb(64, 13, 81, 1)'

                ],
                borderWidth: 1,
            },
        ],
    }

    return <div style={{ width: '60%', margin: 'auto' }}>
        <Pie data={data} />
    </div>


}
