import React, {useState, useEffect} from "react"
import {useParams, useHistory} from "react-router-dom"

import {getWeather} from "./api_calls"

const WeatherView = ({region,setFilterQuery, setIsLoading,setNotification}) => {
	/*Shown when a page is clicked - page id will be url param */

	const {id} = useParams()
	const [weather, setWeather] = useState(null)
	const history = useHistory()
	const weekDays=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]

	const updateWeather=async()=>{
		try{ //set spinning animation, set weather, stop animation
			setIsLoading(true)
			setWeather(await getWeather(id))
			setIsLoading(false)
		}
		catch{ 
			setIsLoading(false)
			setNotification({message: "Something went wrong. Most probably a server error.", color: "red"}) //Reykjavik consistently errors out
			setTimeout(() => { //show notification for 3 sec, then redirect back
				setNotification({message: ""})
				history.push("/")
			}, 3000)
		}
	}

	useEffect(() => { //on render, get weather info
		updateWeather()
	}, [])

	{console.log(weather)}

	return (
		<div className="WeatherView">
			<div style={{marginBottom:"20px",alignItems:"center",display:"flex",justifyContent:"center",width:"100%"}}>
				<img src="Media/left-arrow.svg" style={{height:"20px"}} className="clickableIcon" onClick={()=>{history.push("/");setFilterQuery("")}}/>
				
				<h1>{region && region.title}</h1> {/*TODO if refresh, state can't be provided*/}
			</div>
			<div className="dayRow">
				{weather && weather.map((day, i) => {
					const dayNum=new Date(day.applicable_date).getDay()
					const nameOfDay=weekDays[dayNum]

					return (
					<div className="dayCard" key={i}> {/*card for info of each day*/}
						<div className="card__attribute">
							<h3>{nameOfDay}</h3>
							</div>
						<div className="imageContainer">
							<img className="card__image" src={`https://www.metaweather.com/static/img/weather/${day.weather_state_abbr}.svg`} />
						</div>
						<div className="card__attribute">
						<img src="Media/humidity.svg" style={{marginLeft:"7px",height:"22px"}}/>
							<h3 className="attribute__value">{`${day.humidity}%`}</h3>
						</div>
						<div className="card__attribute">
						<img src="Media/hot.svg" style={{height:"28px"}}/>
							<h3  className="attribute__value" >{`${day.max_temp.toFixed(2)}°C`}</h3>
						</div>
						<div className="card__attribute">
						<img src="Media/cold.svg" style={{height:"28px"}}/>
							<h3 className="attribute__value">{`${day.min_temp.toFixed(2)}°C`}</h3>
						</div>
					</div>
				)}
				)}
			</div>
		</div>
	)

}

export default WeatherView