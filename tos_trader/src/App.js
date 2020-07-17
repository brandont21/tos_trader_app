import React, { useState, useEffect }  from 'react';
import './App.css';
import DataFetcher from './components/DataFetcher'
import Header from './components/Header';
import Footer from './components/Footer';
import PreviousSearches from './components/PreviousSearches'

function App() {
  const [searched, setSearched] = useState([]);

  return (
    <div className="App">
      <Header />
      <DataFetcher state={{searched, setSearched}}/>
      <PreviousSearches state={{searched, setSearched}}/>
      <Footer />
    </div>
  );
}

export default App;
