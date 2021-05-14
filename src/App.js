import React,{useState,useEffect} from "react"
import {getLocations} from "./api_calls"
import {Route,Link} from "react-router-dom"
import WeatherView from "./WeatherView"
import './App.css';

function App() {
	const [filterQuery,setFilterQuery]=useState("")
	const [locations,setLocations]=useState([])

	useEffect(()=>{
		(async()=>{ //filtering function
			filterQuery.trim() && setLocations(await getLocations(filterQuery)) 
		})()
	},[filterQuery])

	return (
		<div className="App">
			<div className="Banner">
				<input className="searchBar" placeholder="Search by location" onChange={(e) => {setFilterQuery(e.target.value)}} />
			</div>
			<div className="pageContainer">
				<Route exact path="/">
					{locations && locations.length > 0 && // many locations
						<div className="LocationList">
							{locations.map((location, i) =>
								<Link key={location.woeid} to={`/${location.woeid}`}>
									<h1 className="listItem--selectable" key={`${location.title}${i}`} onClick={() => {setLocations([location])}}>
										{location.title}
									</h1>
								</Link>
							)}
						</div>
					}
				</Route>
				<Route path="/:id">
					<WeatherView region={locations[0]} />
				</Route>
			</div>
		</div>
	);
}

export default App;
