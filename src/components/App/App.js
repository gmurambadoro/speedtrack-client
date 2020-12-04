import React, {useEffect, useState} from "react";
import speedtrack from "../../helpers/speedtrack";

export default function App() {
    const [servers, setServers] = useState([]);
    const [speeds, setSpeeds] = useState([]);
    const [serviceProviders, setServiceProviders] = useState([]);

    useEffect(() => {
        const { getServers, getSpeeds, getServiceProviders } = speedtrack();

        const refresh = () => {
            console.log(`Refreshing data @ ${(new Date()).toUTCString()}`);

            getServers().then(data => {
                setServers(() => [...data]);
            }).catch(err => console.error(`ERROR!! Cannot getServers:: ${err}`));

            getSpeeds().then(data => {
                setSpeeds(() => [...data]);
            }).catch(err => console.error(`ERROR!! Cannot getSpeeds:: ${err}`));

            getServiceProviders().then(data => {
                setServiceProviders(() => [...data]);
            }).catch(err => console.error(`ERROR!! Cannot setServiceProviders:: ${err}`));
        };

        refresh();

        const timer = setInterval(refresh, 1000 * 60);

        return () => clearInterval(timer);
    }, []);

    return (
        <React.Fragment>
            <h1>Servers ({servers.length})</h1>
            <h1>Speeds ({speeds.length})</h1>
            <h1>Service Providers ({serviceProviders.length})</h1>
        </React.Fragment>
    );
}