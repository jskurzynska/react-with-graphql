import {
    gql
} from "@apollo/client";

export const getLaunchesQuery = gql`
    query GetLaunches ($limit: Int){
        launches(limit: $limit, sort: "launch_date_utc", order: "desc") {
            launch_date_utc
            id
            mission_name
            mission_id
      }
    }`;

export const getMissionDescriptionQuery = gql`
    query GetMissionDescription($id: ID!) { 
        mission(id: $id) { 
            description 
        } 
    }`;