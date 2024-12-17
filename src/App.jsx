import React, { useState, useEffect } from "react";
import { getAllStarships } from "./services/sw-api"; // Import the API service
import StarshipCard from "./components/StarshipCard.jsx"; // Import the reusable StarshipCard component
import "./App.css"; // Import styles for the app

function App() {
	// State to hold the array of starships
	const [starships, setStarships] = useState([]);

	/*
   useEffect Hook:
   - Runs the getAllStarships() function when the component first mounts.
   - Updates the `starships` state with the fetched data.
  */
	useEffect(() => {
		getAllStarships()
			.then((data) => {
				console.log("Fetched Starships:", data); // Debugging: log the fetched data
				setStarships(data); // Update the starships state
			})
			.catch((error) => console.error("Error fetching starships:", error)); // Handle errors
	}, []); // Empty dependency array means this runs only once, on mount

	return (
		<div className="app-container">
			{/* App Header */}
			<h1>Star Wars Starships</h1>

			{/* Container for Starship Cards */}
			<div className="starships-container">
				{/* Map over the starships array to render a StarshipCard for each item */}
				{starships.map((ship, index) => (
					<StarshipCard
						key={index} // Add a unique key for each card
						name={ship.name} // Pass the starship name as a prop
						model={ship.model} // Pass the starship model as a prop (optional)
					/>
				))}
			</div>
		</div>
	);
}

export default App;
