import React from "react";
import './ClickItem.css';

const ClickItem = ({item}) => {
    const style = {
        left: `${600 + item.x - item.width/2}px`,
        top: `${1000 - item.y - item.height/2}px`,
        width: `${item.width}px`,
        height: `${item.height}px`,
    }

    return (
    <div className="click-item" style={style} />
    )
}

export default ClickItem