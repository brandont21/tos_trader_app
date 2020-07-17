import React, { useState } from 'react';
import { VictoryLine, VictoryChart, VictoryTheme, VictoryZoomContainer }  from 'victory';

const Card = (props) => {

  return (
    <div>
      <VictoryChart style={{parent: { width: '330px' } }} padding={{ top: 20, bottom: 25, left: 50, right: 0 }} theme={VictoryTheme.material} containerComponent={
        <VictoryZoomContainer zoomDimension="x" />
      }>
        <VictoryLine style={{ data: { stroke: "lime" } }} data={props.data} y="open" />

      </VictoryChart>
    </div>

  )
}

export default Card;
