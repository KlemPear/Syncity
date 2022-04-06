import React from "react";
import { connect } from "react-redux";
import { fetchBriefs } from "../../actions";
import { Link } from "react-router-dom";
import Loader from "../Loader";
import BriefCard from "./BriefCard";

class ListBriefs extends React.Component {
	constructor(props) {
		super(props);
		//this.state = { openBriefsToggle: false };
	}

	componentDidMount() {
		this.props.fetchBriefs({ open: true });
	}

	onYourBriefsClick = () => {
		this.props.fetchBriefs({ author: this.props.userId });
		//this.setState({ openBriefsToggle: false });
	};

	onAllBriefsClick = () => {
		this.props.fetchBriefs({ open: true });
		//this.setState({ openBriefsToggle: false });
	};

	// onOpenBriefsClick = () => {
	// 	this.props.fetchBriefs({ open: true });
	// 	this.setState({ openBriefsToggle: true });
	// };

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
							All Briefs
						</button>
						<button
							className="ui classic button"
							onClick={() => this.onYourBriefsClick()}
						>
							Your Briefs
						</button>
						{/* <button
							className="ui classic button"
							onClick={() => this.onOpenBriefsClick()}
						>
							Open Briefs
						</button> */}
					</div>
					<div className="ui hidden divider"></div>
					<div className="ui cards">
						{this.props.briefs.map(
							(brief) => (
								//this.state.openBriefsToggle &&
								//brief.author === this.props.userId ? null : (
								<BriefCard key={brief._id} brief={brief} />
							)
							//)
						)}
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
