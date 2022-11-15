import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const CheckResults = () => {
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={8}>
      <Typography variant="h3" sx={{ color: "white", ml: 5, pt: 5 }}>
        Check The Results
      </Typography>
      <AutoStoriesOutlinedIcon
        style={{ color: "#7398ff" }}
        sx={{ height: 200, width: 200 }}
      />
    </Stack>
  );
};

export default CheckResults;
