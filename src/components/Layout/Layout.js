import React from "react";
import {Container} from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {Route, Switch} from "react-router";
import Dashboard from "../Dashboard/Dashboard";
import {Link} from "react-router-dom";

export default function Layout({ data, ...props }) {
    return (
        <React.Fragment>
            <header>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand as={Link} to={"/"}>React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link as={Link} to={"/"}><i className={"fas fa-tachometer-alt"} /> Dashboard</Nav.Link>
                            {/*<Nav.Link as={Link} to={"/test"}>Link</Nav.Link>*/}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </header>

            <main>
                <Container sm={12}>
                    <Switch>
                        <Route path={"/"} exact>
                            <Dashboard data={data} />
                        </Route>
                    </Switch>
                </Container>
            </main>

            <footer>

            </footer>
        </React.Fragment>
    );
}