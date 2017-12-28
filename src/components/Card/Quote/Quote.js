import React from 'react';

const Quote = ({text, author}) => {
  return (
      <div style={{'color': 'darkgray', 'width': '800px'}}>
        <q style={{'font-style': 'italic'}}>{text}</q>
        <br/>
        <p style={{'float': 'right', 'margin': '0'}}>{author}</p>
      </div>
  );
};

export default Quote;
