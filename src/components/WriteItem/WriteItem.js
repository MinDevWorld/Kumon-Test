import React from "react";
import './WriteItem.css';

const WriteItem = ({item}) => {
    const style = {
        left: `${600 + item.x - item.width/2}px`,
        top: `${1000 - item.y - item.height/2}px`,
        width: `${item.width}px`,
        height: `${item.height}px`,
    }

    return (
    <div className="write-item" style={style} />
    )
}

export default WriteItem