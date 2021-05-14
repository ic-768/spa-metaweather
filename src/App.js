import React, {useState, useEffect} from "react"
import {getLocations} from "./api_calls"
import { Route, Link} from "react-router-dom"
import WeatherView from "./WeatherView"
import {PropagateLoader} from "react-spinners"
import './App.css';

function App() {
	const [filterQuery, setFilterQuery] = useState("")
	const [locations, setLocations] = useState([])
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
				<PropagateLoader loading={isLoading} color="white" css="top:30px;position:absolute" />

				<Route path="/:id">
					<WeatherView setFilterQuery={setFilterQuery} region={locations[0]} setIsLoading={setIsLoading} />
				</Route>

				<Route exact path="/">
					<div className="Banner">
						<input className="searchBar" value={filterQuery} placeholder="Search by location" onChange={(e) => {setFilterQuery(e.target.value)}} />
					</div>
					{locations && locations.length > 0 && // many locations
						<div className="LocationList">
							{locations.map((location, i) =>
								<Link key={location.woeid} to={`/${location.woeid}`}>
									<div className="LocationCard" key={`${location.title}${i}`} onClick={() => {setLocations([location])}}>
										<h1 >
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
