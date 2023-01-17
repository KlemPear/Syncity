import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

//mui
import { TextField, Button, Box, Stack } from "@mui/material";

class TrackCommentForm extends Component {
	renderInput = ({
		input,
		label,
		type,
		meta: { touched, error },
		...custom
	}) => {
		return (
			<>
				<TextField
					sx={{ minWidth: 300 }}
					fullWidth
					label={label}
					error={Boolean(touched && error)}
					helperText={Boolean(touched && error) ? error : null}
					type={type}
					{...input}
					{...custom}
				/>
			</>
		);
	};

	renderFormFields() {
		return (
			<>
				<Field
					name="trackComment"
					component={this.renderInput}
					label="Leave a comment for your track here..."
				/>
			</>
		);
	}

	onSubmit = (formValues) => {
		//do whatever we need with the form values
		//send to a server, call an api etc...
		const trackId = this.props.trackId;
		const comment = {
			text: formValues.trackComment,
			trackId: trackId,
		};
		this.props.onSubmit(comment);
	};

	render() {
		return (
			<Box>
				<form onSubmit={this.props.handleSubmit(this.onSubmit)}>
					<Stack direction="row" spacing={1}>
						{this.renderFormFields()}
						<Button type="submit" variant="contained" color="secondary">
							Submit
						</Button>
					</Stack>
				</form>
			</Box>
		);
	}
}

const validate = (values) => {
	const errors = {};
	const requiredFields = [];
	requiredFields.forEach((field) => {
		if (!values[field]) {
			errors[field] = "Required";
		}
	});
	return errors;
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(
	reduxForm({
		form: "TrackCommentForm",
		enableReinitialize: true,
		validate: validate,
	})(TrackCommentForm)
);
