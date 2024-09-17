// feature-module/common/JoyrideWrapper.tsx
import React, { useEffect, useState } from 'react';
import Joyride, { STATUS } from 'react-joyride';
import { useJoyride } from './JoyrideContext';
import { useDropdown } from './DropdownContext';
import { useLocation } from 'react-router-dom';
import { all_routes } from '../router/all_routes';

function JoyrideWrapper() {
  const { run, steps, stepIndex, setStepIndex, stopTour, startTour  } = useJoyride(); 
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  
  useEffect(() => {
    const handleMenuStatusOpen = () => {
      setIsMenuOpen(true); // Menu is open
    };
  
    const handleMenuStatusClose = () => {
      setIsMenuOpen(false); // Menu is closed
    };
  
    // Add event listeners for menu open/close
    document.addEventListener('menuOpen', handleMenuStatusOpen);
    document.addEventListener('menuClose', handleMenuStatusClose);
  
    return () => {
      // Clean up event listeners
      document.removeEventListener('menuOpen', handleMenuStatusOpen);
      document.removeEventListener('menuClose', handleMenuStatusClose);
    };
  }, [setIsMenuOpen]);

  useEffect(() => {
    const handleAuthChange = () => {
      const authToken = localStorage.getItem('authToken');
      
      if (authToken !== null) {
        startTour();
      } else {
        stopTour();
      }
    };

    if (location.pathname === all_routes.settings) {
      if (steps[stepIndex]?.target === '.user-joyride-step' || steps[stepIndex]?.target === '.burger-menu' || steps[stepIndex]?.target === '.mobile-user-joyride-step' ) {
        console.log('Skipping to the next step');
        const docIndex = steps.findIndex(step => step.target === '.doc-button');
        if (docIndex !== -1) {
          setStepIndex(docIndex);
        }
      }
    }

    if (location.pathname === all_routes.security) {
      if (steps[stepIndex]?.target === '.user-joyride-step' || steps[stepIndex]?.target === '.burger-menu' || steps[stepIndex]?.target === '.mobile-user-joyride-step' || steps[stepIndex]?.target === '.doc-button') {
        console.log('Skipping to dl-verif directly');
        const dlVerifIndex = steps.findIndex(step => step.target === '.dl-verif');
        if (dlVerifIndex !== -1) {
          setStepIndex(dlVerifIndex);
        }
      }
    }
    // Monitor changes to authToken in localStorage
    window.addEventListener('storage', handleAuthChange);

    return () => {
      window.removeEventListener('storage', handleAuthChange);
    };

    
  }, [location.pathname, stepIndex, steps, startTour]);

  

  const handleJoyrideCallback = (data: any) => {
    const { status, index, action, type } = data;
  
    if (type === 'step:after' && status === 'running') {

      if (steps[index]?.target === '.burger-menu' && !isMenuOpen) {
        console.log('Menu is not open. Staying on the current step.');
        return; // Do not proceed to the next step
      }
      if (!isMenuOpen && (steps[index]?.target === '.mobile-login' || steps[index]?.target === '.mobile-signup')) {
        console.log('Menu closed. Skipping step.');
        setStepIndex(index + 1); // Move to the next step
        return;
      }
        // Update the step index based on the action
        if (index === steps.length - 1) {
          console.log('Last step reached');
          localStorage.setItem("tourCompleted", "true");
          stopTour();
        
        } else if (action === 'next' && index < steps.length - 1) {
          setStepIndex(index + 1);
        } else if (action === 'prev' && index > 0) {
          setStepIndex(index - 1);
        }
      }
  
    
      if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
        localStorage.setItem("tourCompleted", "true");
        stopTour();
      }
  };
  

  return (
    <Joyride
      steps={steps}
      stepIndex={stepIndex}
      run={run}
      continuous
      scrollToFirstStep
      showProgress
      showSkipButton
      callback={handleJoyrideCallback}
      styles={{
        options: {
            arrowColor: '#fff', // Color for the arrow
            backgroundColor: '#fff', // Background color of the tooltip
            primaryColor: '#007bff', // Primary color (can be used for buttons or links)
            textColor: '#000', // Text color for the tooltip
            beaconSize: 36, // Size of the beacon
            overlayColor: 'rgba(0, 0, 0, 0.7)', 
            zIndex: 10000,
  
          },
          tooltip: {
            maxWidth: '70vw', 
            wordBreak: 'break-word' 
          },
          spotlight: {
            padding: 10, // Padding around the spotlighted element
          }
      }}
    />
  );
}

export default JoyrideWrapper;
