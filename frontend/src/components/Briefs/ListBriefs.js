import React from "react";
import { connect } from "react-redux";
import { fetchBriefs } from "../../actions";
import { Link } from "react-router-dom";
import Loader from "../Loader";
import BriefCard from "./BriefCard";

class ListBriefs extends React.Component {
	componentDidMount() {
		this.props.fetchBriefs();
	}

	render() {
		if (!this.props.briefs) {
			return (
				<div>
					<Loader />
				</div>
			);
		} else {
			return (
				<>
					<div>
						<Link className="ui blue button" to={`/create-brief`}>
							Create Brief
						</Link>
					</div>
					<div class="ui hidden divider"></div>
					<div className="ui cards">
						{this.props.briefs.map((brief) => (
							<BriefCard key={brief._id} brief={brief} />
						))}
					</div>
				</>
			);
		}
	}
}

const mapStateToProps = (state) => {
	return {
		userId: state.auth.user._id,
		briefs: Object.values(state.briefs),
	};
};

export default connect(mapStateToProps, { fetchBriefs })(ListBriefs);
