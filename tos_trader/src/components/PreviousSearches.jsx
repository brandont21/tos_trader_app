import React, {useEffect} from 'react';
import '../PreviousSearches.css';

const PreviousSearches = (props) => {
  return (
    <div className="searches_container">
      <div className="list">
        {props.state.searched.map((ticker) => <p key={ticker}>{ticker}</p>)}
      </div>
      <button onClick={()=>props.state.setSearched([])}>Clear Searches</button>
    </div>
  )
}

export default PreviousSearches;
