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
		if (!isFlipped) fetchDetails();
		setIsFlipped((prev) => !prev);
	};

	return (
		<div className="card-container">
			<div
				className={`card ${isFlipped ? "flipped" : ""}`}
				onClick={handleFlip}
			>
				{/* Front Side */}
				<div className="card-front">
					<h2>{name}</h2>
				</div>

				{/* Back Side */}
				<div className="card-back">
					{loading ? (
						<p>Loading...</p>
					) : details ? (
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
						<p>Click to load details</p>
					)}
				</div>
			</div>
		</div>
	);
}

export default StarshipCard;
