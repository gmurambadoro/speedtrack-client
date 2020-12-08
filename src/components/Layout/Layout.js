import React from "react";
import {Container} from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {Route, Switch} from "react-router";
import Dashboard from "../Dashboard/Dashboard";
import {Link} from "react-router-dom";
import ServiceProviderFilter from "../ServiceProviderFilter/ServiceProviderFilter";
import OnlineStatus from "../OnlineStatus/OnlineStatus";

export default function Layout({ data }) {
    const {
        filterIsp,
        serviceProviders,
        setFilterIsp,
        selectedIspIds,
        lastActivityTime
    } = data;

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

                        <span className={"mr-2"}>
                            <OnlineStatus lastActivityTime={lastActivityTime} />
                        </span>

                        <ServiceProviderFilter
                            serviceProviders={serviceProviders}
                            setFilterIsp={setFilterIsp}
                            filterIsp={filterIsp}
                        />
                    </Navbar.Collapse>
                </Navbar>
            </header>

            <main>
                <Container sm={12}>
                    <Switch>
                        <Route path={"/"} exact>
                            <Dashboard selectedIspIds={selectedIspIds} data={data} />
                        </Route>
                    </Switch>
                </Container>
            </main>

            <footer>

            </footer>
        </React.Fragment>
    );
}