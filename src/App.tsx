import React from 'react';
import './App.css';
import { LaunchResultProps } from './Missions';
import MissionsTable from './MissionsTable';
import {
  useQuery,
  gql
} from "@apollo/client";

const launchesQuery = gql`
  query GetLaunches {
    launches(limit: 10, sort: "launch_date_utc", order: "desc") {
      launch_date_utc
      id
      mission_name
      mission_id
    }
  }`;

interface LaunchesResultData {
  launches: LaunchResultProps[];
};

function App() {
  const { loading, error, data } = useQuery<LaunchesResultData>(launchesQuery);

  if (error) return <p>Error :(</p>;

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Check 10 latest missions of SpaceX
        </p>
      </header>
      {loading || !data?.launches
        ? <div className="loading">Loading... </div>
        : <MissionsTable launches={data.launches}/>}
    </div>
  );
}

export default App;
