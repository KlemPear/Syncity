import React from "react";
import Dropzone from "./Dropzone";
import PropTypes from "prop-types";

const DropzoneField = ({
	handleOnDrop,
	input,
	label,
	meta: { error, touched },
}) => (
	<>
		<Dropzone
			onDrop={handleOnDrop}
			onChange={(file) => input.onChange(file)}
			input={input}
			error={error && touched}
		></Dropzone>
	</>
);

DropzoneField.propTypes = {
	handleOnDrop: PropTypes.func.isRequired,
	input: PropTypes.shape({
		name: PropTypes.string,
		onBlur: PropTypes.func.isRequired,
		onChange: PropTypes.func.isRequired,
		onDragStart: PropTypes.func.isRequired,
		onDrop: PropTypes.func.isRequired,
		onFocus: PropTypes.func.isRequired,
		value: PropTypes.shape({
			preview: PropTypes.string,
		}),
	}),
	label: PropTypes.string,
	touched: PropTypes.bool,
	error: PropTypes.string,
};

export default DropzoneField;
