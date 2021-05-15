import React from "react"

const Notification = ({message, color}) => message

		? <div style={{backgroundColor: color}} className="Notification">
				<h2 className="Notification__text">{message}</h2>
			</div>

		: null //no notification to be set

export default Notification
