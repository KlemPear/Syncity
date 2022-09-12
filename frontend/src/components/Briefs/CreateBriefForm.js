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

//#region List Options

const mediaOptions = [
	"Film",
	"Web",
	"TV",
	"Advertising",
	"Video Game",
	"Trailer",
	"Radio",
	"Podcast",
	"Corporate",
	"Other",
].sort();

const useOptions = ["Soundtrack", "Background Music", "Credits"].sort();

const licenseDurationOptions = [
	"1 week",
	"2 weeks",
	"1 month",
	"2 months",
	"3 months",
	"6 months",
	"9 months",
	"1 year",
	"2 years",
	"3 years",
	"5 years",
	"10 years",
	"Perpetuity",
];

const territoryOptions = [
	"Europe",
	"USA and Canada",
	"Africa",
	"South America",
	"Asia",
	"Australia and New Zealand",
	"Worldwide",
].sort();

const genresOptions = [
	"Pop",
	"Electronic",
	"Rock",
	"Indie",
	"Hip Hop",
	"Funk & Soul",
	"Folk",
	"Classical",
	"World",
	"Jazz",
	"Country",
	"Blues",
	"Experimental",
	"Reggae",
	"Children's music",
].sort();

const vocalsOptions = [
	"Instrumental Only",
	"Female",
	"Male",
	"Rap",
	"Choir",
	"Kids",
].sort();

const moodsOptions = [
	"Happy",
	"Epic",
	"Dreamy",
	"Euphoric",
	"Laid Back",
	"Running",
	"Relaxing",
	"Suspense",
	"Mysterious",
	"Sentimental",
	"Sad",
].sort();

const instrumentsOptions = [
	"Piano",
	"Flute",
	"Veena",
	"Drums",
	"Mridangam",
	"Violin Guitar",
	"Triangle",
	"Trumpet",
	"Saxophone",
	"Mouth organ",
	"Cello",
	"Xylophone",
	"Clap box",
	"Electric guitar",
	"Bass",
	"Bugle",
	"Harpe",
	"Harmonium",
	"Oboe",
	"Maracas",
	"Cymbal",
	"Accordion",
	"Bongo",
	"Bell",
	"Horn",
	"Banjo",
	"Conga",
	"Keyboard",
	"Gong",
	"Pipe organ",
	"Comet",
	"Tambourine",
	"Clarinet",
	"Harmonica",
	"Tuba",
	"Bass drum",
	"snare drum",
	"Euphorium",
	"Piccolo",
	"Lute",
	"Marimba",
	"Bassoon",
	"Cornet",
	"Celesta",
	"Spinet",
	"Oud",
	"Yueqin",
	"Dholak",
	"Tabla",
	"Damru",
	"Ssrangi",
	"Sitar",
	"Gu-zheng",
	"Ektara",
	"Shehnai",
	"Sarod",
	"Pungi",
	"Gramophone",
	"Tubular Chimes",
].sort();

const tempoOptions = [
	"Very slow (40-60 bpm)",
	"Slow (60-75 bpm)",
	"Medium (75-110)",
	"Fast (110-150)",
	"Very fast (150-200)",
];

//#endregion

class CreateBriefForm extends React.Component {
	componentDidMount = () => {
		if (this.props.editBrief) {
			this.props.initialize(this.props.editBrief);
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
					// sx={{ minWidth: 400 }}
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
					error={Boolean(touched && error)}
					helperText={Boolean(touched && error) ? error : null}
					input={input}
					{...custom}
				/>
			</>
		);
	};

	onSubmit = (event) => {
		event.preventDefault();
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
						value={editBrief.budget}
						placeholder={editBrief.dueDate}
					/>
					<Field
						name="numberOfApplicationsWanted"
						component={this.renderInput}
						type="number"
						label="Number of applications wanted:"
						value={editBrief.numberOfApplicationsWanted}
						placeholder={editBrief.numberOfApplicationsWanted}
					/>
					<Field
						name="description"
						component={this.renderTextInput}
						label="description"
						defaultValue={editBrief.budget}
						value={editBrief.budget}
						placeholder={editBrief.description}
					/>
					<Divider sx={{ m: 1, bgcolor: "black" }} />
					<Typography variant="h4">License Terms</Typography>
					<Field
						name="media"
						component={this.renderInput}
						label="Media"
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
								<InputAdornment position="start">$</InputAdornment>
							),
						}}
						value={editBrief.budget}
						placeholder={editBrief.budget}
					/>
					<Field
						name="licenseDuration"
						component={this.renderInput}
						label="License Duration"
						selectList={licenseDurationOptions}
						value={editBrief.licenseDuration}
						placeholder={editBrief.licenseDuration}
					/>
					<Field
						name="extractDuration"
						component={this.renderInput}
						label="Extract duration in minutes"
						InputProps={{
							inputProps: {
								max: 90,
								min: 1,
							},
							startAdornment: (
								<InputAdornment position="start">minutes:</InputAdornment>
							),
						}}
						value={editBrief.extractDuration}
						placeholder={editBrief.extractDuration}
					/>
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
						selectList={moodsOptions}
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
						component={this.renderInput}
						label="Exclusivity"
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
						label="Link #1"
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
						label="Link #2"
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
						label="Link #3"
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
						label="Media"
						selectList={mediaOptions}
					/>
					<Field
						name="use"
						component={this.renderMultipleSelectInput}
						label="Use"
						selectList={useOptions}
						format={(value) => (Array.isArray(value) ? value : [])}
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
								<InputAdornment position="start">$</InputAdornment>
							),
						}}
					/>
					<Field
						name="licenseDuration"
						component={this.renderInput}
						label="License Duration"
						selectList={licenseDurationOptions}
					/>
					<Field
						name="extractDuration"
						component={this.renderInput}
						label="Extract duration in minutes"
						InputProps={{
							inputProps: {
								max: 90,
								min: 1,
							},
							startAdornment: (
								<InputAdornment position="start">minutes:</InputAdornment>
							),
						}}
					/>
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
						label="Exclusivity (track never been synchronized before)"
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
						label="Link #1"
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
						label="Link #2"
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
				<form onSubmit={this.onSubmit} className="ui form error">
					<Stack spacing={2} sx={{ m: 2 }}>
						{this.renderFormFields()}
						{/* <Button type="submit" variant="contained" color="secondary">
							Submit
						</Button> */}
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
		"budget",
		"licenseDuration",
		"territory",
		"genres",
	];
	requiredFields.forEach((field) => {
		if (!values[field]) {
			errors[field] = "Required";
		}
	});
	if (
		values.email &&
		!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
	) {
		errors.email = "Invalid email address";
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
