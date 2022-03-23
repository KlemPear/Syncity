import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

class BriefApplicationForm extends React.Component {
	renderError({ error, touched }) {
		if (touched && error) {
			return (
				<div className="ui error message">
					<div className="header">{error}</div>
				</div>
			);
		}
	}

	renderInput = ({ input, label, meta, type, placeholder, value }) => {
		const className = `field ${meta.error && meta.touched ? "error" : ""}`;
		return (
			<div className={className}>
				<label>{label}</label>
				<input
					type={type}
					{...input}
					autoComplete="off"
					placeholder={placeholder}
					value={value}
				/>
				{this.renderError(meta)}
			</div>
		);
	};

	renderTextInput = ({ input, label, meta, placeholder, value }) => {
		const className = `field ${meta.error && meta.touched ? "error" : ""}`;
		return (
			<div className={className}>
				<label>{label}</label>
				<textarea
					{...input}
					autoComplete="off"
					placeholder={placeholder}
					value={value}
				/>
				{this.renderError(meta)}
			</div>
		);
	};

	onSubmit = (formValues) => {
		if (this.props.user.tokens - 1 < 0) {
			return console.log("not enough tokens to do this");
		} else {
			//do whatever we need with the form values
			//send to a server, call an api etc...
			this.props.onSubmit(formValues);
		}
	};

	renderFormFields = () => {
		return (
			<>
				<Field name="title" component={this.renderInput} label="Song Title" />
				<Field name="link" component={this.renderInput} label="Link" />
				<Field
					name="masterContact"
					component={this.renderInput}
					label="Master Owner email"
				/>
				<Field
					name="publisherContact"
					component={this.renderInput}
					label="Publisher email"
				/>
				<Field
					name="artistContact"
					component={this.renderInput}
					label="Artist email"
				/>
			</>
		);
	};

	render() {
		return (
			<div>
				<form
					onSubmit={this.props.handleSubmit(this.onSubmit)}
					className="ui form error"
				>
					{this.renderFormFields()}
					<button className="ui button primary">
						Submit for 1 <i className="gem fitted circular inverted outline icon" />
					</button>
				</form>
			</div>
		);
	}
}

const validate = (formValues) => {
	const errors = {};
	if (!formValues.title) {
		errors.name = "You must enter a title";
	}
	if (!formValues.budget) {
		errors.name = "You must enter a budget";
	}
	if (!formValues.dueDate) {
		errors.name = "You must enter a date";
	}
	if (!formValues.description) {
		errors.description = "You must enter a description";
	}
	return errors;
};

const mapStateToProps = (state, ownProps) => {
	return {
		user: state.auth?.user,
	};
};

export default connect(
	mapStateToProps,
	{}
)(
	reduxForm({
		form: "BriefApplicationForm", // a unique identifier for this form
		enableReinitialize: true,
		validate: validate,
	})(BriefApplicationForm)
);
