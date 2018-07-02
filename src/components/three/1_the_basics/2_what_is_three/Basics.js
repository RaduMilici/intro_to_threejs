import React, { Component } from 'react';
import SceneView from '../../../SceneView/SceneView';
import Card from '../../../Card/Card';
import Quote from '../../../Card/Quote/Quote';

class Basics extends Component {
  render() {
    return (
        <div>
          <SceneView/>
          <Card>
            <h2>1. The basics of 3D rendering</h2>
            <Quote
                width='1000'
                text='If you wish to make an apple pie from scratch, you must first create the universe.'
                author='Carl Edward Sagan - astronomer, astrophysicist and astrobiologist'
            />
          </Card>
        </div>
    );
  }
}

export default Basics;
