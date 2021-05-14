import React,{useState,useEffect} from "react"
import {getWeather} from "./api_calls"
import './App.css';

function App() {
	
	const [filterQuery,setFilterQuery]=useState("")

	useEffect(()=>{
		(async()=>{ //
			filterQuery && console.log(await getWeather(`/api/location/search/?query=${filterQuery}`)) //full address is proxied in package.json
		})()

	},[filterQuery])


  return (
    <div className="App">
      <header className="App-header">
        <p>
				Test data
				<input placeholder="Search by location" onChange={(e)=>{setFilterQuery(e.target.value)}}/>
        </p>
      </header>
    </div>
  );
}

export default App;
