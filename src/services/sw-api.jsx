// services/sw-api.js
export async function getAllStarships() {
	const response = await fetch("https://swapi.py4e.com/api/starships/");
	// console.log("API Fetch Complete");
	const data = await response.json();
	// console.log("Fetched Starships", data); // Debugging to confirm API response
	return data.results;
}
