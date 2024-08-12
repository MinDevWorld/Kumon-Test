// src/components/ScenarioPlayer/ScenarioPlayer.js
import { useState, useEffect, useCallback } from 'react';
// import AudioPlayer from '../AudioPlayer/AudioPlayer';

const ScenarioPlayer = ({ scenario, onItemVisibilityChange, onScenarioEnd }) => {
  const [currentTime, setCurrentTime] = useState(0);

  const updateItemVisibility = useCallback(() => {
    if (!scenario || !onItemVisibilityChange) return;

    scenario.timeline.forEach((timeline) => {
      if (timeline.type === 'FocusOnOff' || timeline.type === 'WriteOnOff') {
        const lastKeyframe = timeline.keyframes
          .filter((kf) => kf.time <= currentTime)
          .pop();
        if (lastKeyframe) {
          onItemVisibilityChange(timeline.guid, lastKeyframe.value);
        }
      } else if (timeline.type === 'SoundPlay'){

      }
    });
  }, [currentTime, scenario, onItemVisibilityChange]);

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(prevTime => prevTime + 0.1);
    };

    const timer = setInterval(updateTime, 100);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    updateItemVisibility();
  }, [currentTime, updateItemVisibility]);

  return null;
};


export default ScenarioPlayer;

