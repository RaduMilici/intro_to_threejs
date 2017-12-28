import React, { Component } from 'react';
import AceEditor from 'react-ace';
import * as THREE from 'three';
import './CodeView.css'
import 'brace/mode/javascript';
import 'brace/theme/github';

class CodeView extends Component {
  constructor({ code, width = 500, onChange, beforeChange, onClick }) {
    super();
    this.state = { code, width, onChange, beforeChange, onClick };
  }

  componentDidMount() {
    this.onChange(this.state.code);
  }

  onChange = code => {
    try {
      const func = new Function('THREE', code);
      this.props.beforeChange();
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
          <div onClick={this.state.onClick} className='code-view'></div>
        </div>
    );
  }
}


CodeView.defaultProps = {
  code: '',
  width: 500,
  onChange: () => {},
  beforeChange: () => {},
  onClick: () => {},
};

export default CodeView;
