// services/ergastService.js

export const fetchWorldChampions = async () => {
    try {
        const response = await fetch('http://ergast.com/api/f1/driverstandings/1.json?limit=1000');
        const data = await response.json();
        return data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    } catch (error) {
        throw new Error('Failed to fetch world champions data');
    }
}

export const fetchWinnersForYear = async (year) => {
    try {
        const response = await fetch(`http://ergast.com/api/f1/${year}/results/1.json`);
        const data = await response.json();
        return data.MRData.RaceTable.Races;
    } catch (error) {
        throw new Error(`Failed to fetch winners for year ${year}`);
    }
}
