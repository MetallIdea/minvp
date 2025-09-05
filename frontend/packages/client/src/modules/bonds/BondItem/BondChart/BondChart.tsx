'use client'

import { Chart } from "primereact/chart"
import { useEffect, useState } from "react";

type Props = {
    data: any[];
}

export function BondChart({ data }: Props) {
    const [chartData, setChartData] = useState({});
    const [barData, setBarData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const mappedTimes = data.map(({ Time }) => {
            const date = new Date(Time);
            return `${date.getDate()}.${date.getMonth() + 1}`
        })
        const mappedDate = data.map(({ Close }) => {
            return Close
        })
        const mappedDateBar = data.map(({ Close, Open }) => {
            return Close - Open
        })

        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const chartData = {
            labels: mappedTimes,
            datasets: [
                {
                    type: 'line',
                    label: 'Dataset 1',
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    borderWidth: 2,
                    fill: false,
                    tension: 0.4,
                    data: mappedDate
                },
            ]
        };
        const barData = {
            labels: mappedTimes,
            datasets: [
                {
                    type: 'bar',
                    label: 'Dataset 2',
                    backgroundColor: documentStyle.getPropertyValue('--green-500'),
                    borderColor: documentStyle.getPropertyValue('--green-500'),
                    borderWidth: 2,
                    data: mappedDateBar,
                }
            ]
        };
        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    beginAtZero: false,
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };

        setChartData(chartData);
        setBarData(barData);
        setChartOptions(options);
    }, []);

    return <div>

        <Chart type="line" data={chartData} options={chartOptions} />
        <Chart type="bar" data={barData} options={chartOptions} />
    </div>
}