import React, { useState } from "react";
import "./StarshipCard.css";

function StarshipCard({ name, url }) {
	const [isFlipped, setIsFlipped] = useState(false); // Flip state
	const [details, setDetails] = useState(null); // Holds starship details
	const [loading, setLoading] = useState(false); // Loading state

	// Fetch details when flipping for the first time
	const fetchDetails = () => {
		if (details || loading) return;
		setLoading(true);
		fetch(url)
			.then((res) => res.json())
			.then((data) => {
				setDetails(data);
				setLoading(false);
			})
			.catch((err) => {
				console.error("Error fetching details:", err);
				setLoading(false);
			});
	};

	// Toggle flip and fetch details if needed
	const handleFlip = () => {
		console.log("Card clicked"); // Debugging log
		if (!isFlipped) fetchDetails();
		setIsFlipped((prev) => !prev);
	};

	/* Adjusted JSX structure to enhance click responsiveness */
	return (
		<div className="card-container" onClick={handleFlip}>
			{/* Main card element that flips based on state */}
			<div className={`card ${isFlipped ? "flipped" : ""}`}>
				{/* Front side of the card with title */}
				<div className="card-front">
					<h2>{name}</h2>
				</div>

				{/* Back side of the card with additional details */}
				<div className="card-back">
					{loading ? (
						<p>
							Loading...
						</p> /* Show loading message if details are being fetched */
					) : details ? (
						/* Display starship details if available */
						<>
							<p>
								<strong>Model:</strong> {details.model}
							</p>
							<p>
								<strong>Crew:</strong> {details.crew}
							</p>
							<p>
								<strong>Passengers:</strong> {details.passengers}
							</p>
						</>
					) : (
						<p>
							Click to load details
						</p> /* Prompt user to click to fetch details */
					)}
				</div>
			</div>
		</div>
	);
}

export default StarshipCard;
