import axios from "axios"

export const getLocations = async (query) => {
	const response = await axios.get(`/search/?query=${query}`)
	return response.data
}

export const getWeather = async (id) => {
	const response = await axios.get(`/${id}/`)  //! taking away that trailing slash causes a CORS
	return response.data.consolidated_weather
}