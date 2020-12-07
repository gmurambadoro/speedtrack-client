import React, {useEffect, useState} from "react";
import {Col, Row} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import bytes from "bytes";

export default function Dashboard({ data }) {
    const { servers, speeds, serviceProviders } = data;

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

    return (
        <React.Fragment>
            <Row>
                <Col xs={12} sm={6} md={3}>
                    <Card className={"m-2 text-center"} body style={styles}>
                        <Card.Title>Download</Card.Title>
                        <Card.Text><i className={"fas fa-arrow-down"} /> {bytes(averageDownload || 0)}ps</Card.Text>
                    </Card>
                </Col>

                <Col xs={12} sm={6} md={3}>
                    <Card className={"m-2 text-center"} body style={styles}>
                        <Card.Title>Upload</Card.Title>
                        <Card.Text><i className={"fas fa-arrow-up"} /> {bytes(averageUpload || 0)}ps</Card.Text>
                    </Card>
                </Col>

                <Col xs={12} sm={6} md={3}>
                    <Card className={"m-2 text-center"} body style={styles}>
                        <Card.Title>Latency</Card.Title>
                        <Card.Text><i className={"fas fa-clock"} /> {(averageLatency || 0).toFixed(1)} ms</Card.Text>
                    </Card>
                </Col>

                <Col xs={12} sm={6} md={3}>
                    <Card className={"m-2 text-center"} body style={styles}>
                        <Card.Title>Data Used</Card.Title>
                        <Card.Text><i className={"fas fa-wifi"} /> {bytes(totalData || 0)}</Card.Text>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
}