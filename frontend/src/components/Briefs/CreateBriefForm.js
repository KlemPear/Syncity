import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

class CreateBriefForm extends React.Component {
	componentDidMount = () => {
		if (this.props.editBrief) {
			this.props.initialize(this.props.editBrief);
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

	onSubmit = () => {
		if (this.props.user.tokens - 10 < 0) {
			this.props.onNotEnoughTokens();
		} else {
			//do whatever we need with the form values
			//send to a server, call an api etc...
			this.props.onSubmit(this.props.formValues);
		}
	};

	renderFormFields = () => {
		if (this.props.editBrief) {
			return (
				<>
					<Field
						name="title"
						component={this.renderInput}
						label="Title"
						defaultValue={this.props.editBrief.title}
						value={this.props.editBrief.title}
						placeholder={this.props.editBrief.title}
					/>
					<Field
						name="private"
						component={this.renderInput}
						type="checkbox"
						label="Make this brief only visible to your connections?"
					/>
					<Field
						name="budget"
						component={this.renderInput}
						type="number"
						label="Budget"
						defaultValue={this.props.editBrief.budget}
						value={this.props.editBrief.budget}
						placeholder={this.props.editBrief.budget}
					/>
					<Field
						name="dueDate"
						component={this.renderInput}
						type="date"
						label="Due Date"
						defaultValue={this.props.editBrief.budget}
						value={this.props.editBrief.budget}
						placeholder={this.props.editBrief.dueDate}
					/>
					<Field
						name="numberOfApplicationsWanted"
						component={this.renderInput}
						type="number"
						label="Number of applications wanted:"
						defaultValue={this.props.editBrief.numberOfApplicationsWanted}
						value={this.props.editBrief.numberOfApplicationsWanted}
						placeholder={this.props.editBrief.numberOfApplicationsWanted}
					/>
					<Field
						name="logo"
						component={this.renderInput}
						label="Logo"
						defaultValue={this.props.editBrief.budget}
						value={this.props.editBrief.budget}
						placeholder={this.props.editBrief.logo}
					/>
					<Field
						name="description"
						component={this.renderTextInput}
						label="description"
						defaultValue={this.props.editBrief.budget}
						value={this.props.editBrief.budget}
						placeholder={this.props.editBrief.description}
					/>
				</>
			);
		} else {
			return (
				<>
					<Field name="title" component={this.renderInput} label="Title" />
					<Field
						name="private"
						component={this.renderInput}
						type="checkbox"
						label="Make this brief only visible to your connections?"
					/>
					<Field
						name="budget"
						component={this.renderInput}
						type="number"
						label="Budget"
					/>
					<Field
						name="dueDate"
						component={this.renderInput}
						type="date"
						label="Due Date"
					/>
					<Field
						name="numberOfApplicationsWanted"
						component={this.renderInput}
						type="number"
						label="Number of applications wanted:"
					/>
					<Field name="logo" component={this.renderInput} label="Logo" />
					<Field
						name="description"
						component={this.renderTextInput}
						label="description"
					/>
				</>
			);
		}
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
						Submit for 10{" "}
						<i className="gem fitted circular inverted outline icon" />
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

const mapStateToProps = (state) => {
	return {
		formValues: state.form?.CreateBriefForm?.values,
		user: state.auth?.user,
	};
};

export default connect(
	mapStateToProps,
	{}
)(
	reduxForm({
		form: "CreateBriefForm", // a unique identifier for this form
		enableReinitialize: true,
		validate: validate,
	})(CreateBriefForm)
);
