import React, { useState } from 'react';
import {
    useQuery,
    gql
} from "@apollo/client";
import './MissionRow.css';

const missionDescriptionQuery = gql`
  query GetMissionDescription($id: ID!) { 
    mission(id: $id) { description } 
  }`;

export interface MissionProps {
    identifier: string;
    date: string;
    missionId: string[];
    id: string;
    name: string;
};

interface MissionDetailsData {
    mission: MissionData;
}
interface MissionData {
    description: string;
}

interface MissionDetailsVars {
    id?: string;
}

const MissionRow = (props: MissionProps) => {
    const { loading, error, data } = useQuery<MissionDetailsData, MissionDetailsVars>(
        missionDescriptionQuery,
        {
            skip: props.missionId.length === 0,
            variables: { id: props.missionId[0] }
        }
    );

    const checkboxIdentifier = `checkbox${props.identifier}`;
    const [favourite, setFavourite] = useState(localStorage.getItem(checkboxIdentifier) === 'true');
    const onCheckboxChange = () => {
        setFavourite(!favourite);
        localStorage.setItem(checkboxIdentifier, (!favourite).toString());
    }
    if (loading || error) return null;
    return (
        <tr>
            <td>
                <input
                    className="star"
                    type="checkbox"
                    defaultChecked={favourite}
                    onChange={onCheckboxChange} />
            </td>
            <td>{new Date(props.date).toLocaleDateString("pl-PL", {
                year: "numeric",
                month: "long",
                day: "2-digit",
                hour: 'numeric',
                minute: 'numeric'
            })} </td>
            <td>{props.name}</td>
            <td className='description'>{data?.mission.description}</td>
        </tr>
    );
};

export default MissionRow;