import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const RequestTitle = ({ method, path, ip }) => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={2}>
      <Typography variant="h6" sx={{ color: "#34384C", pt: 5, pl: 10 }}>
        Method: {method}
      </Typography>
      <Typography variant="h6" sx={{ color: "#34384C", pt: 5}}>
        path: {path}
      </Typography>
      <Typography variant="h6" sx={{ color: "#34384C", pt: 5, pr: 10 }}>
        ip: {ip}
      </Typography>

    </Stack>
  );
};

export default RequestTitle;
