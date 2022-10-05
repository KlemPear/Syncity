import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm, reset } from "redux-form";
//mui
import { Button, Stack, Grid } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
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
} from "../Inputs/BriefOptionsLists";

class FilterBriefForm extends Component {
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
					width={150}
				/>
			</>
		);
	};

	renderFormFields() {
		return (
			<Grid
				container
				spacing={{ xs: 0.5 }}
				columns={{ xs: 1, sm: 2, md: 3, lg: 5 }}
			>
				<Grid item xs={1} sm={1} md={1}>
					<Field
						name="media"
						component={this.renderMultipleSelectInput}
						label="Media"
						selectList={mediaOptions}
						format={(value) => (Array.isArray(value) ? value : [])}
					/>
				</Grid>
				<Grid item xs={1} sm={1} md={1}>
					<Field
						name="genres"
						component={this.renderMultipleSelectInput}
						label="Genre"
						selectList={genresOptions}
						format={(value) => (Array.isArray(value) ? value : [])}
					/>
				</Grid>
				<Grid item xs={1} sm={1} md={1}>
					<Field
						name="vocals"
						component={this.renderMultipleSelectInput}
						label="Vocals"
						selectList={vocalsOptions}
						format={(value) => (Array.isArray(value) ? value : [])}
					/>
				</Grid>
				<Grid item xs={1} sm={1} md={1}>
					<Field
						name="moods"
						component={this.renderMultipleSelectInput}
						label="Moods"
						selectList={moodsOptions}
						format={(value) => (Array.isArray(value) ? value : [])}
					/>
				</Grid>
				<Grid item xs={1} sm={1} md={1}>
					<Field
						name="tempo"
						component={this.renderMultipleSelectInput}
						label="Tempo"
						selectList={tempoOptions}
						format={(value) => (Array.isArray(value) ? value : [])}
					/>
				</Grid>
			</Grid>
		);
	}

	onSubmit = (formValues) => {
		//do whatever we need with the form values
		//send to a server, call an api etc...
		this.props.onSubmit(formValues);
	};

	onClearFilter = () => {
		this.props.dispatch(reset("FilterBriefForm"));
		this.props.onSubmit({});
	};

	render() {
		return (
			<div>
				<form onSubmit={this.props.handleSubmit(this.onSubmit)}>
					<Stack direction="row" spacing={1}>
						{this.renderFormFields()}
						<Button
							type="submit"
							variant="text"
							color="primary"
							size="small"
							startIcon={<FilterAltIcon />}
						>
							Filter
						</Button>
						<Button
							onClick={this.onClearFilter}
							variant="text"
							color="primary"
							size="small"
							startIcon={<FilterAltOffIcon />}
						>
							Clear
						</Button>
					</Stack>
				</form>
			</div>
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

function mapStateToProps(state) {
	return {};
}

export default connect(mapStateToProps)(
	reduxForm({
		form: "FilterBriefForm",
		enableReinitialize: true,
		validate: validate,
		onChange: (values, dispatch, props, previousValues) => {
			props.submit();
		},
	})(FilterBriefForm)
);
