import React from 'react';

interface MissionsResultProps {
    content: MissionResultProps[];
};

export interface MissionResultProps {
    id: string;
    launch_date_utc: string;
    mission_name: string;
    mission_id: string;
};

export interface MissionProps {
    date: string;
    description: string;
    id: string;    
    name: string;
};

const MissionRow = (props: MissionProps) => {
    return (
        <tr key={props.id}>
            <td><input className="star" type="checkbox" title="bookmark page" /></td>
            <td>{new Date(props.date).toLocaleDateString("pl-PL", {
                year: "numeric",
                month: "long",
                day: "2-digit",
                hour: 'numeric',
                minute: 'numeric'
            })}</td>
            <td>{props.name}</td>
            <td>{props.description}</td>
        </tr>
    );
};
const Missions = (props: MissionsResultProps) => {
    return <>
        {props.content.map(mission => (
            <MissionRow date={mission.launch_date_utc} description={mission.mission_id} id={mission.id} name={mission.mission_name} />
        ))}
    </>;
};

export default Missions;