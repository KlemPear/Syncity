import { createTheme } from "@mui/material";

export const theme = createTheme({
	palette: {
		primary: {
			main: "#232323",
		},
		secondary: {
			main: "#458FF7" //"#F6CD45", //#3D52D5
		},
		third: {
			main: "#F7F7F7",
		},
	},
	// '@global': {
  //   '*::-webkit-scrollbar': {
  //     width: '0.2em'
  //   },
  //   '*::-webkit-scrollbar-track': {
  //     '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
  //   },
  //   '*::-webkit-scrollbar-thumb': {
  //     backgroundColor: 'rgba(0,0,0,.1)',
  //     outline: '1px solid slategrey'
  //   }
  // }
});
