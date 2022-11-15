import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CartsPage = () => {
  const [carts, setCarts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getCarts = async () => {
      const result = await axios.get(`/carts`);
      setCarts(result.data);
    };
    getCarts();
  }, []);

  const handleNewCartClick = async () => {
    const newCart = await axios.post("/carts");
    const newCarts = [...carts, newCart.data.binId];
    setCarts(newCarts);
  };

  const handleCartClick = (e) => {
    const cartURL = e.target.parentElement.dataset.url;
    navigate(`/carts/${cartURL}`);
  };

  const handleDelete = async (url) => {
    await axios.delete(`/carts/${url}`)
    const newCarts = carts.filter(cart => url !== cart)
    console.log(newCarts)
    setCarts(newCarts)
  };

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={4}>
      <Typography variant="h3" sx={{ color: "white", pt: 5 }}>
        {"Your Carts"}
      </Typography>
      <Typography
        variant="h6"
        align="center"
        sx={{ color: "white", pl: 5, pt: 2, pr: 5, mb: 15 }}>
        This list is based on carts created at your IP address. Click on the
        cart to see what request were sent there.
      </Typography>
      <Button
        onClick={handleNewCartClick}
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
        Create a New Cart!
      </Button>
      <TableContainer
        component={Paper}
        style={{ width: "75vh" }}
        sx={{ ml: 10, mr: 10 }}>
        <Table sx={{ minWidth: 30 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Cart ID</TableCell>
              <TableCell>Cart URL</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {carts.map((url, index) => (
              <TableRow
                key={url}
                data-url={url}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell
                  component="th"
                  scope="row"
                  onClick={(e) => handleCartClick(e)}>
                  {index}
                </TableCell>
                <TableCell onClick={(e) => handleCartClick(e)}>{url}</TableCell>
                <TableCell>
                  <DeleteOutlineIcon onClick={() => handleDelete(url)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default CartsPage;
