import React, { useState } from 'react';
import {
    useQuery
} from "@apollo/client";
import moment from 'moment';
import './MissionRow.css';
import { getMissionDescriptionQuery } from './api';

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
        getMissionDescriptionQuery,
        {
            skip: !props.missionId.length,
            variables: { 
                id: props.missionId[0] 
            }
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
            <td>{moment.utc(props.date).local().format('DD MMMM yyyy, HH:mm')} </td>
            <td>{props.name}</td>
            <td className='description'>{data?.mission.description}</td>
        </tr>
    );
};

export default MissionRow;