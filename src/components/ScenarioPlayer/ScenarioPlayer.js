// src/components/ScenarioPlayer/ScenarioPlayer.js
import { useState, useEffect, useCallback } from 'react';

const ScenarioPlayer = ({ scenario, onItemVisibilityChange }) => {
  const [currentTime, setCurrentTime] = useState(0);

  const updateItemVisibility = useCallback(() => {
    scenario.timeline.forEach((timeline) => {
      if (timeline.type === 'FocusOnOff') {
        const lastKeyframe = timeline.keyframes
          .filter((kf) => kf.time <= currentTime)
          .pop();
        if (lastKeyframe) {
          onItemVisibilityChange(timeline.guid, lastKeyframe.value);
        }
      }
    });
  }, [currentTime, scenario, onItemVisibilityChange]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime((prevTime) => prevTime + 0.1);
    }, 100);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    updateItemVisibility();
  }, [updateItemVisibility]);

  return null;
};

export default ScenarioPlayer;