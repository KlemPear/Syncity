import React from "react";
import UserSearchForm from "./UserSearchForm";
import { searchUser } from "../../actions";
import { connect } from "react-redux";

class UserSearch extends React.Component {
	onSubmit = (formValues) => {
		this.props.searchUser(formValues);
	};

	onAddSearchedUser = () => {
		this.props.onAddSearchedUser();
	};

	render() {
		return (
			<div>
				<h5>Search for an email address</h5>
				<UserSearchForm onSubmit={this.onSubmit} />
				<div>
					{this.props.searchedUser != null
						? `${this.props.searchedUser?.firstName} ${this.props.searchedUser?.lastName} - ${this.props.searchedUser?.email}`
						: "There are no user with this email address in our database. Try another email!"}
				</div>
				<button
					className="ui green button"
					onClick={() => this.onAddSearchedUser()}
				>
					Add connection
				</button>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		searchedUser: state.auth.searchedUser ?? null,
	};
};

export default connect(mapStateToProps, { searchUser })(UserSearch);
