import React from "react";
import { connect } from "react-redux";
import { fetchBriefs, fetchPrivateBriefs } from "../../actions";
import { Link } from "react-router-dom";
import Loader from "../Loader";
import BriefCard from "./BriefCard";

class ListBriefs extends React.Component {

	componentDidMount() {
		this.props.fetchBriefs({ open: true, private: false });
	}

	onYourBriefsClick = () => {
		this.props.fetchBriefs({ author: this.props.userId });
	};

	onAllBriefsClick = () => {
		this.props.fetchBriefs({ open: true, private: false });
	};

	onPrivateBriefsClick = () => {
		this.props.fetchPrivateBriefs(this.props.userId);
	};

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
						<div className="ui hidden divider"></div>
						<div className="ui hidden divider"></div>
						<div className="ui hidden divider"></div>
						<Link className="ui blue button" to={`/create-brief`}>
							Create Brief
						</Link>
						<button
							className="ui classic button"
							onClick={() => this.onAllBriefsClick()}
						>
							All Public Briefs
						</button>
						<button
							className="ui classic button"
							onClick={() => this.onPrivateBriefsClick()}
						>
							Private Briefs
						</button>
						<button
							className="ui classic button"
							onClick={() => this.onYourBriefsClick()}
						>
							Your Briefs
						</button>
					</div>
					<div className="ui hidden divider"></div>
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

export default connect(mapStateToProps, { fetchBriefs, fetchPrivateBriefs })(
	ListBriefs
);
