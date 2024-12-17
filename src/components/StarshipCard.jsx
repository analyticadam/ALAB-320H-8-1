import React from "react";
import "./StarshipCard.css"; // Import component-specific CSS

function StarshipCard({ name, model }) {
	return (
		<div className="card">
			<h2>{name}</h2>
			<p>Model: {model}</p>
		</div>
	);
}

export default StarshipCard;
