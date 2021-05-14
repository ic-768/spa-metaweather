import axios from "axios"

export const getWeather = async (query) => {
	const response = await axios.get(`${query}`)
	return response.data
}