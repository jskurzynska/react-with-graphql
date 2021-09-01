import React, { useState, useEffect } from 'react';
import './App.css';
import Missions, { MissionProps } from './Missions';
import {
  useQuery,
  gql
} from "@apollo/client";


const launchesQuery = gql`
  query GetLaunches {
    launches(limit: 10, sort: "launch_date_utc", order: "desc") {
      id
      launch_date_utc
      mission_name
      mission_id
    }
  }`;

const missionDetailsQuery = gql`
  query GetMissionDescription($id: ID) { 
    someOtherStuff(id: $id){ stuff } 
  }`;

function App() {
  // const [missions, setMissions] = useState<MissionProps[]>();
  const { loading, error, data } = useQuery(launchesQuery);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Check 10 latest missions of SpaceX
        </p>
      </header>
      <table className="table table-sm table-dark">
        <thead>
          <tr>
            <th scope="col">Ulubiony</th>
            <th scope="col">Data</th>
            <th scope="col">Nazwa misji</th>
            <th scope="col">Opis</th>
          </tr>
        </thead>
        <tbody>
          <Missions content={data.launches} />
        </tbody>
      </table>
    </div>
  );
}

export default App;
