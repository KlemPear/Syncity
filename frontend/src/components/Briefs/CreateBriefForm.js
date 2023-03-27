import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

//mui
import {
	TextField,
	Button,
	Stack,
	Checkbox,
	FormGroup,
	FormControlLabel,
	Divider,
	Typography,
	MenuItem,
	InputAdornment,
} from "@mui/material";
import MultipleSelectInput from "../Inputs/MulipleSelectInput";

import {
	mediaOptions,
	useOptions,
	genresOptions,
	licenseDurationOptions,
	territoryOptions,
	vocalsOptions,
	moodsOptions,
	instrumentsOptions,
	tempoOptions,
	currencyOptions,
	currencySymbols,
} from "../Inputs/BriefOptionsLists";

class CreateBriefForm extends React.Component {
	componentDidMount = () => {
		if (this.props.editBrief) {
			const brief = this.props.editBrief;
			brief.dueDate = this.props.editBrief.dueDate.split("T")[0];
			this.props.initialize(brief);
		}
	};

	renderCheckBox = ({ input, label, meta: { touched, error }, ...custom }) => {
		return (
			<>
				<FormGroup>
					<FormControlLabel
						control={<Checkbox />}
						label={label}
						labelPlacement="start"
						{...input}
						{...custom}
					/>
				</FormGroup>
			</>
		);
	};

	renderTextInput = ({
		input,
		label,
		type,
		meta: { touched, error },
		...custom
	}) => {
		return (
			<>
				<TextField
					fullWidth
					label={label}
					error={Boolean(touched && error)}
					helperText={Boolean(touched && error) ? error : null}
					type={type}
					multiline
					maxRows={4}
					{...input}
					{...custom}
				/>
			</>
		);
	};

	renderInput = ({
		input,
		label,
		type,
		meta: { touched, error },
		selectList = null,
		...custom
	}) => {
		return (
			<>
				<TextField
					fullWidth
					label={label}
					error={Boolean(touched && error)}
					helperText={Boolean(touched && error) ? error : null}
					type={type}
					select={Boolean(selectList != null)}
					{...input}
					{...custom}
				>
					{selectList?.map((option) => (
						<MenuItem key={option} value={option}>
							{option}
						</MenuItem>
					))}
				</TextField>
			</>
		);
	};

	renderMultipleSelectInput = ({
		input,
		label,
		meta: { touched, error },
		selectList = [],
		...custom
	}) => {
		return (
			<>
				<MultipleSelectInput
					selectList={selectList}
					label={label}
					error={Boolean(error)}
					helperText={Boolean(touched && error) ? error : null}
					input={input}
					{...custom}
					fullWidth
				/>
			</>
		);
	};

	renderBudgetAdornment() {
		const selectedCurrency = this.props.formValues?.currency;
		if (!selectedCurrency) {
			return "*";
		}
		return currencySymbols[selectedCurrency];
	}

	onSubmit = (event) => {
		this.props.onSubmit(this.props.formValues);
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
						value={editBrief.title}
						placeholder={editBrief.title}
					/>
					<Field
						name="private"
						component={this.renderCheckBox}
						type="checkbox"
						label="Make this brief only visible to your connections?"
						defaultChecked={Boolean(editBrief.private)}
					/>
					<Field
						name="dueDate"
						component={this.renderInput}
						type="date"
						label="Due Date"
						InputLabelProps={{
							shrink: true,
						}}
						value={editBrief.dueDate.split("T")[0]}
					/>
					<Field
						name="numberOfApplicationsWanted"
						component={this.renderInput}
						type="number"
						label="Number of applications wanted:"
						value={editBrief.numberOfApplicationsWanted}
						placeholder={editBrief.numberOfApplicationsWanted.toString()}
					/>
					<Field
						name="description"
						component={this.renderTextInput}
						label="description"
						value={editBrief.description}
						placeholder={editBrief.description}
					/>
					<Divider sx={{ m: 1, bgcolor: "black" }} />
					<Typography variant="h4">License Terms</Typography>
					<Field
						name="media"
						component={this.renderInput}
						label="Primary Media"
						selectList={mediaOptions}
						value={editBrief.media}
						placeholder={editBrief.media}
					/>
					<Field
						name="use"
						component={this.renderMultipleSelectInput}
						label="Use"
						selectList={useOptions}
						format={(value) => (Array.isArray(value) ? value : [])}
						value={editBrief.use}
						placeholder={editBrief.use}
					/>
					<Stack direction="row">
						<Field
							name="currency"
							component={this.renderInput}
							label="Currency"
							selectList={currencyOptions}
							sx={{ width: 150 }}
							value={editBrief.currency}
							placeholder={editBrief.currency}
						/>
						<Field
							name="budget"
							component={this.renderInput}
							type="number"
							label="Budget"
							InputProps={{
								inputProps: {
									max: 10000000,
									min: 1,
								},
								startAdornment: (
									<InputAdornment position="start">
										{this.renderBudgetAdornment()}
									</InputAdornment>
								),
							}}
							value={editBrief.budget}
							placeholder={editBrief.budget.toString()}
						/>
					</Stack>
					<Field
						name="licenseDuration"
						component={this.renderInput}
						label="License Duration"
						selectList={licenseDurationOptions}
						value={editBrief.licenseDuration}
						placeholder={editBrief.licenseDuration}
					/>
					<Stack direction="row">
						<Field
							name="extractDuration"
							component={this.renderInput}
							type="number"
							label="Extract duration in minutes"
							InputProps={{
								inputProps: {
									max: 90,
									min: 0,
								},
								startAdornment: (
									<InputAdornment position="start">minutes:</InputAdornment>
								),
							}}
							value={editBrief.extractDuration}
							placeholder={editBrief.extractDuration?.toString()}
						/>
						<Field
							name="extractDurationSecond"
							component={this.renderInput}
							type="number"
							label="Extract duration in seconds"
							InputProps={{
								inputProps: {
									max: 60,
									min: 0,
								},
								startAdornment: (
									<InputAdornment position="start">seconds:</InputAdornment>
								),
							}}
							value={editBrief.extractDurationSecond}
							placeholder={editBrief.extractDurationSecond?.toString()}
						/>
					</Stack>
					<Field
						name="territory"
						component={this.renderMultipleSelectInput}
						label="Territory"
						selectList={territoryOptions}
						format={(value) => (Array.isArray(value) ? value : [])}
						value={editBrief.territory}
						placeholder={editBrief.territory}
					/>
					<Divider sx={{ m: 1, bgcolor: "black" }} />
					<Typography variant="h5">Type Of Music Needed</Typography>
					<Field
						name="genres"
						component={this.renderMultipleSelectInput}
						label="Genre(s)"
						dselectList={genresOptions}
						format={(value) => (Array.isArray(value) ? value : [])}
						value={editBrief.genres}
						placeholder={editBrief.genres}
					/>
					<Field
						name="vocals"
						component={this.renderMultipleSelectInput}
						label="Vocals"
						selectList={vocalsOptions}
						format={(value) => (Array.isArray(value) ? value : [])}
						value={editBrief.vocals}
						placeholder={editBrief.vocals}
					/>
					<Field
						name="moods"
						component={this.renderMultipleSelectInput}
						label="Mood(s)"
						selectList={moodsOptions}
						format={(value) => (Array.isArray(value) ? value : [])}
						value={editBrief.moods}
						placeholder={editBrief.moods}
					/>
					<Field
						name="instruments"
						component={this.renderMultipleSelectInput}
						label="Instrument(s)"
						selectList={instrumentsOptions}
						format={(value) => (Array.isArray(value) ? value : [])}
						value={editBrief.instruments}
						placeholder={editBrief.instruments}
					/>
					<Field
						name="tempo"
						component={this.renderInput}
						label="Tempo"
						selectList={tempoOptions}
						value={editBrief.tempo}
						placeholder={editBrief.tempo}
					/>
					<Field
						name="exclusivity"
						component={this.renderCheckBox}
						label="Exclusivity (the music will only belong to this project during all the license duration)"
						defaultChecked={Boolean(editBrief.exclusivity)}
					/>
					<Divider sx={{ m: 1, bgcolor: "black" }} />
					<Typography variant="h5">Reference(s)</Typography>
					<Field
						name="references[0].title"
						component={this.renderInput}
						label="Title #1"
						value={
							editBrief.references != null
								? editBrief.references[0]?.title
								: null
						}
						placeholder={
							editBrief.references != null
								? editBrief.references[0]?.title
								: null
						}
					/>
					<Field
						name="references[0].link"
						component={this.renderInput}
						label="Link #1 (Soundcloud, Youtube, Spotify)"
						value={
							editBrief.references != null
								? editBrief.references[0]?.link
								: null
						}
						placeholder={
							editBrief.references != null
								? editBrief.references[0]?.link
								: null
						}
					/>
					<Field
						name="references[0].comment"
						component={this.renderTextInput}
						label="Comment #1"
						value={
							editBrief.references != null
								? editBrief.references[0]?.comment
								: null
						}
						placeholder={
							editBrief.references != null
								? editBrief.references[0]?.comment
								: null
						}
					/>
					<Field
						name="references[1].title"
						component={this.renderInput}
						label="Title #2"
						value={
							editBrief.references != null
								? editBrief.references[1]?.title
								: null
						}
						placeholder={
							editBrief.references != null
								? editBrief.references[1]?.title
								: null
						}
					/>
					<Field
						name="references[1].link"
						component={this.renderInput}
						label="Link #2 (Soundcloud, Youtube, Spotify)"
						value={
							editBrief.references != null
								? editBrief.references[1]?.link
								: null
						}
						placeholder={
							editBrief.references != null
								? editBrief.references[1]?.link
								: null
						}
					/>
					<Field
						name="references[1].comment"
						component={this.renderTextInput}
						label="Comment #2"
						value={
							editBrief.references != null
								? editBrief.references[1]?.comment
								: null
						}
						placeholder={
							editBrief.references != null
								? editBrief.references[1]?.comment
								: null
						}
					/>
					<Field
						name="references[2].title"
						component={this.renderInput}
						label="Title #3"
						value={
							editBrief.references != null
								? editBrief.references[2]?.title
								: null
						}
						placeholder={
							editBrief.references != null
								? editBrief.references[2]?.title
								: null
						}
					/>
					<Field
						name="references[2].link"
						component={this.renderInput}
						label="Link #3 (Soundcloud, Youtube, Spotify)"
						value={
							editBrief.references != null
								? editBrief.references[2]?.link
								: null
						}
						placeholder={
							editBrief.references != null
								? editBrief.references[2]?.link
								: null
						}
					/>
					<Field
						name="references[2].comment"
						component={this.renderTextInput}
						label="Comment #3"
						value={
							editBrief.references != null
								? editBrief.references[2]?.comment
								: null
						}
						placeholder={
							editBrief.references != null
								? editBrief.references[2]?.comment
								: null
						}
					/>
				</>
			);
		} else {
			return (
				<>
					<Field name="title" component={this.renderInput} label="Title" />
					<Field
						name="private"
						component={this.renderCheckBox}
						type="checkbox"
						label="Make this brief only visible to your connections?"
					/>
					<Field
						name="dueDate"
						component={this.renderInput}
						type="date"
						label="Due Date"
						InputLabelProps={{
							shrink: true,
						}}
					/>
					<Field
						name="numberOfApplicationsWanted"
						component={this.renderInput}
						type="number"
						label="Number of applications wanted:"
						InputProps={{
							inputProps: {
								max: 500,
								min: 1,
							},
						}}
						placeholder="500"
						value={500}
					/>
					<Field
						name="description"
						component={this.renderTextInput}
						label="description"
					/>
					<Divider sx={{ m: 1, bgcolor: "black" }} />
					<Typography variant="h5">License Terms</Typography>
					<Field
						name="media"
						component={this.renderInput}
						label="Primary Media"
						selectList={mediaOptions}
					/>
					<Field
						name="use"
						component={this.renderMultipleSelectInput}
						label="Use"
						selectList={useOptions}
						format={(value) => (Array.isArray(value) ? value : [])}
					/>
					<Stack direction="row">
						<Field
							name="currency"
							component={this.renderInput}
							label="Currency"
							selectList={currencyOptions}
							sx={{ width: 150 }}
						/>
						<Field
							name="budget"
							component={this.renderInput}
							type="number"
							label="Budget"
							InputProps={{
								inputProps: {
									max: 10000000,
									min: 1,
								},
								startAdornment: (
									<InputAdornment position="start">
										{this.renderBudgetAdornment()}
									</InputAdornment>
								),
							}}
						/>
					</Stack>
					<Field
						name="licenseDuration"
						component={this.renderInput}
						label="License Duration"
						selectList={licenseDurationOptions}
					/>
					<Stack direction="row">
						<Field
							name="extractDuration"
							component={this.renderInput}
							type="number"
							label="Extract duration in minutes"
							InputProps={{
								inputProps: {
									max: 90,
									min: 0,
								},
								startAdornment: (
									<InputAdornment position="start">minutes:</InputAdornment>
								),
							}}
						/>
						<Field
							name="extractDurationSecond"
							component={this.renderInput}
							type="number"
							label="Extract duration in seconds"
							InputProps={{
								inputProps: {
									max: 60,
									min: 0,
								},
								startAdornment: (
									<InputAdornment position="start">seconds:</InputAdornment>
								),
							}}
						/>
					</Stack>
					<Field
						name="territory"
						component={this.renderMultipleSelectInput}
						label="Territory"
						selectList={territoryOptions}
						format={(value) => (Array.isArray(value) ? value : [])}
					/>
					<Divider sx={{ m: 1, bgcolor: "black" }} />
					<Typography variant="h5">Type Of Music Needed</Typography>
					<Field
						name="genres"
						component={this.renderMultipleSelectInput}
						label="Genre(s)"
						selectList={genresOptions}
						format={(value) => (Array.isArray(value) ? value : [])}
					/>
					<Field
						name="vocals"
						component={this.renderMultipleSelectInput}
						label="Vocals"
						selectList={vocalsOptions}
						format={(value) => (Array.isArray(value) ? value : [])}
					/>
					<Field
						name="moods"
						component={this.renderMultipleSelectInput}
						label="Mood(s)"
						selectList={moodsOptions}
						format={(value) => (Array.isArray(value) ? value : [])}
					/>
					<Field
						name="instruments"
						component={this.renderMultipleSelectInput}
						label="Instrument(s)"
						selectList={instrumentsOptions}
						format={(value) => (Array.isArray(value) ? value : [])}
					/>
					<Field
						name="tempo"
						component={this.renderInput}
						label="Tempo"
						selectList={tempoOptions}
					/>
					<Field
						name="exclusivity"
						component={this.renderCheckBox}
						label="Exclusivity (the music will only belong to this project during all the license duration)"
					/>
					<Divider sx={{ m: 1, bgcolor: "black" }} />
					<Typography variant="h5">Reference(s)</Typography>
					<Field
						name="references[0].title"
						component={this.renderInput}
						label="Title #1"
					/>
					<Field
						name="references[0].link"
						component={this.renderInput}
						label="Link #1 (Soundcloud, Youtube, Spotify)"
					/>
					<Field
						name="references[0].comment"
						component={this.renderTextInput}
						label="Comment #1"
					/>
					<Field
						name="references[1].title"
						component={this.renderInput}
						label="Title #2"
					/>
					<Field
						name="references[1].link"
						component={this.renderInput}
						label="Link #2 (Soundcloud, Youtube, Spotify)"
					/>
					<Field
						name="references[1].comment"
						component={this.renderTextInput}
						label="Comment #2"
					/>
					<Field
						name="references[2].title"
						component={this.renderInput}
						label="Title #3"
					/>
					<Field
						name="references[2].link"
						component={this.renderInput}
						label="Link #3 (Soundcloud, Youtube, Spotify)"
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
					<Stack spacing={2} sx={{ m: 2 }}>
						{this.renderFormFields()}
						<Stack
							direction="row"
							sx={{ display: "flex", justifyContent: "flex-end" }}
							spacing={2}
						>
							<Button type="submit" variant="contained" color="secondary">
								Submit
							</Button>
							{this.props.editBrief ? (
								<Button
									variant="outlined"
									color="error"
									onClick={this.props.onDelete}
								>
									Delete Brief
								</Button>
							) : null}
							<Button
								variant="outlined"
								color="primary"
								component={Link}
								to="/list-briefs"
							>
								Cancel
							</Button>
						</Stack>
					</Stack>
				</form>
			</div>
		);
	}
}

const validate = (values) => {
	const errors = {};
	const requiredFields = [
		"title",
		"dueDate",
		"media",
		"currency",
		"budget",
		"licenseDuration",
	];
	requiredFields.forEach((field) => {
		if (!values[field]) {
			errors[field] = "Required";
		}
	});
	if (values.title && values.title.length > 35) {
		errors.title = "This title is too long.";
	}
	if (
		values.references &&
		values.references[0]?.link &&
		!(
			values.references[0]?.link.includes("spotify") ||
			values.references[0]?.link.includes("soundcloud") ||
			values.references[0]?.link.includes("youtube")
		)
	) {
		errors.references = [
			{ link: "Your track link must be from Souncloud, Youtube or Spotify." },
		];
	}
	if (
		values.references &&
		values.references[1]?.link &&
		!(
			values.references[1]?.link.includes("spotify") ||
			values.references[1]?.link.includes("soundcloud") ||
			values.references[1]?.link.includes("youtube")
		)
	) {
		errors.references = [
			{},
			{ link: "Your track link must be from Souncloud, Youtube or Spotify." },
		];
	}
	if (
		values.references &&
		values.references[2]?.link &&
		!(
			values.references[2]?.link.includes("spotify") ||
			values.references[2]?.link.includes("soundcloud") ||
			values.references[2]?.link.includes("youtube")
		)
	) {
		errors.references = [
			{},
			{},
			{ link: "Your track link must be from Souncloud, Youtube or Spotify." },
		];
	}
	return errors;
};

const mapStateToProps = (state) => {
	return {
		formValues: state.form?.CreateBriefForm?.values,
		user: state.auth?.user,
		formErrors: state.form?.CreateBriefForm?.syncErrors,
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
