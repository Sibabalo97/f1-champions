import React from 'react';
import './WinnersList.css'; 

const WinnersList = ({ year, winners, worldChampions }) => {
    return (
        <div className="container">
            <h1 className="heading">Winners of {year}</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Round</th>
                        <th>Race</th>
                        <th>Winner</th>
                        <th>Season</th>
                        <th>Constructor</th>
                    </tr>
                </thead>
                <tbody>
                    {winners.map((race, index) => {
                        const isWorldChampion = worldChampions.some(champion => {
                            return (
                                champion.season === year &&
                                `${champion.Driver.givenName} ${champion.Driver.familyName}` === `${race.Results[0].Driver.givenName} ${race.Results[0].Driver.familyName}`
                            );
                        });

                        return (
                            <tr key={index} className={isWorldChampion ? 'highlight' : ''}>
                                <td>{race.round}</td>
                                <td>{race.raceName}</td>
                                <td>{race.Results[0].Driver.givenName} {race.Results[0].Driver.familyName}</td>
                                <td>{race.season}</td>
                                <td>{race.Results[0].Constructor.name}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default WinnersList;
