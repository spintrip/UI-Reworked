// src/components/JoyrideComponent.js
import React from 'react';
import Joyride from 'react-joyride';
import PropTypes from 'prop-types';

const JoyrideComponent = ({ steps, run, continuous, callback }) => {
    console.log("JoyrideComponent props:", { steps, run, continuous });
  return (
    <Joyride
      steps={steps}
      run={run}
      continuous={continuous}
      callback={callback}
      styles={{
        options: {
          zIndex: 10000, 
        },
      }}
      
    />
  );
};
JoyrideComponent.propTypes = {
    steps: PropTypes.arrayOf(
      PropTypes.shape({
        target: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
      })
    ).isRequired,
    run: PropTypes.bool.isRequired,
    continuous: PropTypes.bool,
    callback: PropTypes.func,
  };
  
 
  JoyrideComponent.defaultProps = {
    continuous: true,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    callback: () => {},
  };

export default JoyrideComponent;
