import React, {useEffect, useState} from "react";
import {Col, Row} from "react-bootstrap";
import bytes from "bytes";
import SimpleCard from "../SimpleCard/SimpleCard";

export default function Dashboard({ data, selectedIspIds }) {
    const {speeds} = data;

    const [speedData, setSpeedData] = useState([]);

    useEffect(() => {
        const today = (new Date()).toISOString().substr(0, 10);

        const todaySpeeds = speeds.filter(x => x.timestamp.substr(0, 10) === today);

        setSpeedData(() => [...todaySpeeds]);
    }, [speeds]);

    const filterByIsp = item => {
        if (selectedIspIds === null) {
            return item;
        }

        return selectedIspIds
            .map(x => String(x).trim().toLowerCase())
            .includes(String(item.serviceProvider).toString().trim().toLowerCase());
    };

    const filteredData = speedData.filter(filterByIsp);

    const averageDownload = filteredData.map(x => parseFloat(x.download)).reduce((prev, cur) => {
        return prev + cur;
    }, 0) / filteredData.length;

    const averageUpload = filteredData.map(x => parseFloat(x.upload)).reduce((prev, cur) => {
        return prev + cur;
    }, 0) / filteredData.length;

    const averageLatency = filteredData.map(x => parseFloat(x.ping)).reduce((prev, cur) => {
        return prev + cur;
    }, 0) / filteredData.length;

    const totalData = filteredData.map(x => parseFloat(x.bytesSent) + parseFloat(x.bytesReceived)).reduce((prev, cur) => {
        return prev + cur;
    }, 0);

    const styles = {
        boxShadow: '4px 4px lightgray',
    };

    const downloadStats = [
        {
            title: 'Download Speed',
            description: (
                <React.Fragment>
                    <i className={"fas fa-arrow-down"} />
                    {' '}
                    {bytes(averageDownload || 0)}/s
                </React.Fragment>
            ),
        },
        {
            title: 'Upload Speed',
            description: (
                <React.Fragment>
                    <i className={"fas fa-arrow-up"} />
                    {' '}
                    {bytes(averageUpload || 0)}/s
                </React.Fragment>
            ),
        },
        {
            title: 'Latency',
            description: (
                <React.Fragment>
                    <i className={"fas fa-clock"} />
                    {' '}
                    {(averageLatency || 0).toFixed(1)} ms
                </React.Fragment>
            ),
        },
        {
            title: 'Sent / Received',
            description: (
                <React.Fragment>
                    <i className={"fas fa-wifi"} />
                    {' '}
                    {bytes(totalData || 0)}
                </React.Fragment>
            ),
        },
    ];

    return (
        <React.Fragment>
            <Row>
                {downloadStats.map(x => (
                    <Col xs={12} sm={6} md={3}>
                        <SimpleCard key={x.title} item={{
                            ...x,
                            styles,
                        }} />
                    </Col>
                ))}
            </Row>
        </React.Fragment>
    );
}