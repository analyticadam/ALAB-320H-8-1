import React, { useState, useEffect } from "react";
import { getAllStarships } from "./services/sw-api";
import StarshipCard from "./components/StarshipCard.jsx";
import "./App.css";

function App() {
	const [starships, setStarships] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		getAllStarships()
			.then((data) => {
				setStarships(data); // Set starships data
				setLoading(false); // Stop global loading
			})
			.catch((error) => {
				console.error("Error fetching starships:", error);
				setError("Failed to load starships. Please try again later.");
				setLoading(false);
			});
	}, []);

	return (
		<div className="app-container">
			<h1>Star Wars Starships</h1>

			{/* Show global loading */}
			{loading && <p>Loading...</p>}
			{error && <p className="error">{error}</p>}

			{/* Render Starship Cards */}
			<div className="starships-container">
				{starships.map((ship, index) => (
					<StarshipCard
						key={index}
						name={ship.name} // Starship name
						url={ship.url} // Starship URL for fetching details
					/>
				))}
			</div>
		</div>
	);
}

export default App;
