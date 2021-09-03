import React from 'react';
import {
  useQuery
} from "@apollo/client";
import './App.css';
import { LaunchResultProps } from './Missions';
import MissionsTable from './MissionsTable';
import { getLaunchesQuery} from './api';

interface LaunchesData {
  launches: LaunchResultProps[];
};
interface LaunchesVars {
  limit?: number;
}

function App() {
  const { loading, error, data } = useQuery<LaunchesData, LaunchesVars>(
    getLaunchesQuery,
    {
      variables: {
        limit: 10
      }
    }
  );

  if (error) return <p>Ups.. Something went wrong :(</p>;

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
