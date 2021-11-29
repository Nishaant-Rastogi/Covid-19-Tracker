import React, { useState, useEffect } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import numeral from "numeral";


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
)


const options = {
    plugins: {
        legend: false,
    },
    elements: {
        line: {
            fill: true
        },
        point: {
            radius: 0,
        },
    },
    maintainAspectRatio: true,
    tooltips: {
        mode: "index",
        intersect: true,
        callbacks: {
            label: function (tooltipItem, data) {
                return numeral(tooltipItem.value).format("+0,0");
            },
        },
    },
    responsive: true,
    scales: {
        xAxes: [{
            type: "time",
            time: {
                format: "MM/DD/YY",
                tooltipFormat: "ll",
            },
        }],
        yAxes: [{
            ticks: {
                callback: function (value, index, values) {
                    return numeral(value).format("0a");
                },
            },
        }]
    }
};

const buildChartData = (data, casesType = "cases") => {
    let chartDataX = [];
    let chartDataY = [];
    let lastDataPoint = 0;
    for (let date in data[casesType]) {
        if (lastDataPoint) {
            chartDataX.push(date);
            chartDataY.push(data[casesType][date] - lastDataPoint);
        }
        lastDataPoint = data[casesType][date];
    }
    return [chartDataX, chartDataY];
};

function LineGraph({ casesTypes }) {
    const [data, setData] = useState({});
    const [color, setColor] = useState("#CC1034")
    useEffect(() => {
        const fetchData = async () => {
            await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    let chartData = buildChartData(data, casesTypes);
                    setColor(casesTypes === 'cases' ? "#CC1034" : (casesTypes === "recovered" ? "#7dd71d" : "#fb4443"))
                    setData(chartData);
                });
        };

        fetchData();
    }, [casesTypes]);

    return (
        <div>
            <h1>Graph</h1>
            {data?.length > 0 && (<Line
                options={options}
                data={{
                    labels: data[0],
                    datasets: [
                        {
                            backgroundColor: color,
                            borderColor: color,
                            fill: true,
                            data: data[1],
                        },
                    ],
                }}
            />)}
        </div>
    );
}

export default LineGraph;