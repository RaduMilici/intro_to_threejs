import React, { Component } from 'react';
import SceneView from '../../../SceneView/SceneView';
import Card from '../../../Card/Card';

class Basics extends Component {

  render() {
    return (
        <div>
          <SceneView/>
          <Card>
            <iframe width="560" height="315"
                    src="https://www.youtube.com/embed/Aikd1vPdLgc?rel=0&controls=0&showinfo=0&autoplay=1&mute=1&loop=1&list=PLcCI5Sn9uaT-exCy2Q6gD-LLUtD_ZeU1B"
                    frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
            <iframe width="560" height="315"
                    src="https://www.youtube.com/embed/videoseries?list=PLcCI5Sn9uaT9F6GCpFOzwPpRJAMrUM7qj&autoplay=1&loop=1&controls=0&mute=1"
                    frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
            <br/>
            <iframe width="560" height="315"
                    src="https://www.youtube.com/embed/zAvUJqLxmQY?rel=0&controls=0&showinfo=0&autoplay=1&loop=1&mute=1&list=PLcCI5Sn9uaT-eq6KQN11d9jFPDapAeTAk"
                    frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
            <iframe width="560" height="315"
                    src="https://www.youtube.com/embed/XCkxN6amUj8?rel=0&controls=0&showinfo=0&autoplay=1&mute=1&loop=1&list=PLcCI5Sn9uaT-b1g7T6cYCfZU_H-Vs6zAZ"
                    frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
          </Card>
        </div>
    );
  }
}

export default Basics;
