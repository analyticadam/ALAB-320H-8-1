import React, { useState, useEffect } from "react";
import { getAllStarships } from "./services/sw-api";
import StarshipCard from "./components/StarshipCard.jsx";
import "./App.css";

function App() {
	const [starships, setStarships] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [nextUrl, setNextUrl] = useState(null);

	// Function to fetch starships
	const fetchStarships = (url = "https://swapi.py4e.com/api/starships/") => {
		setLoading(true);
		getAllStarships(url)
			.then((data) => {
				setStarships((prev) => [...prev, ...data.results]); // Append new starships
				setNextUrl(data.next); // Store the next page URL
				setLoading(false);
			})
			.catch((error) => {
				console.error("Error fetching starships:", error);
				setError("Failed to load starships. Please try again later.");
				setLoading(false);
			});
	};

	// Initial fetch when the component mounts
	useEffect(() => {
		fetchStarships();
	}, []);

	return (
		<div className="app-container">
			<h1>Star Wars Starships</h1>

			{/* Error Message */}
			{error && <p className="error">{error}</p>}

			{/* Starship Cards */}
			<div className="starships-container">
				{starships.map((ship, index) => (
					<StarshipCard
						key={index} // Unique key for each card
						name={ship.name} // Starship name
						url={ship.url} // API URL for additional details
					/>
				))}
			</div>

			{/* Loading Indicator */}
			{loading && <p>Loading...</p>}

			{/* Load More Button */}
			{nextUrl && !loading && (
				<button className="load-more" onClick={() => fetchStarships(nextUrl)}>
					Load More Starships
				</button>
			)}
		</div>
	);
}

export default App;
