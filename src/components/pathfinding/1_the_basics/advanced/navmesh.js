import React from 'react';
import 'react-tabs/style/react-tabs.css';
import navmesh_generation from '../../../../img/navmesh_generation.gif';
import navmesh from '../../../../img/navmesh.gif';

const Applications = () => {
  return (
      <div>
        <ul>
          <li>A modern take on classic grid-like implementations, generated directly from scene geometry.</li>
          <li>Any triangle with a slope angle under a determined amount is considered <i>walkable</i>.</li>
          <li>Elevation is also taken into account.</li>
          <li>Nodes are still used, extracted from each triangle's centroid.</li>
          <li>Can be generated dynamically, allowing for terrain modification.</li>
        </ul>
        <img width='600px' height='400' src={navmesh_generation}/>
        <img width='600px' height='400' src={navmesh}/>
      </div>
  );
};

export default Applications;
