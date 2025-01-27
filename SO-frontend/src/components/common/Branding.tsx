import { Typography, Box } from "@mui/material";
import logo from "../../resources/images/SignedOwlLogo.png";

export const Branding = () => {
  return (
    <Box display="flex" alignItems="flex-end" marginBottom={2} pt={1}>
      <Box
        component="img"
        src={logo}
        alt="Logo"
        sx={{ height: 40, margin: 0, padding: 0 }}
      />
      {/* <Typography
        sx={{
          marginLeft: 1,
          fontSize: "2rem",
          fontWeight: "bold",
          fontFamily: "Times New Roman, serif",
        }}
      >
        SignedOwl
      </Typography> */}
    </Box>
  );
};
