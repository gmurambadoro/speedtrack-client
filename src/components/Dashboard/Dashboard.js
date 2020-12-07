import React, {useEffect, useState} from "react";
import {Col, Row} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import bytes from "bytes";
import SimpleCard from "../SimpleCard/SimpleCard";

export default function Dashboard({ data }) {
    const {speeds} = data;

    const [speedData, setSpeedData] = useState([]);

    useEffect(() => {
        const today = (new Date()).toISOString().substr(0, 10);

        const todaySpeeds = speeds.filter(x => x.timestamp.substr(0, 10) === today);

        setSpeedData(() => [...todaySpeeds]);
    }, [speeds]);

    const averageDownload = speedData.map(x => parseFloat(x.download)).reduce((prev, cur) => {
        return prev + cur;
    }, 0) / speedData.length;

    const averageUpload = speedData.map(x => parseFloat(x.upload)).reduce((prev, cur) => {
        return prev + cur;
    }, 0) / speedData.length;

    const averageLatency = speedData.map(x => parseFloat(x.ping)).reduce((prev, cur) => {
        return prev + cur;
    }, 0) / speedData.length;

    const totalData = speedData.map(x => parseFloat(x.bytesSent) + parseFloat(x.bytesReceived)).reduce((prev, cur) => {
        return prev + cur;
    }, 0);

    const styles = {
        boxShadow: '4px 4px lightgray',
    };

    const downloadStats = [
        {
            title: 'Download',
            description: (
                <>
                    <i className={"fas fa-arrow-down"} />
                    {' '}
                    {bytes(averageDownload || 0)}/s
                </>
            ),
        },
        {
            title: 'Upload',
            description: (
                <>
                    <i className={"fas fa-arrow-up"} />
                    {' '}
                    {bytes(averageUpload || 0)}/s
                </>
            ),
        },
        {
            title: 'Latency',
            description: (
                <>
                    <i className={"fas fa-clock"} />
                    {' '}
                    {bytes(averageDownload || 0)}/s
                </>
            ),
        },
        {
            title: 'Data Used',
            description: (
                <>
                    <i className={"fas fa-wifi"} />
                    {' '}
                    {bytes(totalData || 0)}
                </>
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