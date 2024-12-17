import React, { useState } from "react";
import "./StarshipCard.css";

function StarshipCard({ name, url }) {
	// State for additional starship details
	const [details, setDetails] = useState(null);
	const [loading, setLoading] = useState(false);

	// Function to fetch starship details when clicked
	const fetchDetails = () => {
		setLoading(true); // Set loading state to true
		fetch(url) // Fetch details from the provided URL
			.then((response) => response.json())
			.then((data) => {
				setDetails(data); // Update state with fetched details
				setLoading(false); // Turn off loading state
			})
			.catch((error) => {
				console.error("Error fetching starship details:", error);
				setLoading(false); // Turn off loading state in case of error
			});
	};

	return (
		<div className="card" onClick={fetchDetails}>
			<h2>{name}</h2>
			{/* Display loading message while fetching */}
			{loading && <p>Loading...</p>}

			{/* Display additional details once fetched */}
			{details && (
				<div>
					<p>Model: {details.model}</p>
					<p>Crew: {details.crew}</p>
					<p>Passengers: {details.passengers}</p>
				</div>
			)}
		</div>
	);
}

export default StarshipCard;
