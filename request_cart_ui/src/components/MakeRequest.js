import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const MakeRequest = () => {
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={8}>
      <Typography variant="h3" sx={{ color: "white", ml: 5, pt: 5 }}>
        Send a Request
      </Typography>
      <KeyboardDoubleArrowRightOutlinedIcon
        style={{ color: "#7398ff" }}
        sx={{ height: 200, width: 200 }}
      />
    </Stack>
  );
};

export default MakeRequest;
