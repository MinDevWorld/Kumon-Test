import React, { useCallback } from "react";
import './ClickItem.css';

const ClickItem = ({item, clickEvent, onAudioPlaying}) => {
    const style = {
        left: `${600 + item.x - item.width/2}px`,
        top: `${1000 - item.y - item.height/2}px`,
        width: `${item.width}px`,
        height: `${item.height}px`,
    }

    const updateState = useCallback(() => {
        if(clickEvent.eventType === "None") return;
        else if(clickEvent.eventType === "SoundPlay"){
            onAudioPlaying(clickEvent.linkGuid, true);
        }
    });

    return (
    <div className="click-item" 
        style={style} 
        onClick={ () => {
            updateState();
        }}
    />
    )
}

export default ClickItem