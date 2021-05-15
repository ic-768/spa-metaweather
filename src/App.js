import React, {useState, useEffect} from "react"
import { Route, Link} from "react-router-dom"
import {PropagateLoader} from "react-spinners"
import WeatherView from "./WeatherView"
import Notification from "./Notification"
import {getLocations} from "./api_calls"
import './App.css';

function App() {
	const [filterQuery, setFilterQuery] = useState("")
	const [notification, setNotification] = useState({message:"",color:""}) //shown if api call goes wrong
	const [locations, setLocations] = useState([]) //list of locations received from api
	const [isLoading, setIsLoading] = useState(false) //to show spinning animation during api call
	const backgroundImage = "Media/city.jpg"

	useEffect(() => {
		(async () => { //filtering function
			filterQuery && setLocations(await getLocations(filterQuery))
		})()
	}, [filterQuery])

	return (
		<div className="App" style={{backgroundImage: `url(${backgroundImage})`}} >
			<div className="pageContainer">
				
				{/*If set, show notification or spinning animation */}
				{notification.message && Notification({message:notification.message, color:notification.color})}
				<PropagateLoader loading={isLoading} color="white" css="top:30px;position:absolute" />

				<Route path="/:id">
					<WeatherView setFilterQuery={setFilterQuery} region={locations[0]} setLocations={setLocations}setIsLoading={setIsLoading} setNotification={setNotification} />
				</Route>

				<Route exact path="/">
					<div className="Banner">

<div className="searchBar">
	<img className="searchImage" src="Media/search.svg"/>
						<input className="searchBar__input" type="text" value={filterQuery} placeholder="Search location..." 
							onChange={(e) => {setFilterQuery(e.target.value)}} />
</div>
					</div>
					{locations && locations.length > 0 && // many locations
						<div className="LocationList">
							{locations.map((location, i) =>
								<Link key={location.woeid} to={`/${location.woeid}`} className="locationLink">
									<div className="LocationCard" key={`${location.title}${i}`} onClick={() => {setLocations([location])}}>
										<h1 style={{textDecoration:"none"}}>
											{location.title}
										</h1>
									</div>
								</Link>
							)}
						</div>
					}
				</Route>
			</div>
		</div>
	);
}

export default App;
