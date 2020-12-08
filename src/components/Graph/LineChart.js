import React from "react";
import {Line} from "react-chartjs-2";
import _ from "lodash";

export default function LineChart({ data: rawData }) {
    const labels = _.reverse(rawData.map(x => String(x.timestamp).slice(11, 11 + 5)));

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Download Speed',
                data: _.reverse(rawData.map(x => parseFloat(x.download) / (1024 * 1024))),
                fill: false,
                backgroundColor: 'green',
                borderColor: 'green',
            },
            {
                label: 'Upload Speed',
                data: _.reverse(rawData.map(x => parseFloat(x.upload) / (1024 * 1024))),
                fill: false,
                backgroundColor: 'red',
                borderColor: 'red',
            },
        ],
    };

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    };

    return (
        <div className={"mt-2"}>
            <p>
                <strong>Daily Stats</strong>
            </p>

            <Line data={data} options={options} />
        </div>
    );
}