import React from "react";
import './WriteItem.css';

const WriteItem = ({ position, enterEvent, finishEvent, onAudioPlaying, onScenarioPlay }) => {
    const style = {
        left: `${600 + position.x - position.width / 2}px`,
        top: `${1000 - position.y - position.height / 2}px`,
        width: `${position.width}px`,
        height: `${position.height}px`,
    };

    const handleEvent = (event) => {
        if (event.eventType === "ScenarioPlay") {
            onScenarioPlay(event.linkGuid);
        } else if (event.eventType === "SoundPlay") {
            onAudioPlaying(event.linkGuid, true);
        }
    };

    return (
        <div
            className="write-item"
            style={style}
            onMouseUp={() => handleEvent(finishEvent)}
            onMouseDown={() => handleEvent(enterEvent)}
        />
    );
};

export default WriteItem;