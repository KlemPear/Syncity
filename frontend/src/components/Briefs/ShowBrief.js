import React from "react";
import { connect } from "react-redux";
import { fetchBrief } from "../../actions";
import history from "../../util/history";
import Loader from "../Loader";
import { moneyFormatter, dateFormatter } from "../../util/textFormatHelper";
import BriefApplication from "./BriefApplication";

class ShowBrief extends React.Component {
	componentDidMount = () => {
		this.props.fetchBrief(history.location.pathname.split("/")[2]);
	};

	render() {
		if (!this.props.brief) {
			return (
				<div>
					<Loader />
				</div>
			);
		} else {
			const { brief } = this.props;
			return (
				<>
					<div>
						<h1>this is a page to show brief and apply</h1>
						<h3>{brief.title}</h3>
						<div>
							{`Budget: ${moneyFormatter.format(brief.budget)}`} -
							{`Due date: ${dateFormatter(brief.dueDate)}`}
						</div>
						<p>{brief.description}</p>
					</div>
					<hr />
					<BriefApplication briefId={this.props.brief._id}/>
				</>
			);
		}
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		userId: state.auth.user._id,
		brief: state.briefs
			? state.briefs[history.location.pathname.split("/")[2]]
			: null,
	};
};

export default connect(mapStateToProps, { fetchBrief })(ShowBrief);
