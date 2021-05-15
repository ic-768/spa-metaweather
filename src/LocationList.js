import {Link} from "react-router-dom"
import React from "react"

const LocationList = ({locations}) =>  //takes list of locations and renders links to view their weather
	<div className="LocationList">
		{locations.map((location, i) =>
			<Link key={location.woeid} to={`/${location.woeid}`} className="locationLink"> {/*push to /:id */}
				<div className="LocationCard" key={`${location.title}${i}`} >
					<h1>
						{location.title}
					</h1>
				</div>
			</Link>
		)}
	</div>



export default LocationList