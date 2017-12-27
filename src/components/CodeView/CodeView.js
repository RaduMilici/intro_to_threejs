import React, { Component } from 'react';
import AceEditor from 'react-ace';
import * as THREE from 'three';
import './CodeView.css'

class CodeView extends Component {
  constructor({ code, width = 500, onChange = () => {} }) {
    super();
    this.state = { code, width, onChange };
  }

  componentDidMount() {
    this.onChange(this.state.code);
  }

  onChange = code => {
    try {
      const func = new Function('THREE', code);
      const returnValue = func.bind(this)(THREE);
      this.props.onChange(returnValue);
    }
    catch (e) {
      if (e instanceof SyntaxError) {
        console.error(e);
      }
    }
  }

  render() {
    return (
        <div>
          <AceEditor
              className='ace-editor'
              mode='javascript'
              theme='github'
              width={`${this.state.width}px`}
              onChange={this.onChange}
              value={this.state.code}
              editorProps={{$blockScrolling: true}}
          />
          <div className='code-view'></div>
        </div>
    );
  }
}

export default CodeView;
