import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import GenerateBin from "./GenerateBin";
import MakeRequest from "./MakeRequest";
import CheckResults from "./CheckResults";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate(`/carts`)
  };
  
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={7}>
      <Typography variant="h3" sx={{ color: "white", pt: 5 }}>
        {"Request Cart"}
      </Typography>
      <Typography
        variant="h6"
        align="center"
        sx={{ color: "white", pl: 5, pt: 2, pr: 5, mb: 15 }}>
        A url is provided to you that will collect requests made to it. You can
        inspect those requests in a human-friendly way. RequestBin helps you see
        what your client is sending or to inspect and debug webhook requests.
      </Typography>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={12}>
        <GenerateBin />
        <MakeRequest />
        <CheckResults />
      </Stack>
      <Button
        onClick={onClick}
        color="primary"
        sx={{
          "&:hover": { backgroundColor: "#386acb", color: "#FFFFFF" },
          height: "auto",
          width: "auto",
          pl: 5,
          pr: 5,
          pt: 2,
          pb: 2,
          backgroundColor: "#386acb",
          color: "#FFFFFF",
        }}>
        View Your Request Carts!
      </Button>
    </Stack>
  );
};

export default Homepage;
