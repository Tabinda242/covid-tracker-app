import React, { useState, useEffect } from 'react';
import { dailyData } from '../../Api';
import { Line, Bar } from 'react-chartjs-2';
import './Chart.css';

const Chart = ({ data: { confirmed, deaths, recovered }, country }) => {

    const [regularData, setRegularData] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            setRegularData(await dailyData());
        }

        fetchApi();
    }, []);

    const lineChart = (
        regularData.length ? (
            <Line
                data={{
                    labels: regularData.map(({ date }) => date),
                    datasets: [{
                        data: regularData.map(({ confirmed }) => confirmed),
                        label: 'Infected',
                        borderColor: '#3333ff',
                        fill: true,
                    }, {
                        data: regularData.map(({ deaths }) => deaths),
                        label: 'Deaths',
                        borderColor: 'red',
                        backgroundColor: 'rgba(255, 0 , 0, 0.5)',
                        fill: true,
                    }],
                }}
            />) : null
    );

    const barChart = (
        confirmed ? (
            <Bar
                data={{
                    labels: ['Infected', 'Recovered', 'Deaths'],
                    datasets: [{
                        label: 'People',
                        backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0 , 0, 0.5)'],
                        data: [confirmed.value, recovered.value, deaths.value]
                    }]
                }}
                options={{
                    legend: { display: false },
                    title: { display: true, text: `Current state in ${country}` },
                }}
            />
        ) : null
    );

    return (
        <div className="container">
            {country ? barChart : lineChart}
        </div>
    )
}

export default Chart;