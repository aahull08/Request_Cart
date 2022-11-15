import Stack from "@mui/material/Stack";
import Body from "./Body";
import Headers from "./Headers";
import RequestTitle from "./RequestTitle";
import Box from "@mui/material/Box";

const RequestInfo = ({ request }) => {
  return (
    <Box
    sx={{
      ml: 10,
      mr: 10,
      mt: 10,
      mb: 10,
      pb: 15,
      width: "90%",
      height: "auto",
      backgroundColor: "#ffffff",
    }}>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="left"
        spacing={7}>
        <RequestTitle
          method={request.method}
          path={request.path}
          ip={request.ip}
        />
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={1}>
          <Body body={request.body} />
          <Headers headers={request.headers} />
        </Stack>
      </Stack>
    </Box>
  );
};

export default RequestInfo;
