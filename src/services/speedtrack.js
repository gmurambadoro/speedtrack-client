import axios from "axios";

const speedtrack = function() {
    const connector = axios.create({
        baseURL: 'http://speedtrack.localhost:8080',
    });

    const getData = async (endpoint) => {
        const collection = [];

        let page = 1;

        while (true) {
            const response = await connector.get(`${endpoint}?page=${page}`);

            if (!response.data.length) {
                break;
            }

            collection.push(...response.data);

            page += 1;
        }

        return collection;
    };

    return {
        connector,
        getServers: async () => getData('/servers.json'),
        getSpeeds: async () => getData('/speeds.json'),
        getServiceProviders: async () => getData('/internet-service-providers.json'),
    };
};

export default speedtrack;