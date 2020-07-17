import React from 'react';
import '../MoverCard.css';

const MoverCard = (props) => {
  const backgroundCol = (props.mover.direction === 'up') ? 'lime' : 'tomato';
  return (
    <div style={{
      height: '10%',
      backgroundColor: backgroundCol,
      margin: '3px',
      borderRadius: '10px'
    }}>
      <p>{props.mover.symbol}</p>
      <p>{props.mover.description}</p>
      <p>{props.mover.last}</p>
    </div>
  );
}

const cardStyle = {
}
export default MoverCard;
