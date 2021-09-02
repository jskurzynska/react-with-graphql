import React, { useState } from 'react';
import './MissionsTable.css';
import Missions, { LaunchResultProps } from './Missions';
import orderby from 'lodash/orderBy';

interface LaunchesResultData {
  launches: LaunchResultProps[];
};

type OrderType = 'desc' | 'asc';
function MissionsTable(props: LaunchesResultData) {
  const [dateSort, setDateSort] = useState<OrderType>('desc');
  const [nameSort, setNameSort] = useState<OrderType>('desc');
  const [launches, setLaunches] = useState<LaunchResultProps[]>(props.launches);

  const resolveNewOrder = (currentOrder: OrderType) => currentOrder === 'desc' ? 'asc' : 'desc';
  const onDateSort = () => {
    const order = resolveNewOrder(dateSort);
    setLaunches(orderby<LaunchResultProps>(props.launches, o => o.launch_date_utc, order));
    setDateSort(order);
  };

  const onNameSort = () => {
    const order = resolveNewOrder(nameSort);
    setLaunches(orderby<LaunchResultProps>(props.launches, o => o.mission_name, order));
    setNameSort(order);
  };


  return (<>
    <table className="table table-sm table-dark">
      <thead>
        <tr>
          <th scope='col'>Ulubiony</th>
          <th scope='col' className='clickable' onClick={onDateSort}>Data</th>
          <th scope='col' className='clickable' onClick={onNameSort}>Nazwa misji</th>
          <th scope='col'>Opis</th>
        </tr>
      </thead>
      <tbody>
        <Missions content={launches} />
      </tbody>
    </table>
  </>);
}

export default MissionsTable;
