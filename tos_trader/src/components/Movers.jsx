import React, {useEffect, useState} from 'react';
import '../Movers.css';
import axios from 'axios';
import MoverCard from './MoverCard';

const Movers = () => {
  const [movers, setMovers] = useState({ symbols: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [market, setMarket] = useState('$COMPX');
  const [dir, setDir] = useState('up');

  useEffect(() => {
    const url = 'https://api.tdameritrade.com/v1/marketdata/' + market +
                '/movers?apikey=TX3FQ0ECV5SJJMLK3DN0GHKYDFNJ8FWN&direction=' +
                dir + '&change=percent';

    axios.get(url)
        .then(res => {
          setMovers({ symbols: res.data });
          setIsLoading(false);
          setHasError(false);
        }).catch(err => {
          setMovers({ symbol: [] });
          setIsLoading(false);
          setHasError(true);
        });
  }, [market, dir])
  return (
    <div className="movers_container">
      <div className="symbols">
        {isLoading ? <p>Loading...</p> :
          hasError ? <p>Error</p> :
            movers.symbols.map((s)=><MoverCard key={s.symbol} mover={s} />)}
      </div>
    </div>
  )
}

export default Movers;
