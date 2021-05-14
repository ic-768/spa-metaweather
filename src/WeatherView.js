import React,{useState, useEffect} from "react"
import {useParams,useHistory} from "react-router-dom"
import {getWeather} from "./api_calls"

const WeatherView=({region})=>{
	const {id}=useParams()
	const history = useHistory()
	const [weather, setWeather]=useState(null)

	useEffect(()=>{
		(async()=>{ //on render, set weather
		setWeather(await getWeather(id)) 
	})()
	},[id])

	console.log(weather)
	if (!region){history.push("/")}

	return(
		<div className="WeatherView">
			<button onClick={()=>{history.push("/")}}>Back</button>
			{region && <h1>{region.title}</h1>}
			{weather && weather.map((day) =>
			<div> 
				<h1>Humidity</h1>{day.humidity}
				<h1>Max-Temp</h1>{day.max_temp}
				<h1>Min-Temp</h1>{day.min_temp}
				<h1>The-Temp</h1>{day.the_temp}
				<h1>Visibility</h1>{day.visibility}
			</div>

			)}
		</div>
	)

}

export default WeatherView