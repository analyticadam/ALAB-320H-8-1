import React, { useState, useEffect } from "react";
import { getAllStarships } from "./services/sw-api";
import "./App.css"; // For styling

function App() {
	const [starships, setStarships] = useState([]); // State for starship data

	// Fetch starships when the component mounts
	useEffect(() => {
		getAllStarships()
			.then((data) => {
				console.log("Starships Data in State:", data); // Debugging
				setStarships(data); // Update state with API data
			})
			.catch((error) => console.error("Error fetching data:", error));
	}, []);

	return (
		<div className="app-container">
			<h1>Star Wars Starships</h1>
			<div className="starships-container">
				{starships.map((ship, index) => (
					<div key={index} className="card">
						<h2>{ship.name}</h2>
					</div>
				))}
			</div>
		</div>
	);
}

export default App;
