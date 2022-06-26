import React from "react";
import { Link } from "react-router-dom";

const PaymentSucceded = (props) => {
	return (
		<div>
			<div className="ui hidden divider"></div>
			<div className="ui hidden divider"></div>
			<div className="ui hidden divider"></div>
			Thank you! Your payment was successful. You can see your updated token count on your profile page <Link to="/profile">here.</Link>
		</div>
	);
};
export default PaymentSucceded;
