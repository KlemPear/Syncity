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
		if (
			this.props.user.briefTokens !== -1 &&
			this.props.user.briefTokens - 1 < 0
		) {
			this.props.onNotEnoughTokens();
		} else {
			//do whatever we need with the form values
			//send to a server, call an api etc...
			this.props.onSubmit(this.props.formValues);
		}
	};

	renderFormFields = () => {
		const editBrief = this.props.editBrief;
		if (editBrief) {
			return (
				<>
					<Field
						name="title"
						component={this.renderInput}
						label="Title"
						defaultValue={editBrief.title}
						value={editBrief.title}
						placeholder={editBrief.title}
					/>
					<Field
						name="private"
						component={this.renderInput}
						type="checkbox"
						label="Make this brief only visible to your connections?"
					/>
					<Field
						name="dueDate"
						component={this.renderInput}
						type="date"
						label="Due Date"
						defaultValue={editBrief.budget}
						value={editBrief.budget}
						placeholder={editBrief.dueDate}
					/>
					<Field
						name="numberOfApplicationsWanted"
						component={this.renderInput}
						type="number"
						label="Number of applications wanted:"
						defaultValue={editBrief.numberOfApplicationsWanted}
						value={editBrief.numberOfApplicationsWanted}
						placeholder={editBrief.numberOfApplicationsWanted}
					/>
					<Field
						name="logo"
						component={this.renderInput}
						label="Logo"
						defaultValue={editBrief.budget}
						value={editBrief.budget}
						placeholder={editBrief.logo}
					/>
					<Field
						name="description"
						component={this.renderTextInput}
						label="description"
						defaultValue={editBrief.budget}
						value={editBrief.budget}
						placeholder={editBrief.description}
					/>
					<hr />
					<h5>License Terms</h5>
					<Field
						name="media"
						component={this.renderInput}
						label="Media"
						defaultValue={editBrief.media}
						value={editBrief.media}
						placeholder={editBrief.media}
					/>
					<Field
						name="use"
						component={this.renderInput}
						label="Use"
						defaultValue={editBrief.use}
						value={editBrief.use}
						placeholder={editBrief.use}
					/>
					<Field
						name="budget"
						component={this.renderInput}
						type="number"
						label="Budget"
						defaultValue={editBrief.budget}
						value={editBrief.budget}
						placeholder={editBrief.budget}
					/>
					<Field
						name="licenseDuration"
						component={this.renderInput}
						label="License Duration"
						defaultValue={editBrief.licenseDuration}
						value={editBrief.licenseDuration}
						placeholder={editBrief.licenseDuration}
					/>
					<Field
						name="extractDuration"
						component={this.renderInput}
						label="Extract Duration"
						defaultValue={editBrief.extractDuration}
						value={editBrief.extractDuration}
						placeholder={editBrief.extractDuration}
					/>
					<Field
						name="territory"
						component={this.renderInput}
						label="Territory"
						defaultValue={editBrief.territory}
						value={editBrief.territory}
						placeholder={editBrief.territory}
					/>
					<hr />
					<h5>Type Of Music Needed</h5>
					<Field
						name="genres"
						component={this.renderInput}
						label="Genre(s)"
						defaultValue={editBrief.genres}
						value={editBrief.genres}
						placeholder={editBrief.genres}
					/>
					<Field
						name="vocals"
						component={this.renderInput}
						label="Vocals"
						defaultValue={editBrief.vocals}
						value={editBrief.vocals}
						placeholder={editBrief.vocals}
					/>
					<Field
						name="moods"
						component={this.renderInput}
						label="Mood(s)"
						defaultValue={editBrief.moods}
						value={editBrief.moods}
						placeholder={editBrief.moods}
					/>
					<Field
						name="instruments"
						component={this.renderInput}
						label="Instrument(s)"
						defaultValue={editBrief.instruments}
						value={editBrief.instruments}
						placeholder={editBrief.instruments}
					/>
					<Field
						name="tempo"
						component={this.renderInput}
						label="Tempo"
						defaultValue={editBrief.tempo}
						value={editBrief.tempo}
						placeholder={editBrief.tempo}
					/>
					<Field
						name="exclusivity"
						component={this.renderInput}
						label="Exclusivity"
						defaultValue={editBrief.exclusivity}
						value={editBrief.exclusivity}
						placeholder={editBrief.exclusivity}
					/>
					<hr />
					<h5>Reference(s)</h5>
					<Field
						name="references[0].link"
						component={this.renderInput}
						label="Link #1"
						defaultValue={editBrief.references != null ? editBrief.references[0]?.link : null}
						value={editBrief.references != null ? editBrief.references[0]?.link : null}
						placeholder={editBrief.references != null ? editBrief.references[0]?.link : null}
					/>
					<Field
						name="references[0].comment"
						component={this.renderTextInput}
						label="Comment #1"
						defaultValue={editBrief.references != null ? editBrief.references[0]?.comment : null}
						value={editBrief.references != null ? editBrief.references[0]?.comment : null}
						placeholder={editBrief.references != null ? editBrief.references[0]?.comment : null}
					/>
					<Field
						name="references[1].link"
						component={this.renderInput}
						label="Link #2"
						defaultValue={editBrief.references != null ? editBrief.references[1]?.link : null}
						value={editBrief.references != null ? editBrief.references[1]?.link : null}
						placeholder={editBrief.references != null ? editBrief.references[1]?.link : null}
					/>
					<Field
						name="references[1].comment"
						component={this.renderTextInput}
						label="Comment #2"
						defaultValue={editBrief.references != null ? editBrief.references[1]?.comment : null}
						value={editBrief.references != null ? editBrief.references[1]?.comment : null}
						placeholder={editBrief.references != null ? editBrief.references[1]?.comment : null}
					/>
					<Field
						name="references[2].link"
						component={this.renderInput}
						label="Link #3"
						defaultValue={editBrief.references != null ? editBrief.references[2]?.link : null}
						value={editBrief.references != null ? editBrief.references[2]?.link : null}
						placeholder={editBrief.references != null ? editBrief.references[2]?.link : null}
					/>
					<Field
						name="references[2].comment"
						component={this.renderTextInput}
						label="Comment #3"
						defaultValue={editBrief.references != null ? editBrief.references[2]?.comment : null}
						value={editBrief.references != null ? editBrief.references[2]?.comment : null}
						placeholder={editBrief.references != null ? editBrief.references[2]?.comment : null}
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
					<hr />
					<h5>License Terms</h5>
					<Field name="media" component={this.renderInput} label="Media" />
					<Field name="use" component={this.renderInput} label="Use" />
					<Field
						name="budget"
						component={this.renderInput}
						type="number"
						label="Budget"
					/>
					<Field
						name="licenseDuration"
						component={this.renderInput}
						label="License Duration"
					/>
					<Field
						name="extractDuration"
						component={this.renderInput}
						label="Extract Duration"
					/>
					<Field
						name="territory"
						component={this.renderInput}
						label="Territory"
					/>
					<hr />
					<h5>Type Of Music Needed</h5>
					<Field name="genres" component={this.renderInput} label="Genre(s)" />
					<Field name="vocals" component={this.renderInput} label="Vocals" />
					<Field name="moods" component={this.renderInput} label="Mood(s)" />
					<Field
						name="instruments"
						component={this.renderInput}
						label="Instrument(s)"
					/>
					<Field name="tempo" component={this.renderInput} label="Tempo" />
					<Field
						name="exclusivity"
						component={this.renderInput}
						label="Exclusivity"
					/>
					<hr />
					<h5>Reference(s)</h5>
					<Field
						name="references[0].link"
						component={this.renderInput}
						label="Link #1"
					/>
					<Field
						name="references[0].comment"
						component={this.renderTextInput}
						label="Comment #1"
					/>
					<Field
						name="references[1].link"
						component={this.renderInput}
						label="Link #2"
					/>
					<Field
						name="references[1].comment"
						component={this.renderTextInput}
						label="Comment #2"
					/>
					<Field
						name="references[2].link"
						component={this.renderInput}
						label="Link #3"
					/>
					<Field
						name="references[2].comment"
						component={this.renderTextInput}
						label="Comment #3"
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
					<button className="ui button primary">Submit</button>
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
