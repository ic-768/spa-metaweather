import React, {useState, useEffect} from "react"
import { Route} from "react-router-dom"
import {PropagateLoader} from "react-spinners"
import {getLocations} from "./api_calls"
import WeatherView from "./WeatherView"
import Notification from "./Notification"
import LocationList from "./LocationList"
import './App.css';

function App() {
	const [filterQuery, setFilterQuery] = useState("")
	const [notification, setNotification] = useState({message:"",color:""}) //shown if api call goes wrong
	const [locations, setLocations] = useState([]) //list of locations received from api
	const [isLoading, setIsLoading] = useState(false) //to show spinning animation during api call
	const backgroundImage = "Media/city.jpg"

	useEffect(() => {
		(async () => {  //self-invoking anon. function for setting state from api call
			filterQuery && setLocations(await getLocations(filterQuery))
		})()
	}, [filterQuery])//filterQuery is search input

	return (
		<div className="App" style={{backgroundImage: `url(${backgroundImage})`}} >
			<div className="pageContainer">

				{/*if notification state is set, render component*/}
				{notification.message && Notification({message: notification.message, color: notification.color})}

				{/*if api call in progress, isLoading will be true and render component*/}
				<PropagateLoader loading={isLoading} color="white" css="top:30px;position:absolute" />  

				<Route exact path="/">
					<div className="Banner">
						<div className="searchBar">
							<img className="searchImage" src="Media/search.svg" alt="" />
							<input className="searchBar__input" type="text" value={filterQuery} placeholder="Search for a location..."
								onChange={(e) => {setFilterQuery(e.target.value)}} /> {/*filter locations (trigger useEffect)*/}
						</div>
					</div>

					{locations && locations.length > 0 && // if locations
					<LocationList locations={locations}/> }
				</Route>

				<Route path="/:id"> {/*a location has been selected*/}
					<WeatherView setFilterQuery={setFilterQuery} setLocations={setLocations} 
						setIsLoading={setIsLoading} setNotification={setNotification} />
				</Route>

			</div>
		</div>
	);
}

export default App;
