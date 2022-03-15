import React from "react";

const ShowBrief = ({ brief }) => {
	return (
		<div className="card">
			<div className="content">
				<img
					className="right floated mini ui image"
					alt="logo"
					src={brief.logo}
				/>
				<div className="header">{brief.title}</div>
				<div className="meta">{`Budget: ${brief.budget}`}</div>
				<div className="meta">{`Due Date: ${brief.dueDate}`}</div>
				<div className="description">{brief.description}</div>
			</div>
			<div className="extra content">
				<div className="ui basic green button">Apply</div>
			</div>
		</div>
	);
};

export default ShowBrief;
