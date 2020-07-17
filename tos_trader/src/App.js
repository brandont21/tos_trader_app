import React, { useState, useEffect }  from 'react';
import './App.css';
import DataFetcher from './components/DataFetcher'
import Header from './components/Header';
import Footer from './components/Footer';
import PreviousSearches from './components/PreviousSearches'
import Movers from './components/Movers'

function App() {
  const [searched, setSearched] = useState([]);

  return (
    <div className="App">
      <Header />
      <DataFetcher state={{searched, setSearched}}/>
      <div className="left">
        <PreviousSearches state={{searched, setSearched}}/>
      </div>
      <div className="right">
        <Movers />
      </div>
      <Footer />
    </div>
  );
}

export default App;
