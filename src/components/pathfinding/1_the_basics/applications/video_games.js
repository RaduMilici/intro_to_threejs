import React from 'react';
import 'react-tabs/style/react-tabs.css';

const Applications = () => {
  return (
      <div style={{width: '1200px'}}>
        <ul>
          <li>Global revenue for video games estimated at about $83.6 billion in 2014 alone.</li>
          <li>In that same year, the film industry made $36.4 billion and the music industry made $15.06 billion.</li>
          <li>The most advanced uses for pathfinding due to more and more complex simulations.</li>
          <li>Players often no longer directly control characters but instead rely on a pathing algorithm for navigation. </li>
        </ul>
        <div style={{'text-align': 'center'}}>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/PIZZn3OZBdY?mute=1&autoplay=1&loop=1&&list=PL-UjmF2Ru6iW6XrUofzRu5qEWkZe_xLe-"
                  frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/KISOgpB2tjw?mute=1&autoplay=1&loop=1&&list=PL-UjmF2Ru6iVUI2JP5p9jr1f0bJbwTqfv"
                  frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
        </div>
      </div>
  );
};

export default Applications;
