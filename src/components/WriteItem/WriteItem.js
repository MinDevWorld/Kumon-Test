import React from "react";
import './WriteItem.css';

const WriteItem = ({position}) => {
    const style = {
        left: `${600 + position.x - position.width/2}px`,
        top: `${1000 - position.y - position.height/2}px`,
        width: `${position.width}px`,
        height: `${position.height}px`,
    }

    return (
    <div className="write-item" style={style} />
    )
};

export default WriteItem