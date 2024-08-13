// src/components/ScenarioPlayer/ScenarioPlayer.js
import { useState, useEffect, useCallback } from 'react';

// const ScenarioPlayer = ({ scenario, onItemVisibilityChange, onAudioPlaying, onScenarioEnd }) => {
//   const [currentTime, setCurrentTime] = useState(0);
//   const updateItemVisibility = useCallback(() => {
//     if (!scenario) return;
//     scenario.timeline.forEach((timeline) => {
//       if (timeline.type === 'FocusOnOff') {
//         const lastKeyframe = timeline.keyframes
//           .filter((kf) => kf.time <= currentTime)
//           .pop();
//         if (lastKeyframe) {
//           onItemVisibilityChange(timeline.guid, lastKeyframe.value);
//         }
//       } 
//     });
//   }, [currentTime, scenario, onItemVisibilityChange]);

//   useEffect(() => {
//     const updateTime = () => {
//       setCurrentTime(prevTime => prevTime + 0.1);
//     };

//     const timer = setInterval(updateTime, 100);
//     return () => clearInterval(timer);
//   }, []);

//   useEffect(() => {
//     updateItemVisibility();
//   }, [currentTime, updateItemVisibility]);
  
//   return null;
// };

const ScenarioPlayer = ({ scenario, onItemVisibilityChange, onAudioPlaying, onScenarioEnd }) => {
 
  const updateItemVisibility = useCallback(() => {
    if (!scenario) return;
    scenario.timeline.forEach((timeline) => {
   
      timeline.keyframes.forEach(keyframe => {
        setTimeout(() => {
          if(timeline.type === 'FinishOn'){
            onScenarioEnd()
          }else if (timeline.type === 'FocusOnOff') {
            onItemVisibilityChange(timeline.guid, keyframe.value);
          } else if (timeline.type === 'SoundPlay'){
            onAudioPlaying(timeline.guid, true);
          }
          
        }, keyframe.time * 1000);
      });

    });
  }, [scenario, onItemVisibilityChange]);

  useEffect(() => {
    updateItemVisibility();
  }, [updateItemVisibility]);
  
  return null;
};


export default ScenarioPlayer;

