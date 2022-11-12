import React from "react";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import DropzoneField from "../Inputs/DropzoneField";

//mui
import { TextField, Button, Stack, Box } from "@mui/material";

class CreateTrackForm extends React.Component {
	componentDidMount = () => {
		if (this.props.editTrack) {
			this.props.initialize(this.props.editTrack);
		}
	};

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

	handleOnDrop = (fileUploadId) => {
		console.log("From CreateTrack: ", fileUploadId);
	};

	onSubmit = (formValues) => {
		//do whatever we need with the form values
		//send to a server, call an api etc...
		// if (!this.props.formValues) {
		// 	this.props.onSubmit(this.props.formValues);
		// }
		console.log(this.props.formValues);
	};

	renderFormFields = () => {
		if (this.props.editTrack) {
			return (
				<>
					<Field
						name="title"
						component={this.renderInput}
						label="Track Title"
						value={this.props.editTrack.title}
						placeholder={this.props.editTrack.title}
					/>
					<Field
						name="artist"
						component={this.renderInput}
						label="Artist"
						value={this.props.editTrack.artist}
						placeholder={this.props.editTrack.artist}
					/>
					<Field
						name="link"
						component={this.renderInput}
						label="Link to media (Soundcloud, Youtube, Spotify, Disco, Bridge.audio or Dropbox)"
						value={this.props.editTrack.link}
						placeholder={this.props.editTrack.link}
					/>
					<Field
						name="masterContact"
						component={this.renderInput}
						label="Master owner email"
						type="email"
						value={this.props.editTrack.masterContact}
						placeholder={this.props.editTrack.masterContact}
						multiline
					/>
					<Field
						name="publisherContact"
						component={this.renderInput}
						label="Publisher email"
						type="email"
						value={this.props.editTrack.publisherContact}
						placeholder={this.props.editTrack.publisherContact}
						multiline
					/>
				</>
			);
		} else {
			return (
				<>
					<Field
						name="title"
						component={this.renderInput}
						label="Track Title"
					/>
					<Field name="artist" component={this.renderInput} label="Artist" />
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
					<Field
						name="upload"
						component={DropzoneField}
						type="file"
						handleOnDrop={this.handleOnDrop}
					/>
				</>
			);
		}
	};

	render() {
		return (
			<Box>
				<form
					onSubmit={this.props.handleSubmit(this.onSubmit)}
					className="ui form error"
				>
					<Stack spacing={1}>
						{this.renderFormFields()}
						<Stack
							direction="row"
							sx={{ display: "flex", justifyContent: "flex-end" }}
							spacing={2}
						>
							<Button type="submit" variant="contained" color="secondary">
								Submit
							</Button>
							{this.props.editTrack ? (
								<Button
									variant="outlined"
									color="error"
									onClick={this.props.onDelete}
								>
									Delete Track
								</Button>
							) : null}
							{this.props.onCancel ? (
								<Button
									variant="outlined"
									color="primary"
									onClick={this.props.onCancel}
								>
									Cancel
								</Button>
							) : (
								<Button
									variant="outlined"
									color="primary"
									component={Link}
									to="/catalog"
								>
									Cancel
								</Button>
							)}
						</Stack>
					</Stack>
				</form>
			</Box>
		);
	}
}

const validate = (values) => {
	const errors = {};
	const requiredFields = [
		"title",
		"artist",
		"masterContact",
		"publisherContact",
		"upload"
	];
	requiredFields.forEach((field) => {
		if (!values[field]) {
			errors[field] = "Required";
		}
	});
	// if (
	// 	values.link &&
	// 	!(
	// 		values.link.includes("spotify") ||
	// 		values.link.includes("soundcloud") ||
	// 		values.link.includes("youtube") ||
	// 		values.link.includes("share.bridge.audio") ||
	// 		values.link.includes("disco.ac") ||
	// 		values.link.includes("dropbox")
	// 	)
	// ) {
	// 	errors.link =
	// 		"Your track link must be from Souncloud, Youtube, Spotify, Bridge.audio, Disco.ac or Dropbox.";
	// }
	return errors;
};

const mapStateToProps = (state, ownProps) => {
	return {
		formValues: state.form?.CreateTrackForm?.values,
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
