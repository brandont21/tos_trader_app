import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../DataFetcher.css';
import Card from './Card';

const DataFetcher = (props) => {
  const [query, setQuery] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [data, setData] = useState({candles:[]});

  // options for each select
  const [pType, setPType] = useState('day');
  const [pNum, setPNum] = useState({ time: [1, 2, 3, 4, 5, 10] });
  const [fType, setFType] = useState({ freq: ['minute'] });
  const [fNum, setFNum] = useState({ fNum: [1, 5, 10, 15, 30] });

  // selected option from each select
  const [sPNum, setSPN] = useState(1);
  const [sFType, setSFT] = useState('minute');
  const [sFNum, setSFN] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const url = 'https://api.tdameritrade.com/v1/marketdata/'+ query +
                '/pricehistory?apikey=TX3FQ0ECV5SJJMLK3DN0GHKYDFNJ8FWN' +
                '&periodType=' + pType + '&period=' + sPNum +
                '&frequencyType=' + sFType + '&frequency=' + sFNum;

    console.log(url);
    axios.get(url)
      .then(res => {
        setData({ candles: res.data.candles });
        setIsLoading(false);
        setHasError(false);
        setHasSearched(true);
        document.getElementById('params').style.visibility = 'visible';
        document.getElementById('data_holder').style.border = 'none';
        if(!props.state.searched.includes(query))
          props.state.setSearched([query, ...props.state.searched]);
      })
      .catch(error => {
        console.log('throwing error');
        setData({ candles: [] });
        setIsLoading(false);
        setHasError(true);
        setHasSearched(true);
      })

  }

  useEffect(() => {
    switch (pType) {
      case 'day':
        setPNum({ time: [1, 2, 3, 4, 5, 10] });
        setFType({ freq: ['minute'] });
        setFNum({ fNum: [1, 5, 10, 15, 30] });
        setSPN(1);
        setSFT('minute');
        setSFN(1);
        break;
      case 'month':
        setPNum({ time: [1, 2, 3, 6] });
        setFType({ freq: ['daily', 'weekly'] });
        setFNum({ fNum: [1] });
        setSPN(1);
        setSFT('daily');
        setSFN(1);
        break;
      case 'year':
        setPNum({ time: [1, 2, 3, 5, 10, 15, 20] });
        setFType({ freq: ['daily', 'weekly', 'monthly'] });
        setFNum({ fNum: [1] });
        setSPN(1);
        setSFT('daily');
        setSFN(1);
        break;
      case 'ytd':
        setPNum({ time: [1] });
        setFType({ freq: ['daily', 'weekly'] });
        setFNum({ fNum: [1] });
        setSPN(1);
        setSFT('daily');
        setSFN(1);
        break;
      default:
        break;
    }
  }, [pType]);

  // const np = pNum.time.map((time) => <option>time</option>);
  const np = pNum.time.map((period) => <option key={period}>{period}</option>);
  const ft = fType.freq.map((type) => <option key={type}>{type}</option>);
  const nf = fNum.fNum.map((freq) => <option key={freq}>{freq}</option>);

  return (
    <>

      <div id="data_holder">
        {!hasSearched ? <p>Input a ticker below to display data in the box</p> :
          isLoading ?
           <h1>Loading</h1> : hasError ?
              <p>error occurred</p> :
              <Card data={data.candles} />
        }
      </div>

      <div id="params">
        <div className="per_type">
          <label>Period Type</label>
          <select onChange={(e) => { setPType(e.target.value) }}>
            <option>day</option>
            <option>month</option>
            <option>year</option>
            <option>ytd</option>
          </select>
        </div>

        <div className="per_num">
          <label>Number of Periods</label>
          <select onChange={(e) => { setSPN(e.target.value) }}>{np}</select>
        </div>

        <div className="freq_type">
          <label>Frequency</label>
          <select onChange={(e) => { setSFT(e.target.value) }}>{ft}</select>
        </div>

        <div className="freq_num">
          <label>Number of Frequency</label>
          <select onChange={(e) => { setSFN(e.target.value) }}>{nf}</select>
        </div>
      </div>

      <form onSubmit={handleSubmit} id="tickerForm">
        <input type="text" placeholder="ticker" onChange={(e) => { setQuery(e.target.value) }}/>
        <input type="submit" />
      </form>
    </>
  );
}

export default DataFetcher;
