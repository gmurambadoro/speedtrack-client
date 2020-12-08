import React, {useEffect, useState} from "react";
import speedtrack from "../../services/speedtrack";
import {BrowserRouter} from "react-router-dom";
import Layout from "../Layout/Layout";

export default function App() {
    const [servers, setServers] = useState([]);
    const [speeds, setSpeeds] = useState([]);
    const [serviceProviders, setServiceProviders] = useState([]);
    const [filterIsp, setFilterIsp] = useState('ALL');
    const [lastActivityTime, setLastActivityTime] = useState(null)

    useEffect(() => {
        const { getServers, getSpeeds, getServiceProviders } = speedtrack();

        const refresh = () => {
            getServers().then(data => {
                setServers(() => [...data]);

                setLastActivityTime(Date.now());
            }).catch(err => console.error(`ERROR!! Cannot getServers:: ${err}`));

            getSpeeds().then(data => {
                setSpeeds(() => [...data]);

                if (data) {
                    const { timestamp } = data[0];

                    setLastActivityTime(Date.parse(timestamp));
                } else {
                    setLastActivityTime(new Date(0));
                }
            }).catch(err => console.error(`ERROR!! Cannot getSpeeds:: ${err}`));

            getServiceProviders().then(data => {
                setServiceProviders(() => [...data]);

                setLastActivityTime(Date.now());
            }).catch(err => console.error(`ERROR!! Cannot setServiceProviders:: ${err}`));
        };

        refresh();

        const timer = setInterval(refresh, 1000 * 60);

        return () => clearInterval(timer);
    }, []);

    const selectedIspIds = () => {
        if (filterIsp === 'ALL') {
            return null;
        }

        return serviceProviders
            .filter(x => String(x.isp).toUpperCase() === filterIsp.toUpperCase())
            .map(y => `/internet-service-providers/${y.id}`);
    };

    return (
        <BrowserRouter>
            <Layout data={{
                servers,
                speeds,
                serviceProviders,
                filterIsp,
                setFilterIsp,
                lastActivityTime,
                selectedIspIds: selectedIspIds(),
            }} />
        </BrowserRouter>
    );
}