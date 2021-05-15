import React, {useState, useEffect} from "react"
import {useParams, useHistory,Link} from "react-router-dom"
import {getWeather} from "./api_calls"

const WeatherView = ({setFilterQuery, setLocations, setIsLoading, setNotification}) => {
  /*rendered when a page is selected */

  const {id} = useParams() //page id is url param
  const history = useHistory()
  const [weather, setWeather] = useState(null)
  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

  useEffect( () => {   //on first render only, get weather info
    const updateWeather = async () => {
      try {  //set spinning animation, make api call, stop animation
        setIsLoading(true)
        setWeather(await getWeather(id))
        setIsLoading(false)
			} 
			catch {
        setIsLoading(false)
        setNotification({message: "Something went wrong. Most probably a server error.", color: "red"}) //Reykjavik consistently errors 500
        setTimeout(() => {  //show notification for 3 sec, then redirect back
          setNotification({message: "", color: ""})
          history.push("/")
        }, 3000)
      }
    }
    updateWeather()
    }, [] // eslint-disable-line react-hooks/exhaustive-deps
  )

  return (
    <div className="WeatherView">
      <div className="weather__header">
        <Link  /*go to main page and reset state*/
					to="/"
					style={{marginRight: "20px"}}
          onClick={() => { 
            setFilterQuery("")
            setLocations([])
          }}>
          <img src="Media/left-arrow.svg" alt="go back" className="clickableIcon" />
        </Link>
        <h1>{weather && weather.title}</h1>
      </div>
      <div className="dayRow">
        {weather &&
          weather.consolidated_weather.map((day, i) => { //render each day's info
            const dayNum = new Date(day.applicable_date).getDay()
            const nameOfDay = weekDays[dayNum]

            return (
              <div className="dayCard" key={i}> {/*card for each day*/}
                  <h3 style={{borderBottom: "1px solid gray"}}>{nameOfDay}</h3>
                <div className="imageContainer">
                  <img
                    className="card__image"
                    alt={`${day.weather_state_name}`}
                    src={`https://www.metaweather.com/static/img/weather/${day.weather_state_abbr}.svg`} /*hotlink to weather icon from api*/
                  />
                </div>
                <div className="card__attribute">
                  <img className="attribute__image small" src="Media/celsius.svg" alt="current temperature" />
                  <h3 className="attribute__value">{`${day.the_temp.toFixed(2)}°C`}</h3>
                </div>
                <div className="card__attribute">
                  <img className="attribute__image small humidity" src="Media/humidity.svg" alt="humidity" />
                  <h3 className="attribute__value">{`${day.humidity}%`}</h3>
                </div>
                <div className="card__attribute">
                  <img className="attribute__image large" src="Media/hot.svg" alt="highest temperature" />
                  <h3 className="attribute__value">{`${day.max_temp.toFixed(2)}°C`}</h3>
                </div>
                <div className="card__attribute">
                  <img className="attribute__image large" src="Media/cold.svg" alt="lowest temperature" />
                  <h3 className="attribute__value">{`${day.min_temp.toFixed(2)}°C`}</h3>
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default WeatherView