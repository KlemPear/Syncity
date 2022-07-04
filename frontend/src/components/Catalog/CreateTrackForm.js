import React from "react";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

class CreateTrackForm extends React.Component {
	componentDidMount = () => {
		if (this.props.editTrack) {
			this.props.initialize(this.props.editTrack);
		}
	};

	renderError({ error, touched }) {
		if (touched && error) {
			return (
				<div className="ui error message">
					<div className="header">{error}</div>
				</div>
			);
		}
	}

	renderInput = ({ input, label, meta, type, value }) => {
		const className = `field ${meta.error && meta.touched ? "error" : ""}`;
		return (
			<div className={className}>
				<label>{label}</label>
				<input
					type={type}
					{...input}
					autoComplete="off"
					placeholder={value}
					value={value}
				/>
				{this.renderError(meta)}
			</div>
		);
	};

	onSubmit = (formValues) => {
		//do whatever we need with the form values
		//send to a server, call an api etc...
		this.props.onSubmit(this.props.formValues);
	};

	render() {
		return (
			<div>
				<form
					onSubmit={this.props.handleSubmit(this.onSubmit)}
					className="ui form error"
				>
					<Field
						name="title"
						component={this.renderInput}
						label="Track Title"
						defaultValue={this.props.editTrack.title}
						value={this.props.editTrack.title}
						placeholder={this.props.editTrack.title}
					/>
					<Field name="artist" component={this.renderInput} label="Artist" />
					<Field
						name="link"
						component={this.renderInput}
						label="Link to media"
					/>
					<Field
						name="masterContact"
						component={this.renderInput}
						label="Master owner email"
						type="email"
					/>
					<Field
						name="publisherContact"
						component={this.renderInput}
						label="Publisher email"
						type="email"
					/>
					<button className="ui button primary">Submit</button>
					<Link className="ui button" to="/catalog">
						Cancel
					</Link>
				</form>
			</div>
		);
	}
}

const validate = (formValues) => {
	const errors = {};
	if (!formValues.title) {
		errors.title = "You must enter a title";
	}
	if (!formValues.artist) {
		errors.artist = "You must enter an artist";
	}
	if (!formValues.link) {
		errors.link = "You must enter a link to this track";
	}
	if (!formValues.masterContact) {
		errors.masterContact =
			"Please provide the email contact of the master owner";
	}
	if (!formValues.publisherContact) {
		errors.masterContact = "Please provider the email contact of the publisher";
	}
	return errors;
};

const mapStateToProps = (state, ownProps) => {
	return {
		formValues: state.form?.CreateTrackForm?.values,
		initialValues: ownProps.editTrack,
		user: state.auth?.user,
	};
};

export default connect(
	mapStateToProps,
	{}
)(
	reduxForm({
		form: "CreateTrackForm",
		enableReinitialize: true,
		validate: validate,
	})(CreateTrackForm)
);
