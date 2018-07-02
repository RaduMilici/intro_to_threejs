import React from 'react';
import SceneView from '../../SceneView/SceneView';
import Card from '../../Card/Card';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Exploration from './applications/exploration'
import Industrial from './applications/industrial'
import VideoGames from './applications/video_games'

const Applications = () => {
  return (
      <div>
        <SceneView/>
        <Card>
          <h2>Applications</h2>
          <Tabs>
            <TabList>
              <Tab>Navigation</Tab>
              <Tab>Industrial</Tab>
              <Tab>Video Games</Tab>
            </TabList>

            <TabPanel>
              <Exploration/>
            </TabPanel>

            <TabPanel>
              <Industrial/>
            </TabPanel>

            <TabPanel>
              <VideoGames/>
            </TabPanel>
          </Tabs>
        </Card>
      </div>
  );
};

export default Applications;
