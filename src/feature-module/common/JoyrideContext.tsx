// feature-module/common/JoyrideContext.tsx
import React, { createContext, useContext, useState, useMemo } from 'react';
import { Step } from 'react-joyride';
import { useMount } from 'react-use';
import useIsMobile from './useIsMobile';

interface JoyrideContextType {
  run: boolean;
  stepIndex: number;
  steps: Step[];
  startTour: () => void;
  stopTour: () => void;
  setStepIndex: (index: any) => void;
  setRun: (run: boolean) => void;
}

const JoyrideContext = createContext<JoyrideContextType | undefined>(undefined);

export const JoyrideProvider = ({ children }: { children: React.ReactNode }) => {
  const [run, setRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [steps, setSteps] = useState<Step[]>([]);
  const isMobile = useIsMobile();

  const initializeSteps = (isAuthenticated: boolean) => {

    const mobileSteps: Step[] = [
      {
        target: '.burger-menu',
        content: 'Click here to open menu.',
        disableBeacon: true,
      },
      {
        target: '.mobile-signup',
        content: ' Click here to create an account',
        disableBeacon: true,
      },
      {
        target: '.mobile-login',
        content: 'If you are already a user then Signin here.',
        disableBeacon: true,
      },
      {
        target: '.mobile-user-joyride-step',
        content: 'Click on the user then go to Profile to upload the documents.',
        disableBeacon: true,
      },
      {
        target: '.doc-button',
        content: ' Click on the documents.',
        disableBeacon: true,
      },
      {
        target: '.dl-verif',
        content: 'Click on Upload icon to upload your DL File.',
        disableBeacon: true,
      },
      {
        target: '.aadhaar-verif',
        content: 'Click on Upload icon to upload your Aadhaar File.',
        disableBeacon: true,
      },
      {
        target: '.profile-verif',
        content: 'Click on Upload icon to upload your Profile Picture.',
        disableBeacon: true,
      },
    ];

    const desktopSteps: Step[] = [
      {
        target: '.header-reg',
        content: 'Click here to create an account',
        disableBeacon: true,
      },
      {
        target: '.header-login',
        content: 'If you already have an account then you can Sign in here.',
        disableBeacon: true,
      },
      {
        target: '.user-joyride-step',
        content: 'Click on the user then go to Profile to upload your documents.',
        disableBeacon: true,
      },
      {
        target: '.doc-button',
        content: 'Click on the documents.',
        disableBeacon: true,
      },
      {
        target: '.dl-verif',
        content: 'Click on Upload icon to upload your DL File.',
        disableBeacon: true,
      },
      {
        target: '.aadhaar-verif',
        content: 'Click on Upload icon to upload your Aadhaar File.',
        disableBeacon: true,
      },
      {
        target: '.profile-verif',
        content: 'Click on Upload icon to upload your Profile Picture.',
        disableBeacon: true,
      },
    ];

    const currentSteps = isMobile ? mobileSteps : desktopSteps;

    // If the user is logged in, remove steps 0 and 1
    if (isAuthenticated) {
      if (isMobile) {
        setSteps([currentSteps[0], ...currentSteps.slice(3)]); 
      } else {
        setSteps(currentSteps.slice(2));
      }
    } else {
      setSteps(currentSteps); 
    }
  };

  useMount(() => {
    const authToken = localStorage.getItem('authToken');
    initializeSteps(authToken !== null);
  });
  

  const startTour = () => {
    const authToken = localStorage.getItem('authToken');

    // Adjust the steps dynamically and start the tour
    if (authToken !== null) {
      initializeSteps(true);  
      setStepIndex(0);  // Start at the first relevant step for logged-in users (step 2)
    } else {
      initializeSteps(false); // User is not logged in
      setStepIndex(0);  // Start at step 0
    }

    setRun(true);
  };

  const stopTour = () => {
    setRun(false);  // This stops the Joyride tour
    setStepIndex(0);  // Optionally reset the step index to the first step
  };

  const value = useMemo(() => ({
    run,
    stepIndex,
    steps,
    startTour,
    stopTour,
    setStepIndex,
    setRun,
  }), [run, stepIndex, steps]);

 return (
    <JoyrideContext.Provider value={value}>
      {children}
    </JoyrideContext.Provider>
  );
};

export const useJoyride = () => {
  const context = useContext(JoyrideContext);
  if (!context) {
    throw new Error('useJoyride must be used within a JoyrideProvider');
  }
  return context;
};
