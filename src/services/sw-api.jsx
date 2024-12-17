// services/sw-api.js
export async function getAllStarships(
	url = "https://swapi.py4e.com/api/starships/"
) {
	const response = await fetch(url);
	// console.log("API Fetch Complete");
	const data = await response.json();
	// console.log("Fetched Starships", data); // Debugging to confirm API response
	return data;
}
