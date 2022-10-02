import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 400,
		},
	},
};

function getStyles(selectListItem, selectedValue, theme) {
	return {
		fontWeight:
			selectedValue.indexOf(selectListItem) === -1
				? theme.typography.fontWeightRegular
				: theme.typography.fontWeightMedium,
	};
}

export default function MultipleSelectInput(props) {
	const theme = useTheme();
	const [selectedValue, setSelectedValue] = React.useState([]);

	const handleChange = (event) => {
		const {
			target: { value },
		} = event;
		setSelectedValue(
			// On autofill we get a stringified value.
			typeof value === "string" ? value.split(",") : value
		);
	};

	return (
		<div>
			<FormControl fullWidth={props.fullWidth} sx={{ width: props.width }}>
				<InputLabel>{props.label}</InputLabel>
				<Select
					multiple
					value={selectedValue}
					onChange={handleChange}
					// input={<OutlinedInput label="Chip"></OutlinedInput>}
					// renderValue={(selected) => (
					// 	<Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
					// 		{selected.map((value) => (
					// 			<Chip key={value} label={value} />
					// 		))}
					// 	</Box>
					// )}
					input={<OutlinedInput label="Name" />}
					MenuProps={MenuProps}
					{...props.input}
					{...props.custom}
				>
					{props.selectList?.map((option) => (
						<MenuItem
							key={option}
							value={option}
							style={getStyles(option, selectedValue, theme)}
						>
							{option}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	);
}
