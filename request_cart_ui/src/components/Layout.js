import Topbar from "./Topbar";
import Box from "@mui/material/Box";

const Layout = ({ children }) => {
  return (
    <>
      <Topbar />
      <Box
      sx={{
        ml: 10,
        mr: 10,
        mt: 10,
        mb: 10,
        pb: 15,
        width: "auto",
        minHeight: "65vh",
        height: "auto",
        backgroundColor: "#34384C",
      }}>
      {children}
      </Box>
    </>
  );
};

export default Layout;
