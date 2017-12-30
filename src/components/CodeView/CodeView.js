import React, { Component } from 'react';
import AceEditor from 'react-ace';
import * as THREE from 'three';
import './CodeView.css'
import 'brace/mode/javascript';
import 'brace/theme/github';

class CodeView extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.onChange(this.props.code);
  }

  execute(code) {
    const argNames = ['THREE', ...Object.keys(this.props.args)];
    const argValues = [THREE, ...Object.values(this.props.args)];
    const func = new Function(...argNames, code);
    return func.bind(this)(...argValues);
  }

  onChange = (code, { callOnChange = true, callBeforeChange = true } = {}) => {
    try {
      if (callBeforeChange) this.props.beforeChange();
      const returnValue = this.execute(code);
      if (callOnChange) this.props.onChange(returnValue, code);
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
              fontSize={this.props.fontSize}
              width={`${this.props.width}px`}
              height={`${this.props.height}px`}
              onChange={this.onChange}
              value={this.props.code}
              readOnly={this.props.readOnly}
              editorProps={{$blockScrolling: true}}
          />
          <div onClick={this.props.onClick} className='code-view'></div>
        </div>
    );
  }
}


CodeView.defaultProps = {
  code: '',
  width: 500,
  height: 500,
  readOnly: false,
  args: {},
  fontSize: 12,
  onChange: () => {},
  beforeChange: () => {},
  onClick: () => {},
};

export default CodeView;
