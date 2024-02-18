import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChampionsList from './components/ChampionsList';
import WinnersList from './components/WinnersList';

const App = () => {
  const [worldChampions, setWorldChampions] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [winners, setWinners] = useState([]);

  useEffect(() => {
    const fetchWorldChampions = async () => {
      try {
        const response = await axios.get('http://ergast.com/api/f1/driverstandings/1.json?limit=20');
        setWorldChampions(response.data.MRData.StandingsTable.StandingsLists.map(list => list.DriverStandings));
      } catch (error) {
        console.error('Error fetching world champions:', error);
      }
    };

    fetchWorldChampions();
  }, []);

  const fetchWinnersForYear = async (year) => {
    try {
      const response = await axios.get(`http://ergast.com/api/f1/${year}/results/1.json`);
      setWinners(response.data.MRData.RaceTable.Races);
      setSelectedYear(year);
    } catch (error) {
      console.error('Error fetching winners for year:', error);
    }
  };

  return (
    <div>
      {!selectedYear && <ChampionsList champions={worldChampions} onSelectYear={fetchWinnersForYear} />}
      {selectedYear && <WinnersList year={selectedYear} winners={winners} worldChampions={worldChampions} />}
    </div>
  );
};

export default App;
