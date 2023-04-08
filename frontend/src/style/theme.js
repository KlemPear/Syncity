import { createTheme } from "@mui/material";

export const theme = (prefersDarkMode = false) => {
	return createTheme({
		palette: {
			// background: {
			// 	default: "#FFFFFF",
			// 	paper: "#FFFFFF",
			// },
			// primary: {
			// 	main: "#232323",
			// },
			// secondary: {
			// 	main: "#458FF7", //"#F6CD45", //#3D52D5
			// },
			// third: {
			// 	main: "#F8F8F8",
			// },
			// white: {
			// 	main: "#FFFFFF",
			// },
			mode: prefersDarkMode ? "dark" : "light",
			...(!prefersDarkMode
				? {
						background: {
							default: "#FFFFFF",
							paper: "#FFFFFF",
						},
						primary: {
							main: "#232323",
						},
						secondary: {
							main: "#458FF7", //"#F6CD45", //#3D52D5
						},
						third: {
							main: "#F8F8F8",
						},
						white: {
							main: "#FFFFFF",
						},
						appBarButton: {
							main: "#000000",
						},
						success: {
							main: "#4caf50",
						},
						grey: {
							main: "#999999",
						},
				  }
				: {
						primary: {
							main: "#F8F8F8",
						},
						secondary: {
							main: "#458FF7", //"#F6CD45", //#3D52D5
						},
						third: {
							main: "#232323",
						},
						white: {
							main: "#FFFFFF",
						},
						appBarButton: {
							main: "#FFFFFF",
						},
						success: {
							main: "#4caf50",
						},
						grey: {
							main: "#999999",
						},
				  }),
		},
		components: {
			// Name of the component
			MuiButton: {
				defaultProps: {},
				styleOverrides: {
					root: {
						textTransform: "none",
						fontSize: "1rem",
					},
				},
			},
			MuiCardContent: {
				styleOverrides: {
					root: {
						padding: "10px",
					},
				},
			},
			MuiCard: {
				styleOverrides: {
					root: {
						padding: "12px",
						margin: "10px",
						borderRadius: "15px",
					},
				},
			},
			MuiIcon: {
				styleOverrides: {
					root: {},
				},
			},
		},
	});
};
