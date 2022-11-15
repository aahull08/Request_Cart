import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

const Headers = ({ headers }) => {
  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      spacing={0}
      style={{ width: "100%" }}>
      <Typography variant="h5" sx={{ color: "#34384C", pt: 5, pl: 5 }}>
        Headers
      </Typography>
      <Divider
        variant="middle"
        sx={{ bgcolor: "#34384C" }}
        style={{ width: "100%" }}
      />
      {Object.keys(headers).map((title, index) => {
        return (
          <Typography key={index} variant="p" sx={{ color: "#34384C", pt: 5, pr: 5, pl: 5 }}>
            <strong>{title}</strong>: {headers[title]}
          </Typography>
        );
      })}
    </Stack>
  );
};

export default Headers;
