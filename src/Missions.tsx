import React from 'react';
import MissionRow from './MissionRow'

interface LaunchesResultProps {
    content?: LaunchResultProps[];
};

export interface LaunchResultProps {
    id: string;
    launch_date_utc: string;
    mission_name: string;
    mission_id: string[];
};

export interface MissionProps {
    identifier: string;
    date: string;
    missionId: string[];
    id: string;
    name: string;
};

const Missions = (props: LaunchesResultProps) => {
    return <>
        {props.content && props.content.map(launch => {
            const key = `${launch.id}-${launch.launch_date_utc}`;
            return (
                <MissionRow
                    key={key}
                    identifier={key}
                    date={launch.launch_date_utc}
                    missionId={launch.mission_id}
                    id={launch.id}
                    name={launch.mission_name} />);
        })}
    </>;
};

export default Missions;