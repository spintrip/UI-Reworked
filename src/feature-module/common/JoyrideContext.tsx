// JoyrideContext.tsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import Joyride, { ACTIONS, CallBackProps, EVENTS, ORIGIN, STATUS } from 'react-joyride';
import { JoyrideProviderProps } from './interface';

interface JoyrideContextProps {
  steps: any[];
  run: boolean;
  setSteps: (steps: any[]) => void;
  startTour: () => void;
  stopTour: () => void;
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
}

const JoyrideContext = createContext<JoyrideContextProps | undefined>(undefined);

export const useJoyride = () => {
  const context = useContext(JoyrideContext);
  if (!context) {
    throw new Error("useJoyride must be used within a JoyrideProvider");
  }
  return context;
};

export const JoyrideProvider:React.FC<JoyrideProviderProps> = ({ children })  => {
  const [steps, setSteps] = useState<any[]>([]);
  const [run, setRun] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number>(() => {
    return Number(localStorage.getItem('joyride-current-index')) || 0;
  });
  const startTour = () => setRun(true);
  const stopTour = () => setRun(false);

  const handleJoyrideCallback = (data: CallBackProps) => {
     const { action, index, status, type } = data;

     if (type === EVENTS.STEP_AFTER || type === EVENTS.TARGET_NOT_FOUND) {
        // Update state to advance the tour
        setCurrentIndex(index + (action === ACTIONS.PREV ? -1 : 1));
      } else if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
        // Stop the tour if finished or skipped
        setRun(false);
      }

      localStorage.setItem('joyride-current-index', String(index));

      console.groupCollapsed(type);
      console.log(data);
      console.groupEnd();
    };

    useEffect(() => {
        const storedSteps = localStorage.getItem('joyride-steps');
        if (storedSteps) {
          setSteps(JSON.parse(storedSteps));
        }
      }, []);

  return (
    <JoyrideContext.Provider value={{ steps, run, setSteps, startTour, stopTour, currentIndex, setCurrentIndex }}>
      {children}
      <Joyride
        steps={steps}
        run={run}
        continuous
        showProgress
        showSkipButton
        scrollToFirstStep
        callback={handleJoyrideCallback}
        stepIndex={currentIndex}
        styles={{
          options: {
            zIndex: 10000,
          },
        }}
      />
    </JoyrideContext.Provider>
  );
};
