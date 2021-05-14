import React, {useState, useEffect} from "react"
import {useParams, useHistory} from "react-router-dom"
import {WiHumidity} from "react-icons/wi"
import {FaTemperatureHigh} from "react-icons/fa"
import {FaTemperatureLow} from "react-icons/fa"

import {getWeather} from "./api_calls"

const WeatherView = ({region,setFilterQuery, setIsLoading}) => {
	const {id} = useParams()
	const [weather, setWeather] = useState(null)
	const history = useHistory()
	const weekDays=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]


	console.log(weather)
	const updateWeather=async()=>{
			setIsLoading(true)
			setWeather(await getWeather(id))
			setIsLoading(false)
	}

	useEffect(() => {
		updateWeather()
	}, [id])


	return (
		<div className="WeatherView">
				<h1 style={{alignSelf:"center"}}>{region && region.title}</h1> {/*TODO if refresh, state can't be provided*/}
			<button onClick={() => {history.push("/"); setFilterQuery("")}}>Back</button>
			<div className="dayRow">
				{weather && weather.map((day, i) => {
					const dayNum=new Date(day.applicable_date).getDay()
					const nameOfDay=weekDays[dayNum]

					return (
					<div className="dayCard" key={i}>
						<div className="card__attribute">
							<h3>{nameOfDay}</h3>
							</div>
						<div className="card__attribute">
							<img className="card__image" src={`https://www.metaweather.com/static/img/weather/${day.weather_state_abbr}.svg`} />
						</div>
						<div className="card__attribute"> {/*TODO classname image */}
						<WiHumidity size={"40px"}/>
							<h3>{`${day.humidity}%`}</h3>
						</div>

						<div className="card__attribute">
						<WiHumidity size={"40px"}/>
							<h3>{`${day.humidity}%`}</h3>
						</div>
						<div className="card__attribute">
							<FaTemperatureHigh size={"30px"}/>
							<h3>{day.max_temp.toFixed(2)}</h3>
						</div>
						<div className="card__attribute">
							<FaTemperatureLow size={"30px"}/>
							<h3>{day.min_temp.toFixed(2)}</h3>
						</div>
						<div className="card__attribute">
							<h3>{day.the_temp.toFixed(2)}</h3>
						</div>
						<div className="card__attribute">
							<h3>{day.visibility.toFixed(2)}</h3>
						</div>
					</div>
				)}
				)}
			</div>
		</div>
	)

}

export default WeatherView