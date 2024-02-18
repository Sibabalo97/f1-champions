import React, { useState, useEffect } from 'react';
import './ChampionsList.css'; // Import the CSS file
import Animation from '../Amination/Animation - 1708215912209.json';
import LoadingAnimation from '../Amination/LoadingAnim.json'; // Import the loading animation
import Lottie from 'lottie-react';

const ChampionsList = ({ champions, onSelectYear }) => {
    const [selectedYear, setSelectedYear] = useState('');
    const [isLoading, setIsLoading] = useState(true); // Initial loading state
    const currentYear = new Date().getFullYear();
    const years = [];

    // Generate years from 2005 till the current year
    for (let year = currentYear; year >= 2005; year--) {
        years.push(year);
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false); // Set loading state to false after 4 seconds
        }, 4000); // Change delay to 4000 milliseconds (4 seconds)

        // Clear the timeout on unmount to avoid memory leaks
        return () => clearTimeout(timer);
    }, []);

    const handleYearChange = (event) => {
        const year = event.target.value;
        setSelectedYear(year);
        setIsLoading(true); // Set loading state to true when changing year
        onSelectYear(year);
    };

    return (
        <div>
            <nav className="navbar">
                <ul className="navbar-list">
                    <li className="navbar-item"><a href="#home">Home</a></li>
                    <li className="navbar-item"><a href="#about">About Us</a></li>
                    <li className="navbar-item"><a href="#contact">Contact Us</a></li>
                </ul>
            </nav>
            <div className="container">
                <h1 className="heading">Formula 1 World Champions</h1>
                <div className="select-container">
                    <label htmlFor="year" className="select-label">Select Year:</label>
                    <select id="year" className="select-year" value={selectedYear} onChange={handleYearChange}>
                        <option value="">Select Year</option>
                        {years.map((year, index) => (
                            <option key={index} value={year}>{year}</option>
                        ))}
                    </select>
                </div>
                {selectedYear && <p className="selected-year">Selected Year: {selectedYear}</p>}
                {/* Conditional rendering based on loading state */}
                {isLoading ? (
                    <div className="loading-animation-container">
                        <Lottie animationData={LoadingAnimation} />
                    </div>
                ) : (
                    <div className="animation-container">
                        <Lottie animationData={Animation} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default ChampionsList;
