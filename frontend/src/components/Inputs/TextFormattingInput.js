import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DOMPurify from 'dompurify';

const TextFormattingInput = ({ input: { value, onChange }, label }) => {

  const sanitizedValue = DOMPurify.sanitize(value);

	const handleTextChange = (newValue) => {
		onChange(DOMPurify.sanitize(newValue));
	};

	const modules = {
		toolbar: [
			[{ header: [] }],
			["bold", "italic", "underline", "strike"],
			[
				{ list: "ordered" },
				{ list: "bullet" },
				{ indent: "-1" },
				{ indent: "+1" },
			],
			["link"],
			["clean"],
		],
		clipboard: {
			// toggle to add extra line breaks when pasting HTML:
			matchVisual: false,
		},
	};

	const formats = [
		"header",
		"bold",
		"italic",
		"underline",
		"strike",
		"list",
		"bullet",
		"indent",
		"link",
	];

	return (
		<div>
			<label>{label}</label>
			<ReactQuill
				value={sanitizedValue}
				modules={modules}
				formats={formats}
				theme="snow"
				onChange={handleTextChange}
			/>
		</div>
	);
};

export default TextFormattingInput;
