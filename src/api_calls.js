import axios from "axios"

export const getLocations = async (query) => {
	const response = await axios.get(`/api/location/search/?query=${query}`)
	return response.data
}

export const getWeather = async (id) => {
	const response = await axios.get(`/api/location/${id}/`)  //! taking away that trailing slash causes a CORS
	return response.data.consolidated_weather
}
