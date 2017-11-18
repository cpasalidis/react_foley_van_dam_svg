import React, { Component } from 'react';

class MySimpleStaticClock extends Component {

    render() {
        return (
            <svg width="100" height="100">
            <ellipse cx="30" cy="30" rx="20" ry="20" style={{fill:'lightgray'}} />
            <ellipse cx="30" cy="12" rx="1" ry="1" style={{fill:'blue'}} />
            <polygon points="28,30 32,30 30,48" style={{fill:'blue'}} />
            <polygon points="28,28 32,32 18,40" style={{fill:'blue'}} />
            <polygon points="28,28 32,32 48,20" style={{fill:'red'}} />
          </svg>
            );
    }
}

export default MySimpleStaticClock;