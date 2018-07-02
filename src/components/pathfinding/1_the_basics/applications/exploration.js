import React from 'react';
import 'react-tabs/style/react-tabs.css';
import maps from '../../../../img/maps.gif';
import railroad from '../../../../img/railroad.gif';

const Applications = () => {
  return (
      <div style={{width: '1200px'}}>
        <ul>
          <li>Google Maps provides a route planner, allowing users to find available directions through driving, public transportation, walking, or biking.</li>
          <li>Railroad companies use such algorithms to find the optimal route from thousands of train stations. </li>
        </ul>
        <img width='600px' height='400' src={maps}/>
        <img width='600px' height='400' src={railroad}/>
      </div>
  );
};

export default Applications;
