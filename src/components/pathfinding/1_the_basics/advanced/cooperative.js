import React from 'react';
import 'react-tabs/style/react-tabs.css';

const Applications = () => {
  return (
      <div>
        <ul>
          <li>Navigators may share pathfinding data between themselves, dramatically cutting down on processing.</li>
          <li>Makes good use of multithreading / webworkers.</li>
        </ul>

        <div style={{'text-align': 'center'}}>
          <iframe width="800" height="450" src="https://www.youtube.com/embed/yZod-MpyAhE?start=136&mute=1&autoplay=1&loop=1&&list=PL-UjmF2Ru6iVtPAPZ-5M032EwZrd8rv2B"
                  frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
        </div>
      </div>
  );
};

export default Applications;
