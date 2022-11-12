import React from "react";
import Dropzone from "./Dropzone";

const DropzoneField = ({
	handleOnDrop,
	input,
	label,
	meta: { error, touched },
}) => (
	<div className="preview-container">
		<Dropzone
			onDrop={handleOnDrop}
			onChange={(file) => input.onChange(file)}
		>
		</Dropzone>
	</div>
);

export default DropzoneField;
