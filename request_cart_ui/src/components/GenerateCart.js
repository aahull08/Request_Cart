import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const GenerateCart = () => {
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={8}>
      <Typography variant="h3" sx={{ color: "white", ml: 5, pt: 5 }}>
        Generate a Cart
      </Typography>
      <AddShoppingCartOutlinedIcon
        style={{ color: "#7398ff" }}
        sx={{ height: 200, width: 200 }}
      />
    </Stack>
  );
};

export default GenerateCart;
