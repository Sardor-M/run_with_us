export {};
// import * as React from "react";
// import IconButton from "@mui/material/IconButton";
// import Box from "@mui/material/Box";
// import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
// import Brightness4Icon from "@mui/icons-material/Brightness4";
// import Brightness7Icon from "@mui/icons-material/Brightness7";

// export const ColorModeContext = React.createContext({
//   toggleColorMode: () => {},
// });

// interface ToggleProps {
//   children: React.ReactNode;
// }

// function ToggleTheme() {
//   const theme = useTheme();
//   const colorMode = React.useContext(ColorModeContext);
//   return (
//     <Box
//       sx={{
//         display: "flex",
//         width: "100%",
//         alignItems: "center",
//         justifyContent: "right",
//         bgcolor: "background.default",
//         color: "text.primary",
//         borderRadius: 1,
//         p: 3,
//       }}
//     >
//       {theme.palette.mode} mode
//       <IconButton
//         sx={{ ml: 1 }}
//         onClick={colorMode.toggleColorMode}
//         color="inherit"
//       >
//         {theme.palette.mode === "dark" ? (
//           <Brightness7Icon />
//         ) : (
//           <Brightness4Icon />
//         )}
//       </IconButton>
//     </Box>
//   );
// }

// const ToggleColorMode: React.FC<ToggleProps> = ({ children }) => {
//   const [mode, setMode] = React.useState<"light" | "dark">("light");
//   const colorMode = React.useMemo(
//     () => ({
//       toggleColorMode: () => {
//         setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
//       },
//     }),
//     []
//   );

//   const theme = React.useMemo(
//     () =>
//       createTheme({
//         palette: {
//           mode,
//         },
//       }),
//     [mode]
//   );

//   return (
//     <ColorModeContext.Provider value={colorMode}>
//       <ThemeProvider theme={theme}>
//         {children} {/* Wrap children with ThemeProvider */}
//       </ThemeProvider>
//     </ColorModeContext.Provider>
//   );
// };

// export default ToggleColorMode;
