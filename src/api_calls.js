import axios from "axios"

export const getLocations = async (query) => {
	try {
		const response = await axios.get(`/api/location/search/?query=${query}`)
		return response.data
	}
	catch{
		throw Error("Something went wrong while fetching locations")
	}
}

export const getWeather = async (id) => {
	try {
		const response = await axios.get(`/api/location/${id}/`)  //! taking away that trailing slash causes a CORS
		return response.data
	}
	catch{
		throw Error("Something went wrong while fetching weather")
	}
}
