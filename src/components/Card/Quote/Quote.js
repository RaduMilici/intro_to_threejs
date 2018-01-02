import React from 'react';

const Quote = ({text, author, width}) => {
  return (
      <div style={{'color': 'darkgray', 'maxWidth': `${width || 800}px`}}>
        <q style={{'fontStyle': 'italic'}}>{text}</q>
        <br/>
        <p style={{'float': 'right', 'margin': '0'}}>{author}</p>
      </div>
  );
};

export default Quote;
