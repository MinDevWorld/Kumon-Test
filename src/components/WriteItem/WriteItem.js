import React from "react";
import './WriteItem.css';

const WriteItem = ({position, enterEvent, finishEvent}) => {
    const style = {
        left: `${600 + position.x - position.width/2}px`,
        top: `${1000 - position.y - position.height/2}px`,
        width: `${position.width}px`,
        height: `${position.height}px`,
    }

    const mouseupHandler = () => {
        if(finishEvent.eventType !== "None"){
            console.log("mouseup");
        }else{
            return
        }
        
    };

    const mousedownHandler = () => {
        if(enterEvent.eventType !== "None"){
            console.log("mousedown")
            
        }else{
            return
        }
        
    }

    
    return (
    <div 
        className="write-item" 
        style={style}
        onMouseUp={mouseupHandler}
        onMouseDown={mousedownHandler}
    />
    )
};

export default WriteItem