import React from "react";
import Card from "react-bootstrap/Card";

export default function SimpleCard({ item }) {
    return (
        <Card className={"m-2 text-center"} body style={item.styles || null}>
            <Card.Title>{item.title}</Card.Title>
            <Card.Text>{item.description}</Card.Text>
        </Card>
    );
}