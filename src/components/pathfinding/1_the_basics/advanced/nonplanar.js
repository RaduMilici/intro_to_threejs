import React from 'react';
import 'react-tabs/style/react-tabs.css';
import petersen from '../../../../img/petersen.gif';

const Applications = () => {
  return (
      <div>
        <ul>
          <li>Using A*, it's possible to navigate on any graph, planar or not.</li>
          <li>Sometimes used in video games and simulations that involve a planet's curvature.</li>
        </ul>
        <img width='400px' height='400' src={petersen}/>
        <iframe width="800" height="400" src="https://www.youtube.com/embed/xMp-vnOR2yk?mute=1&autoplay=1&loop=1&&list=PL-UjmF2Ru6iUvH0kFLVUcW8eK_TIXOhQk"
                frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
      </div>
  );
};

export default Applications;
