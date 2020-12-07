import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import _ from "lodash";

export default function ServiceProviderFilter({ serviceProviders, setFilterIsp, filterIsp }) {
    if (!serviceProviders) {
        return null;
    }

    const isps = _.uniq(serviceProviders.map(p => String(p.isp).toUpperCase())).sort();

    return (
        <Dropdown className={"mr-4"}>
            <Dropdown.Toggle variant={"secondary"} id="dropdown-basic" className={"mr-3"}>
                <i className={"fas fa-wifi"} /> {filterIsp === 'ALL' ? 'ALL ISP\'s' : filterIsp}
            </Dropdown.Toggle>

            <Dropdown.Menu className={"mr-2"}>
                <Dropdown.Item onClick={() => setFilterIsp('ALL')}>ALL ISP's</Dropdown.Item>
                {
                    isps.map(name => <Dropdown.Item key={name} onClick={() => setFilterIsp(name)}>{name}</Dropdown.Item>)
                }
            </Dropdown.Menu>
        </Dropdown>
    );
}