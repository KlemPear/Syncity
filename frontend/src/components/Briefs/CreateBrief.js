import React from "react";
import { connect } from "react-redux";
import CreateBriefForm from "./CreateBriefForm";
import { createBrief, burnBriefToken } from "../../actions";
import Modal from "../Modal";
import { Link } from "react-router-dom";

//mui
import { Button, Typography, Stack } from "@mui/material";

class CreateBrief extends React.Component {
	constructor(props) {
		super(props);
		this.state = { notEnoughTokens: false };
	}
	onSubmit = (formValues) => {
		this.props.burnBriefToken(this.props.userId);
		this.props.createBrief({ ...formValues, author: `${this.props.userId}` });
	};

	onNotEnoughTokens = () => {
		this.setState({ notEnoughTokens: true });
	};

	renderModalContent() {
		return (
			<Typography>
				You do not have enough brief tokens to do this. Consider subscribing to
				a different plan!
			</Typography>
		);
	}

	renderModalActions() {
		return (
			<React.Fragment>
				<Button component={Link} to="/buy-tokens" variant="contained" color="secondary">
					Subscribe to a plan
				</Button>
			</React.Fragment>
		);
	}

	render() {
		return (
			<Stack spacing={2} sx={{display: "flex", justifyContent: "space-evenly", alignItems: "center", flexDirection: "column"}}>
				<Typography variant="h3">Create New Brief</Typography>
				<CreateBriefForm
					onSubmit={this.onSubmit}
					onNotEnoughTokens={this.onNotEnoughTokens}
				/>
				{this.state.notEnoughTokens ? (
					<Modal
						showModal={this.state.notEnoughTokens}
						title={"Not Enough Tokens"}
						content={this.renderModalContent()}
						actions={this.renderModalActions()}
						onDismiss={() => this.setState({ notEnoughTokens: false })}
					/>
				) : null}
			</Stack>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		userId: state.auth.user._id,
	};
};

export default connect(mapStateToProps, { createBrief, burnBriefToken })(
	CreateBrief
);
