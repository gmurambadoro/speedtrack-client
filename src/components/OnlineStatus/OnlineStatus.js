import React from "react";
import green from "../../assets/images/green.ico";
import red from "../../assets/images/red.png";

export default function OnlineStatus({ lastActivityTime = null }) {
    let isOnline = false;

    if (lastActivityTime !== null) {
        const seconds = (Date.now() - lastActivityTime) / 1000;

        isOnline = (seconds <= (60 * 6)); // server has a refresh interval of 5 minutes + 1 minutes padding.
        // todo: Get this from server configuration
    }

    const styles = {
        width: 32,
        height: 'auto',
    };

    const hoverText = `${isOnline ? 'ONLINE' : 'OFFLINE'} : Last Refreshed: ${new Date(lastActivityTime).toLocaleString()}`;

    return (
        <span title={hoverText}>
            {
                isOnline
                    ? <img style={styles} alt={"Online"} src={green} />
                    : <img alt={"Offline"} style={styles} src={red} />
            }
        </span>
    );
}